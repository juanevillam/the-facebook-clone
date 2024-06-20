import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setActiveFeeling, setStep } from '@/lib/store/reducers/posts-reducer';

import { CreatePostFeeling, fellingType } from './feeling/create-post-feeling';

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
  const { activeFeeling } = useAppSelector((store) => store.postsReducer);

  const handleSetActiveFeeling = (feeling: fellingType) => {
    dispatch(setActiveFeeling(activeFeeling === feeling ? null : feeling));
    dispatch(setStep('default'));
  };

  return (
    <div className="h-full overflow-y-auto md:h-96">
      <div className="grid grid-cols-2 p-3 md:p-4">
        {feelings.map((feeling) => (
          <CreatePostFeeling
            key={feeling}
            name={feeling}
            selected={activeFeeling === feeling}
            onClick={handleSetActiveFeeling}
          />
        ))}
      </div>
    </div>
  );
};
