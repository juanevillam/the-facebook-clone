import { useRef, useTransition } from 'react';

import axios from 'axios';
import { useTranslations } from 'next-intl';
import { BeatLoader } from 'react-spinners';

import { GifIcon } from '@/assets/ui/icons';
import { SearchInput } from '@/components/inputs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  setGifsSearchInputValue,
  setGifs,
  setActiveGif,
  setStep,
} from '@/lib/store/reducers/posts-reducer';

import {
  CreatePostGifsItem,
  gifType,
  unparsedGifType,
} from './item/create-post-gifs-item';

export const CreatePostGifs = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('posts.create.gifs');
  const dispatch = useAppDispatch();
  const { gifs } = useAppSelector((store) => store.postsReducer);

  const getGifs = (query: string) => {
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

        const parsedGifs = data.data.map((gif: unparsedGifType) => ({
          height: gif.images.fixed_height.height,
          id: gif.id,
          title: gif.title,
          url: gif.images.fixed_height.url,
          width: gif.images.fixed_height.width,
        }));

        dispatch(setGifs(parsedGifs));
      } catch (error) {
        dispatch(setGifs([]));
      }
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    dispatch(setGifsSearchInputValue(value));

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      getGifs(value);
    }, 300);
  };

  const handleSetActiveGif = (gif: gifType) => {
    dispatch(setActiveGif(gifs.activeGif === gif ? null : gif));
    dispatch(setStep('default'));
  };

  return (
    <>
      <div className="p-3 md:p-4">
        <SearchInput
          label="search"
          onChange={handleSearchChange}
          value={gifs.searchInputValue}
        />
      </div>
      <div className="h-full overflow-y-auto md:h-80">
        {gifs.gifs.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center">
            <div className="mb-1 p-3 rounded-full md:bg-gray-200 md:mb-2 md:p-2.5 md:dark:bg-dark-700">
              <GifIcon className="size-10 md:size-6 dark:text-gray-200" />
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
          <div className="gap-3 grid grid-cols-2 p-3 pt-0 md:gap-4 md:p-4 md:pt-0">
            <div className="grid gap-3 md:gap-4">
              {gifs.gifs
                .filter((_, index) => index % 2 === 0)
                .map((gif: gifType) => (
                  <CreatePostGifsItem
                    gif={gif}
                    key={gif.id}
                    onClick={handleSetActiveGif}
                  />
                ))}
            </div>
            <div className="grid gap-3 md:gap-4">
              {gifs.gifs
                .filter((_, index) => index % 2 === 1)
                .map((gif: gifType) => (
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
