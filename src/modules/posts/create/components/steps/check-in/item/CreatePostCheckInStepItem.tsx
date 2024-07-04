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
        <p className="main-text font-medium md:font-semibold">{main_text}</p>
        <p className="secondary-text text-sm">{secondary_text}</p>
      </div>
    </CreatePostStepItem>
  );
};
