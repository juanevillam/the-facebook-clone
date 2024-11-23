'use client';

import { AtSymbolIcon, PhotoIcon } from '@/assets/ui/icons';

import { CreateStoryPageCardOption } from './option/CreateStoryPageCardOption';

export const CreateStoryPageCards = () => {
  return (
    <div className="flex size-full space-x-6 p-6 md:items-center md:justify-center md:p-0">
      <CreateStoryPageCardOption
        color="green-blue"
        Icon={PhotoIcon}
        onClick={() => {}}
        variant="photo"
      />
      <CreateStoryPageCardOption
        color="purple-pink"
        Icon={AtSymbolIcon}
        onClick={() => {}}
        variant="text"
      />
    </div>
  );
};
