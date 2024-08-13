import { useTranslations } from 'next-intl';

import { InputEvent } from '@/assets/types';
import { FaceFrowIcon } from '@/assets/ui/icons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { Feeling } from '@/modules/posts/create/assets/types';
import {
  setActiveFeeling,
  setFeelingsSearchInputValue,
} from '@/modules/posts/create/reducers/feelingsSlice';
import { setStep } from '@/modules/posts/create/reducers/postSlice';

import { CreatePostFeelingsStepItem } from './item/CreatePostFeelingsStepItem';
import { CreatePostStepContainer, CreatePostStepMessage } from '../ui';

export const CreatePostFeelingsStep = () => {
  const t = useTranslations('posts.create.steps.feelings');
  const dispatch = useAppDispatch();
  const { feelings, searchInputValue, activeFeeling } = useAppSelector(
    (store) => store.posts.create.feelings
  );

  const handleClearSearch = () => dispatch(setFeelingsSearchInputValue(''));

  const handleSearchChange = (event: InputEvent) =>
    dispatch(setFeelingsSearchInputValue(event.target.value));

  const filteredFeelings = feelings.filter((item) =>
    item.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  const handleSetActiveFeeling = (item: Feeling) => {
    dispatch(setActiveFeeling(activeFeeling === item ? null : item));
    dispatch(setStep('default'));
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
