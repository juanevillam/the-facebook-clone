import { useTranslations } from 'next-intl';

import { InputEvent } from '@/assets/types';
import { FaceFrowIcon } from '@/assets/ui/icons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { Feeling } from '@/modules/posts/create/assets/types';

import { CreatePostStepContainer, CreatePostStepMessage } from '../ui';
import { CreatePostFeelingsStepItem } from './item/CreatePostFeelingsStepItem';
import { setCreatePostStep } from '../../../reducers/createPostPostReducer';
import {
  setCreatePostFeelingsStepActiveFeeling,
  setCreatePostFeelingsStepSearchInputValue,
} from '../../../reducers/steps/createPostFeelingsStepReducer';

export const CreatePostFeelingsStep = () => {
  const t = useTranslations('posts.create.steps.feelings');
  const dispatch = useAppDispatch();
  const { feelings, searchInputValue, activeFeeling } = useAppSelector(
    (store) => store.posts.createPost.createPostFeelingsStep
  );

  const handleClearSearch = () =>
    dispatch(setCreatePostFeelingsStepSearchInputValue(''));

  const handleSearchChange = (event: InputEvent) =>
    dispatch(setCreatePostFeelingsStepSearchInputValue(event.target.value));

  const filteredFeelings = feelings.filter((item) =>
    item.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  const handleSetActiveFeeling = (item: Feeling) => {
    dispatch(
      setCreatePostFeelingsStepActiveFeeling(
        activeFeeling === item ? null : item
      )
    );

    dispatch(setCreatePostStep('default'));
  };

  return (
    <CreatePostStepContainer
      activeItem={{
        Component: CreatePostFeelingsStepItem,
        handleSetItem: handleSetActiveFeeling,
        value: activeFeeling,
      }}
      searchInput={{
        handleChange: handleSearchChange,
        handleClear: handleClearSearch,
        label: 'search',
        value: searchInputValue,
      }}
    >
      {filteredFeelings.length === 0 ? (
        <CreatePostStepMessage Icon={FaceFrowIcon} message={t('error')} />
      ) : (
        <div className="create-post-modal-spacing-area grid grid-cols-2">
          {filteredFeelings.map((feeling, index) => (
            <CreatePostFeelingsStepItem
              active={activeFeeling === feeling}
              isEven={index % 2 === 0}
              item={feeling}
              key={feeling}
              onClick={handleSetActiveFeeling}
            />
          ))}
        </div>
      )}
    </CreatePostStepContainer>
  );
};
