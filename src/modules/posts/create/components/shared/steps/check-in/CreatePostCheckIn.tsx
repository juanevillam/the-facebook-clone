import { useEffect, useRef, useTransition } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import { useTranslations } from 'next-intl';
import { BeatLoader } from 'react-spinners';

import { InputEvent } from '@/assets/types';
import { MapIcon } from '@/assets/ui/icons';
import { SearchInput } from '@/components/inputs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { Location } from '@/modules/posts/create/assets/types';
import {
  setActiveLocation,
  setCheckInSearchInputValue,
  setLocations,
} from '@/modules/posts/create/reducers/checkInSlice';
import { setStep } from '@/modules/posts/create/reducers/postSlice';

import { CreatePostCheckInItem } from './item/CreatePostCheckInItem';

export const CreatePostCheckIn = () => {
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);

  const [isPending, startTransition] = useTransition();
  const t = useTranslations('posts.create.check-in');
  const dispatch = useAppDispatch();
  const { activeLocation, searchInputValue, locations } = useAppSelector(
    (store) => store.posts.create.checkIn
  );

  const handleSearchChange = (event: InputEvent) => {
    const { value } = event.target;

    dispatch(setCheckInSearchInputValue(value));

    const autoCompleteService = autocompleteService.current;

    if (value.length > 0 && autoCompleteService) {
      startTransition(() => {
        autoCompleteService.getPlacePredictions(
          {
            input: value,
          },
          (placePredictions) => dispatch(setLocations(placePredictions || []))
        );
      });
    } else {
      dispatch(setLocations([]));
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
      <div className="p-3 md:p-4">
        <SearchInput
          label="where-are-you"
          onChange={handleSearchChange}
          value={searchInputValue}
        />
      </div>
      <div className="h-full overflow-y-auto md:h-80">
        {isPending ? (
          <div className="flex h-full items-center justify-center w-full">
            <BeatLoader color="#2C64F6" size={16} />
          </div>
        ) : locations.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center">
            <div className="mb-1 p-3 rounded-full md:bg-gray-200 md:mb-2 md:p-2.5 md:dark:bg-dark-700">
              <MapIcon className="size-10 dark:text-gray-200 md:size-6" />
            </div>
            <h1 className="font-medium dark:text-gray-200 md:text-sm">
              {t('title')}
            </h1>
          </div>
        ) : (
          <div className="p-3 pt-0 md:p-4 md:pt-0">
            {locations.map((location) => (
              <CreatePostCheckInItem
                key={location.place_id}
                location={location}
                onClick={handleSetLocation}
                selected={activeLocation === location}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
