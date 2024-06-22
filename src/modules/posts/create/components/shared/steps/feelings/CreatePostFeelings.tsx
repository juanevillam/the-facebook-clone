import { useTranslations } from 'next-intl';

import { InputEvent } from '@/assets/types';
import { FaceFrowIcon } from '@/assets/ui/icons';
import { SearchInput } from '@/components/inputs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { Feeling } from '@/modules/posts/create/assets/types';
import {
  setActiveFeeling,
  setFeelingsSearchInputValue,
} from '@/modules/posts/create/reducers/feelingsSlice';
import { setStep } from '@/modules/posts/create/reducers/postSlice';

import { CreatePostFeelingsItem } from './item/CreatePostFeelingsItem';

export const CreatePostFeelings = () => {
  const t = useTranslations('posts.create.feelings');
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
          <div className="flex flex-col h-full items-center justify-center">
            <div className="mb-1 p-3 rounded-full md:bg-gray-200 md:mb-2 md:p-2.5 md:dark:bg-dark-700">
              <FaceFrowIcon className="size-10 dark:text-gray-200 md:size-6" />
            </div>
            <h1 className="font-medium dark:text-gray-200 md:text-sm">
              {t('not-found')}
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-2 p-3 pt-0 md:p-4 md:pt-0">
            {filteredFeelings.map((feeling) => (
              <CreatePostFeelingsItem
                key={feeling}
                name={feeling}
                onClick={handleSetActiveFeeling}
                selected={activeFeeling === feeling}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
