'use client';

import { AtSymbolIcon, PhotoIcon } from '@/assets/ui/icons';

import { CreateStoryPageCardOption } from './option/CreateStoryPageCardOption';

export const CreateStoryPageCards = () => {
  return (
    <div className="flex space-x-3 p-3 md:size-full md:items-center md:justify-center md:space-x-6 md:p-6">
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
