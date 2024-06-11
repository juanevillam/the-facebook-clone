import { SharedSvgProps } from './types';

export const ArrowLeftIcon = ({ className }: SharedSvgProps) => {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
};
