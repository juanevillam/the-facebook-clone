import { useEffect, useRef, useTransition } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import { useTranslations } from 'next-intl';
import { BeatLoader } from 'react-spinners';

import { inputEventType } from '@/assets/types';
import { MapIcon } from '@/assets/ui/icons';
import { SearchInput } from '@/components/inputs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  setActiveLocation,
  setCheckInSeachInputValue,
  setLocations,
  setStep,
} from '@/lib/store/reducers/posts-reducer';

import {
  CreatePostCheckInItem,
  locationType,
} from './item/create-post-check-in-item';

export const CreatePostCheckIn = () => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('posts.create.check-in');
  const dispatch = useAppDispatch();
  const { checkIn } = useAppSelector((store) => store.postsReducer);

  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);

  const handleSearchChange = (event: inputEventType) => {
    const value = event.target.value;

    dispatch(setCheckInSeachInputValue(value));

    const autoService = autocompleteService.current;

    if (value.length > 0 && autoService) {
      startTransition(() => {
        autoService.getPlacePredictions(
          {
            input: value,
          },
          (placePredictions) => dispatch(setLocations(placePredictions || []))
        );
      });
    } else dispatch(setLocations([]));
  };

  const handleSetLocation = (location: locationType) => {
    dispatch(setCheckInSeachInputValue(location.description));
    dispatch(
      setActiveLocation(checkIn.activeLocation === location ? null : location)
    );

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
          value={checkIn.searchInputValue}
        />
      </div>
      <div className="h-full overflow-y-auto md:h-80">
        {checkIn.locations.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center">
            <div className="mb-1 p-3 rounded-full md:bg-gray-200 md:mb-2 md:p-2.5 md:dark:bg-dark-700">
              <MapIcon className="size-10 md:size-6 dark:text-gray-200" />
            </div>
            <h1 className="font-medium md:text-sm dark:text-gray-200">
              {t('title')}
            </h1>
          </div>
        ) : isPending ? (
          <div className="flex items-center h-full justify-center w-full">
            <BeatLoader color="#2C64F6" size={16} />
          </div>
        ) : (
          <div className="p-3 pt-0 md:p-4 md:pt-0">
            {checkIn.locations.map((location) => (
              <CreatePostCheckInItem
                key={location.place_id}
                location={location}
                onClick={handleSetLocation}
                selected={checkIn.activeLocation === location}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
