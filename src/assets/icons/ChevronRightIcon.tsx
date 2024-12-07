import { SharedSvgProps } from './types';

export const ChevronRightIcon = ({
  ariaHidden = 'false',
  className,
}: SharedSvgProps) => (
  <svg aria-hidden={ariaHidden} className={className} viewBox="0 0 24 24">
    <path
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
