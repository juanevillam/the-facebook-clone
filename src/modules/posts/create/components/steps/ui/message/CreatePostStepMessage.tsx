import { SharedSvg } from '@/assets/types';

type CreatePostStepMessageProps = {
  Icon: SharedSvg;
  message: string;
};

export const CreatePostStepMessage = ({
  Icon,
  message,
}: CreatePostStepMessageProps) => {
  return (
    <div className="flex-center-justify-center flex-col h-full">
      <div className="mb-1 md:mb-2 p-1 md:p-2 rounded-full md:primary-bg">
        <Icon className="primary-text size-10 md:size-6" />
      </div>
      <h1 className="primary-text font-medium text-center w-11/12 md:text-sm">
        {message}
      </h1>
    </div>
  );
};
