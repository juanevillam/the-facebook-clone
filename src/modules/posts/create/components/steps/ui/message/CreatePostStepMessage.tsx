import { SharedSvg } from '@/assets/types';

interface CreatePostStepMessageProps {
  Icon: SharedSvg;
  message: string;
}

export const CreatePostStepMessage = ({
  Icon,
  message,
}: CreatePostStepMessageProps) => {
  return (
    <div className="flex-center-justify-center flex-col h-full">
      <div className="md:main-bg mb-1 md:mb-2 p-3 md:p-2.5 rounded-full">
        <Icon className="main-text size-10 md:size-6" />
      </div>
      <h1 className="main-text font-medium text-center w-11/12 md:text-sm">
        {message}
      </h1>
    </div>
  );
};
