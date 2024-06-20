import { BeatLoader } from 'react-spinners';

export const SuspenseLoader = () => {
  return (
    <div className="flex items-center justify-center pt-[22px] md:w-5/12">
      <BeatLoader color="#2C64F6" size={16} />
    </div>
  );
};
