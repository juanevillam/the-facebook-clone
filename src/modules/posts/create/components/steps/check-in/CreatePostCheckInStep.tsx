import { useEffect, useRef, useTransition } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import { useTranslations } from 'next-intl';

import { ExclamationCircleIcon, MapIcon } from '@/assets/icons';
import { InputEvent } from '@/assets/types';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { Location } from '@/modules/posts/create/types';

import {
  CreatePostStepContainer,
  CreatePostStepLoader,
  CreatePostStepMessage,
} from '../ui';
import { CreatePostCheckInStepItem } from './CreatePostCheckInStepItem';
import { setCreatePostStep } from '../../../reducers/createPostPostReducer';
import {
  setCreatePostCheckInStepActiveLocation,
  setCreatePostCheckInStepSearchInputValue,
  setCreatePostCheckStepInLocations,
} from '../../../reducers/steps/createPostCheckInStepReducer';

export const CreatePostCheckInStep = () => {
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);

  const [isPending, startTransition] = useTransition();
  const t = useTranslations('posts.create.steps.check-in');
  const dispatch = useAppDispatch();
  const { activeLocation, searchInputValue, locations, error } = useAppSelector(
    (store) => store.posts.createPost.createPostCheckInStep
  );

  const handleClearSearch = () => {
    dispatch(setCreatePostCheckInStepSearchInputValue(''));
    dispatch(
      setCreatePostCheckStepInLocations({ locations: [], error: false })
    );
  };

  const handleSearchChange = (event: InputEvent) => {
    const { value } = event.target;

    dispatch(setCreatePostCheckInStepSearchInputValue(value));

    if (value.length === 0) {
      dispatch(
        setCreatePostCheckStepInLocations({ locations: [], error: false })
      );

      return;
    }

    const autoCompleteService = autocompleteService.current;

    if (autoCompleteService) {
      startTransition(() => {
        try {
          autoCompleteService.getPlacePredictions(
            {
              input: value,
            },
            (placePredictions) =>
              dispatch(
                setCreatePostCheckStepInLocations({
                  locations: placePredictions || [],
                  error: placePredictions ? false : true,
                })
              )
          );
        } catch (error) {
          dispatch(
            setCreatePostCheckStepInLocations({ locations: [], error: true })
          );
        }
      });
    }
  };

  const handleSetActiveLocation = (item: Location) => {
    dispatch(
      setCreatePostCheckInStepActiveLocation(
        activeLocation === item ? null : item
      )
    );

    dispatch(setCreatePostStep('default'));
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_LOCATIONS_API_KEY as string,
      libraries: ['places'],
    });

    loader.load().then(() => {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CreatePostStepContainer
      activeItem={{
        Component: CreatePostCheckInStepItem,
        handleSetItem: handleSetActiveLocation,
        value: activeLocation,
      }}
      searchInput={{
        handleChange: handleSearchChange,
        handleClear: handleClearSearch,
        label: 'where-are-you',
        value: searchInputValue,
      }}
    >
      {error ? (
        <CreatePostStepMessage
          Icon={ExclamationCircleIcon}
          message={t('error')}
        />
      ) : isPending ? (
        <CreatePostStepLoader />
      ) : locations.length === 0 ? (
        <CreatePostStepMessage Icon={MapIcon} message={t('info')} />
      ) : (
        <div className="create-post-modal-spacing-area">
          {locations.map((location) => (
            <CreatePostCheckInStepItem
              active={activeLocation === location}
              item={location}
              key={location.place_id}
              onClick={handleSetActiveLocation}
            />
          ))}
        </div>
      )}
    </CreatePostStepContainer>
  );
};
