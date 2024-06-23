import { useTranslations } from 'next-intl';

import { InputEvent } from '@/assets/types';
import { FaceFrowIcon } from '@/assets/ui/icons';
import { SearchInput } from '@/components/inputs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_STEPS_FEELINGS_PATH } from '@/modules/posts/create/assets/translations';
import { Feeling } from '@/modules/posts/create/assets/types';
import {
  setActiveFeeling,
  setFeelingsSearchInputValue,
} from '@/modules/posts/create/reducers/feelingsSlice';
import { setStep } from '@/modules/posts/create/reducers/postSlice';

import { CreatePostFeelingsItem } from './item/CreatePostFeelingsItem';
import { StepMessage } from '../shared';

export const CreatePostFeelings = () => {
  const t = useTranslations(POSTS_CREATE_STEPS_FEELINGS_PATH);
  const dispatch = useAppDispatch();
  const { feelings, searchInputValue, activeFeeling } = useAppSelector(
    (store) => store.posts.create.feelings
  );

  const handleSearchChange = (event: InputEvent) =>
    dispatch(setFeelingsSearchInputValue(event.target.value));

  const filteredFeelings = feelings.filter((item) =>
    item.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  const handleSetActiveFeeling = (feeling: Feeling) => {
    dispatch(setActiveFeeling(activeFeeling === feeling ? null : feeling));
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
        {filteredFeelings.length === 0 ? (
          <StepMessage Icon={FaceFrowIcon} message={t('error')} />
        ) : (
          <div className="grid grid-cols-2 p-3 pt-0 md:p-4 md:pt-0">
            {filteredFeelings.map((feeling) => (
              <CreatePostFeelingsItem
                active={activeFeeling === feeling}
                key={feeling}
                name={feeling}
                onClick={handleSetActiveFeeling}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
