import { SharedSvgProps } from './types';

export const ChainBroken = ({ className }: SharedSvgProps) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 112 112">
      <path
        className="fill-none stroke-[#7a7d81] stroke-[8px]"
        d="M73.79 59.8a11.76 11.76 0 01-15.91 4.89A11.76 11.76 0 0153 48.78l14.4-27.2a11.77 11.77 0 0115.91-4.89 11.79 11.79 0 014.89 15.92l-4.38 8.26"
        strokeLinecap="round"
      />
      <path
        d="M20.09 92.53a11.77 11.77 0 011.28-16.6l23.37-20a11.77 11.77 0 0116.6 1.28 11.77 11.77 0 01-1.28 16.6l-6.38 5.47-6.31 5.4-10.68 9.13a11.77 11.77 0 01-16.6-1.28z"
        className="stroke-[#90c3ff] dark:stroke-[#a4a7ab]"
        strokeWidth="8"
        fill="none"
      />
      <path
        className="fill-none stroke-[#7a7d81] stroke-[8px]"
        d="M73.79 59.8a11.76 11.76 0 01-15.91 4.89 11.3 11.3 0 01-2.81-2.07"
        strokeLinecap="round"
      />
      <path
        className="fill-none stroke-[#1876f2] stroke-2"
        d="M85.79 56.69l9.73-1.59M86.53 60.53l10.72 4.79M82.19 63.12l5.48 7.65"
        strokeLinecap="round"
      />
    </svg>
  );
};