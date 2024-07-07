'use client';

import { useCallback, useState } from 'react';

import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import {
  BookmarkIcon,
  DotsHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from '@/assets/ui/icons';
import { ActionLoader } from '@/components';
import { IconButton } from '@/components/buttons';
import { useCurrentUser } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { PostOptionsDialog } from './dialog/PostOptionsDialog';
import { PostOptionsDropDown } from './drop-down/PostOptionsDropDown';
import { PostOption } from './ui';
import { deletePost } from '../../../api';
import { toggleDeletingPost } from '../../../reducers/headerOptionsSlice';

interface PostOptionsProps {
  postId: string;
  postUserId: string;
}

export const PostOptions = ({ postId, postUserId }: PostOptionsProps) => {
  const [isOpenableOpen, setIsOpenableOpen] = useState(false);
  const user = useCurrentUser();
  const { deletingPost } = useAppSelector(
    (store) => store.posts.list.headerOptions
  );

  const isPostMine = user?.id === postUserId;

  const handleToggleOpenable = useCallback(() => {
    !deletingPost && setIsOpenableOpen((prev) => !prev);
  }, [deletingPost]);

  const RenderOptions = () => {
    const dispatch = useAppDispatch();
    const t = useTranslations('toast-messages');

    const handleDeletePost = () => {
      dispatch(toggleDeletingPost());

      deletePost(postId, postUserId)
        .then((data) => {
          showToast.success(t(`success.${data.message}`));
          handleToggleOpenable();
          dispatch(toggleDeletingPost());
        })
        .catch(() => {
          showToast.error(t('error.something-went-wrong'));
          handleToggleOpenable();
          dispatch(toggleDeletingPost());
        });
    };

    return (
      <>
        <PostOption IconComponent={BookmarkIcon} name="save" showDescription />
        {isPostMine && (
          <>
            <hr className="border-t main-border my-1.5 md:my-2" />
            <PostOption IconComponent={PencilIcon} name="edit" />
            <form action={handleDeletePost}>
              <hr className="border-t main-border my-1.5 md:my-2" />
              <PostOption IconComponent={TrashIcon} name="delete" />
            </form>
          </>
        )}
        <ActionLoader
          className="md:rounded-lg"
          message="deleting-post"
          open={deletingPost}
        />
      </>
    );
  };

  return (
    <>
      <IconButton
        className="flex-shrink-0 -mt-1.5 size-9 z-20 hover:active-bg-hover"
        icon={{
          className: 'secondary-fill size-full',
          Component: DotsHorizontalIcon,
          name: 'dots-horizontal',
        }}
        onClick={handleToggleOpenable}
      />
      <PostOptionsDialog open={isOpenableOpen} onDismiss={handleToggleOpenable}>
        <RenderOptions />
      </PostOptionsDialog>
      <PostOptionsDropDown
        open={isOpenableOpen}
        onDismiss={handleToggleOpenable}
      >
        <RenderOptions />
      </PostOptionsDropDown>
    </>
  );
};
