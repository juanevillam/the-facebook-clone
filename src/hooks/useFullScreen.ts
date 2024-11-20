import { useState } from 'react';

export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(
    !!document.fullscreenElement
  );

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  return { isFullScreen, toggleFullScreen };
};
