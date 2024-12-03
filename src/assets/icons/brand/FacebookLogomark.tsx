import { SharedSvgProps } from '../types';

export const FacebookLogoMark = ({ className }: SharedSvgProps) => {
  return (
    <svg className={className} viewBox="0 0 666.667 666.667">
      <defs>
        <clipPath clipPathUnits="userSpaceOnUse" id="a">
          <path d="M0 700h700V0H0Z" />
        </clipPath>
      </defs>
      <g
        clipPath="url(#a)"
        transform="matrix(1.33333 0 0 -1.33333 -133.333 800)"
      >
        <path
          d="M0 0c0 138.071-111.929 250-250 250S-500 138.071-500 0c0-117.245 80.715-215.622 189.606-242.638v166.242h-51.552V0h51.552v32.919c0 85.092 38.508 124.532 122.048 124.532 15.838 0 43.167-3.105 54.347-6.211V81.986c-5.901.621-16.149.932-28.882.932-40.993 0-56.832-15.528-56.832-55.9V0h81.659l-14.028-76.396h-67.631v-171.773C-95.927-233.218 0-127.818 0 0"
          fill="#2C64F6"
          fillOpacity={1}
          fillRule="nonzero"
          stroke="none"
          transform="translate(600 350)"
        />
        <path
          d="m0 0 14.029 76.396H-67.63v27.019c0 40.372 15.838 55.899 56.831 55.899 12.733 0 22.981-.31 28.882-.931v69.253c-11.18 3.106-38.509 6.212-54.347 6.212-83.539 0-122.048-39.441-122.048-124.533V76.396h-51.552V0h51.552v-166.242a250.559 250.559 0 0 1 60.394-7.362c10.254 0 20.358.632 30.288 1.831V0Z"
          fill="#FFFFFF"
          fillOpacity={1}
          fillRule="nonzero"
          stroke="none"
          transform="translate(447.918 273.604)"
        />
      </g>
    </svg>
  );
};
