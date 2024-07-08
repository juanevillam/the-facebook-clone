import { Location } from '@/modules/posts/create/assets/types';

import { CreatePostStepItem } from '../../ui';

interface CreatePostCheckInStepItemProps {
  active: boolean;
  item: Location;
  onClick: (location: Location) => void;
}

export const CreatePostCheckInStepItem = ({
  active,
  item,
  onClick,
}: CreatePostCheckInStepItemProps) => {
  const { main_text, secondary_text } = item.structured_formatting;

  const handleSelect = () => onClick(item);

  return (
    <CreatePostStepItem active={active} handleSelect={handleSelect}>
      <div>
        <h2 className="font-medium md:font-semibold primary-text">
          {main_text}
        </h2>
        <p className="secondary-text text-sm">{secondary_text}</p>
      </div>
    </CreatePostStepItem>
  );
};
