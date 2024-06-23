import { SharedSvg } from '@/assets/types';

interface StepMessageProps {
  Icon: SharedSvg;
  message: string;
}

export const StepMessage = ({ Icon, message }: StepMessageProps) => {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="mb-1 p-3 rounded-full md:bg-gray-200 md:mb-2 md:p-2.5 md:dark:bg-dark-700">
        <Icon className="size-10 dark:text-gray-200 md:size-6" />
      </div>
      <h1 className="font-medium dark:text-gray-200 md:text-sm">{message}</h1>
    </div>
  );
};
