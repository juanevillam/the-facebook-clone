import { SharedSvgProps } from './types';

export const ChevronLeftIcon = ({ className }: SharedSvgProps) => {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M15.75 19.5 8.25 12l7.5-7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
