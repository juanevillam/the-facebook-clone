import { useRef, useState } from 'react';

import axios from 'axios';
import { useTranslations } from 'next-intl';

import { ExclamationCircleIcon, GifIcon } from '@/assets/icons';
import { InputEvent } from '@/assets/types';
import { Button } from '@/components/buttons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { GIF, GIFUnparsed } from '@/modules/posts/create/types';

import {
  CreatePostStepContainer,
  CreatePostStepLoader,
  CreatePostStepMessage,
} from '../ui';
import { CreatePostGifsStepItem } from './CreatePostGifsStepItem';
import { setCreatePostStep } from '../../../reducers/createPostPostReducer';
import {
  setCreatePostGifsStepActiveGif,
  setCreatePostGifsStepGifs,
  setCreatePostGifsStepSearchInputValue,
} from '../../../reducers/steps/createPostGifsStepReducer';

export const CreatePostGifsStep = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const t = useTranslations('posts.create.steps.gifs');
  const dispatch = useAppDispatch();
  const { activeGif, searchInputValue, gifs, error } = useAppSelector(
    (store) => store.posts.createPost.createPostGifsStep
  );

  const handleGetGifs = async (
    query: string,
    append: boolean = false,
    newOffset: number = 0
  ) => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_GIPHY_API_URL}/search`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_GIPHY_API_KEY,
            limit: 10,
            offset: newOffset,
            q: query,
          },
        }
      );

      const parsedGifs = data.data.map((item: GIFUnparsed) => ({
        height: item.images.fixed_height.height,
        id: item.id,
        title: item.title,
        url: item.images.fixed_height.url,
        width: item.images.fixed_height.width,
      }));

      dispatch(
        setCreatePostGifsStepGifs({
          gifs: append ? [...gifs, ...parsedGifs] : parsedGifs,
          error: false,
        })
      );
    } catch (error) {
      dispatch(setCreatePostGifsStepGifs({ gifs: [], error: true }));
    } finally {
      setLoadingMore(false);
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    dispatch(setCreatePostGifsStepSearchInputValue(''));
    dispatch(setCreatePostGifsStepGifs({ gifs: [], error: false }));
    setOffset(0);
  };

  const handleSearchChange = (event: InputEvent) => {
    const { value } = event.target;

    dispatch(setCreatePostGifsStepSearchInputValue(value));
    setOffset(0);

    if (value.length === 0) {
      dispatch(setCreatePostGifsStepGifs({ gifs: [], error: false }));
      return;
    }

    debounceTimeout.current && clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(
      () => handleGetGifs(value, false, 0),
      300
    );
  };

  const handleSetActiveGif = (gif: GIF) => {
    dispatch(setCreatePostGifsStepActiveGif(activeGif === gif ? null : gif));
    dispatch(setCreatePostStep('default'));
  };

  const handleLoadMore = () => {
    const newOffset = offset + 10;

    setOffset(newOffset);
    setLoadingMore(true);
    handleGetGifs(searchInputValue, true, newOffset);
  };

  const GifsColumn = ({ index }: { index: number }) => (
    <div className="grid gap-3 md:gap-4">
      {gifs
        .filter((_, i) => i % 2 === index)
        .map((gif: GIF) => (
          <CreatePostGifsStepItem
            active={activeGif === gif}
            gif={gif}
            key={gif.id}
            onClick={handleSetActiveGif}
          />
        ))}
    </div>
  );

  return (
    <CreatePostStepContainer
      searchInput={{
        handleChange: handleSearchChange,
        handleClear: handleClearSearch,
        label: 'search',
        value: searchInputValue,
      }}
    >
      {error ? (
        <CreatePostStepMessage
          Icon={ExclamationCircleIcon}
          message={t('error')}
        />
      ) : loading && !loadingMore ? (
        <CreatePostStepLoader />
      ) : gifs.length === 0 ? (
        <CreatePostStepMessage Icon={GifIcon} message={t('info')} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 p-3 md:gap-4 md:p-4 md:pt-0">
            <GifsColumn index={0} />
            <GifsColumn index={1} />
          </div>
          <div className="px-3 pb-3 md:px-4 md:pb-4">
            <Button
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
          </div>
        </>
      )}
    </CreatePostStepContainer>
  );
};
