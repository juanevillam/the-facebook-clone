import { useTranslations } from 'next-intl';

import { inputEventType } from '@/assets/types';
import { FaceFrowIcon } from '@/assets/ui/icons';
import { SearchInput } from '@/components/inputs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  setActiveFeeling,
  setStep,
  setFeelingsSearchInputValue,
} from '@/lib/store/reducers/posts-reducer';

import {
  CreatePostFeelingsItem,
  feelingType,
} from './item/create-post-feelings-item';

export const feelings = [
  'happy',
  'blessed',
  'loved',
  'sad',
  'excited',
  'crazy',
  'grateful',
  'silly',
  'relaxed',
  'motivated',
  'alone',
  'ok',
  'nostalgic',
  'emotional',
  'determined',
  'exhausted',
  'lucky',
  'heartbroken',
  'bored',
  'hungry',
  'pained',
  'cold',
  'cute',
  'sorry',
  'super',
  'worried',
  'funny',
  'inspired',
  'confused',
  'jolly',
  'broken',
  'irritated',
  'incomplete',
  'puzzled',
  'furious',
  'surprised',
  'meh',
  'lost',
  'rough',
  'strange',
  'awful',
  'drunk',
  'blue',
  'naked',
  'dirty',
  'small',
  'privileged',
  'trapped',
  'afraid',
  'broke',
] as const;

export const CreatePostFeelings = () => {
  const dispatch = useAppDispatch();
  const { feelings } = useAppSelector((store) => store.postsReducer);
  const t = useTranslations('posts.create.feelings');

  const handleSearchChange = (event: inputEventType) =>
    dispatch(setFeelingsSearchInputValue(event.target.value));

  const filteredFeelings = feelings.feelings.filter((feeling) =>
    feeling.toLowerCase().includes(feelings.searchInputValue.toLowerCase())
  );

  const handleSetActiveFeeling = (feeling: feelingType) => {
    dispatch(
      setActiveFeeling(feelings.activeFeeling === feeling ? null : feeling)
    );

    dispatch(setStep('default'));
  };

  return (
    <>
      <div className="p-3 md:p-4">
        <SearchInput
          label="search"
          onChange={handleSearchChange}
          value={feelings.searchInputValue}
        />
      </div>
      <div className="h-full overflow-y-auto md:h-80">
        {filteredFeelings.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center">
            <div className="mb-1 p-3 rounded-full md:bg-gray-200 md:mb-2 md:p-2.5 md:dark:bg-dark-700">
              <FaceFrowIcon className="size-10 md:size-6 dark:text-gray-200" />
            </div>
            <h1 className="font-medium md:text-sm dark:text-gray-200">
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
                selected={feelings.activeFeeling === feeling}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
