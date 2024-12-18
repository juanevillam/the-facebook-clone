import { SharedSvgProps } from './types';

export const PlusIcon = ({
  ariaHidden = 'false',
  className,
}: SharedSvgProps) => (
  <svg
    aria-hidden={ariaHidden}
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      clipRule="evenodd"
      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
      fillRule="evenodd"
    />
  </svg>
);
