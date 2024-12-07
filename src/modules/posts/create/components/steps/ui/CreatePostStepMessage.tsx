import { SharedSvg } from '@/assets/types';

type CreatePostStepMessageProps = {
  Icon: SharedSvg;
  message: string;
};

export const CreatePostStepMessage = ({
  Icon,
  message,
}: CreatePostStepMessageProps) => (
  <div className="flex-center h-full flex-col">
    <div className="md:bg-primary mb-1 rounded-full p-1 md:mb-2 md:p-2">
      <Icon className="text-primary size-10 transform transition-transform duration-200 hover:scale-110 md:size-6" />
    </div>
    <h1 className="text-primary w-11/12 text-center font-medium transition-colors duration-200 md:text-sm">
      {message}
    </h1>
  </div>
);
