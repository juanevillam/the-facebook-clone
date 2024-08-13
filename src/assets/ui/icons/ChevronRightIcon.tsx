import { SharedSvgProps } from './types';

export const ChevronRightIcon = ({ className }: SharedSvgProps) => {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};
