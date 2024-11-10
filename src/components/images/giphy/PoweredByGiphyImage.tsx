import { PoweredByGiphyBlackImage } from './PoweredByGiphyBlackImage';
import { PoweredByGiphyWhiteImage } from './PoweredByGiphyWhiteImage';

export const POWERED_BY_GIPHY_IMAGE_SIZE = 140;

export const PoweredByGiphyImage = () => {
  return (
    <>
      <div className="dark:hidden">
        <PoweredByGiphyWhiteImage />
      </div>
      <div className="hidden dark:block">
        <PoweredByGiphyBlackImage />
      </div>
    </>
  );
};
