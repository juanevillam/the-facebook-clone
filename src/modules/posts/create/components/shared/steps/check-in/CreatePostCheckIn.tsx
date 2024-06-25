import { useEffect, useRef, useTransition } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import { useTranslations } from 'next-intl';

import { InputEvent } from '@/assets/types';
import { ExclamationCircleIcon, MapIcon } from '@/assets/ui/icons';
import { SearchInput } from '@/components/inputs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_STEPS_PATH } from '@/modules/posts/create/assets/translations';
import { Location } from '@/modules/posts/create/assets/types';
import {
  setActiveLocation,
  setCheckInSearchInputValue,
  setLocations,
} from '@/modules/posts/create/reducers/checkInSlice';
import { setStep } from '@/modules/posts/create/reducers/postSlice';

import { CreatePostCheckInItem } from './item/CreatePostCheckInItem';
import { StepLoader, StepMessage } from '../shared';

export const CreatePostCheckIn = () => {
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);

  const [isPending, startTransition] = useTransition();
  const t = useTranslations(`${POSTS_CREATE_STEPS_PATH}.check-in`);
  const dispatch = useAppDispatch();
  const { activeLocation, searchInputValue, locations, error } = useAppSelector(
    (store) => store.posts.create.checkIn
  );

  const handleClearSearch = () => {
    dispatch(setCheckInSearchInputValue(''));
    dispatch(setLocations({ locations: [], error: false }));
  };

  const handleSearchChange = (event: InputEvent) => {
    const { value } = event.target;

    dispatch(setCheckInSearchInputValue(value));

    if (value.length === 0) {
      dispatch(setLocations({ locations: [], error: false }));
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
                setLocations({
                  locations: placePredictions || [],
                  error: placePredictions ? false : true,
                })
              )
          );
        } catch (error) {
          dispatch(setLocations({ locations: [], error: true }));
        }
      });
    }
  };

  const handleSetLocation = (location: Location) => {
    dispatch(setActiveLocation(activeLocation === location ? null : location));
    dispatch(setStep('default'));
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      libraries: ['places'],
    });

    loader.load().then(() => {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="border-b p-3 dark:border-dark-50 md:p-4">
        <SearchInput
          label="where-are-you"
          handleClear={handleClearSearch}
          onChange={handleSearchChange}
          value={searchInputValue}
        />
      </div>
      {activeLocation && (
        <div className="md:border-b md:dark:border-dark-50 md:p-4">
          <CreatePostCheckInItem
            active
            location={activeLocation}
            onClick={handleSetLocation}
          />
        </div>
      )}
      <div className="h-full overflow-y-auto md:h-80">
        {error ? (
          <StepMessage Icon={ExclamationCircleIcon} message={t('error')} />
        ) : isPending ? (
          <StepLoader />
        ) : locations.length === 0 ? (
          <StepMessage Icon={MapIcon} message={t('info')} />
        ) : (
          <div className="md:p-4">
            {locations.map((location) => (
              <CreatePostCheckInItem
                active={activeLocation === location}
                key={location.place_id}
                location={location}
                onClick={handleSetLocation}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
