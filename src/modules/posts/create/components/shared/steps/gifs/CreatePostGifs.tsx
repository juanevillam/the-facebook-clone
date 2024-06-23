import { useRef, useState } from 'react';

import axios from 'axios';
import { useTranslations } from 'next-intl';

import { InputEvent } from '@/assets/types';
import { ExclamationCircleIcon, GifIcon } from '@/assets/ui/icons';
import { Button } from '@/components/buttons';
import { SearchInput } from '@/components/inputs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_STEPS_PATH } from '@/modules/posts/create/assets/translations';
import { GIF, unparsedGIF } from '@/modules/posts/create/assets/types';
import {
  setActiveGif,
  setGifs,
  setGifsSearchInputValue,
} from '@/modules/posts/create/reducers/gifsSlice';
import { setStep } from '@/modules/posts/create/reducers/postSlice';

import { CreatePostGifsItem } from './item/CreatePostGifsItem';
import { StepLoader, StepMessage } from '../shared';

export const CreatePostGifs = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const t = useTranslations(`${POSTS_CREATE_STEPS_PATH}.gifs`);
  const dispatch = useAppDispatch();
  const { activeGif, searchInputValue, gifs, error } = useAppSelector(
    (store) => store.posts.create.gifs
  );

  const handleGetGifs = async (query: string, append: boolean = false) => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_GIPHY_API_URL}/${query ? 'search' : 'trending'}`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_GIPHY_API_KEY,
            limit: 20,
            offset,
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

      dispatch(
        setGifs({
          gifs: append ? [...gifs, ...parsedGifs] : parsedGifs,
          error: false,
        })
      );
    } catch (error) {
      dispatch(setGifs({ gifs: [], error: true }));
    } finally {
      setLoadingMore(false);
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    dispatch(setGifsSearchInputValue(''));
    dispatch(setGifs({ gifs: [], error: false }));
    setOffset(0);
  };

  const handleSearchChange = (event: InputEvent) => {
    const { value } = event.target;

    dispatch(setGifsSearchInputValue(value));
    setOffset(0);

    if (value.length === 0) {
      dispatch(setGifs({ gifs: [], error: false }));
      return;
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      handleGetGifs(value);
    }, 300);
  };

  const handleSetActiveGif = (gif: GIF) => {
    dispatch(setActiveGif(activeGif === gif ? null : gif));
    dispatch(setStep('default'));
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setOffset((prevOffset) => prevOffset + 20);
    handleGetGifs(searchInputValue, true);
  };

  return (
    <>
      <div className="p-3 md:p-4">
        <SearchInput
          label="search"
          handleClear={handleClearSearch}
          onChange={handleSearchChange}
          value={searchInputValue}
        />
      </div>
      <div className="h-full overflow-y-auto md:h-80">
        {error ? (
          <StepMessage Icon={ExclamationCircleIcon} message={t('error')} />
        ) : loading && !loadingMore ? (
          <StepLoader />
        ) : gifs.length === 0 ? (
          <StepMessage Icon={GifIcon} message={t('info')} />
        ) : (
          <>
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
            <Button
              className="pb-3 px-3 md:pb-4 md:px-4"
              disabled={loadingMore}
              fullWidth
              label={t('button.label')}
              loading={loadingMore}
              loadingLabel={t('button.loading-label')}
              onClick={handleLoadMore}
              size="sm"
              type="button"
              variant="primary"
            />
          </>
        )}
      </div>
    </>
  );
};
