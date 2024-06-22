import { useRef, useTransition } from 'react';

import axios from 'axios';
import { useTranslations } from 'next-intl';
import { BeatLoader } from 'react-spinners';

import { InputEvent } from '@/assets/types';
import { GifIcon } from '@/assets/ui/icons';
import { SearchInput } from '@/components/inputs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { GIF, unparsedGIF } from '@/modules/posts/create/assets/types';
import {
  setActiveGif,
  setGifs,
  setGifsSearchInputValue,
} from '@/modules/posts/create/reducers/gifsSlice';
import { setStep } from '@/modules/posts/create/reducers/postSlice';

import { CreatePostGifsItem } from './item/CreatePostGifsItem';

export const CreatePostGifs = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('posts.create.gifs');
  const dispatch = useAppDispatch();
  const { activeGif, searchInputValue, gifs } = useAppSelector(
    (store) => store.posts.create.gifs
  );

  const handleGetGifs = (query: string) => {
    startTransition(async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_GIPHY_API_URL}/${query ? 'search' : 'trending'}`,
          {
            params: {
              api_key: process.env.NEXT_PUBLIC_GIPHY_API_KEY,
              limit: 20,
              q: query,
            },
          }
        );

        const parsedGifs = data.data.map((item: unparsedGIF) => ({
          height: item.images.fixed_height.height,
          id: item.id,
          title: item.title,
          url: item.images.fixed_height.url,
          width: item.images.fixed_height.width,
        }));

        dispatch(setGifs(parsedGifs));
      } catch (error) {
        dispatch(setGifs([]));
      }
    });
  };

  const handleSearchChange = (event: InputEvent) => {
    const { value } = event.target;

    dispatch(setGifsSearchInputValue(value));

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      handleGetGifs(value);
    }, 300);
  };

  const handleSetActiveGif = (gif: GIF) => {
    dispatch(setActiveGif(activeGif === gif ? null : gif));
    dispatch(setStep('default'));
  };

  return (
    <>
      <div className="p-3 md:p-4">
        <SearchInput
          label="search"
          onChange={handleSearchChange}
          value={searchInputValue}
        />
      </div>
      <div className="h-full overflow-y-auto md:h-80">
        {isPending ? (
          <div className="flex h-full items-center justify-center w-full">
            <BeatLoader color="#2C64F6" size={16} />
          </div>
        ) : gifs.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center">
            <div className="mb-1 p-3 rounded-full md:bg-gray-200 md:mb-2 md:p-2.5 md:dark:bg-dark-700">
              <GifIcon className="size-10 dark:text-gray-200 md:size-6" />
            </div>
            <h1 className="font-medium dark:text-gray-200 md:text-sm">
              {t('title')}
            </h1>
          </div>
        ) : (
          <div className="gap-3 grid grid-cols-2 p-3 pt-0 md:gap-4 md:p-4 md:pt-0">
            <div className="grid gap-3 md:gap-4">
              {gifs
                .filter((_, index) => index % 2 === 0)
                .map((gif: GIF) => (
                  <CreatePostGifsItem
                    gif={gif}
                    key={gif.id}
                    onClick={handleSetActiveGif}
                  />
                ))}
            </div>
            <div className="grid gap-3 md:gap-4">
              {gifs
                .filter((_, index) => index % 2 === 1)
                .map((gif: GIF) => (
                  <CreatePostGifsItem
                    gif={gif}
                    key={gif.id}
                    onClick={handleSetActiveGif}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
