import { useTranslations } from 'next-intl';

import { SharedSvg } from '@/assets/types';

export type IconButtonAriaLabel =
  | 'back-to-login'
  | 'clear-search'
  | 'clear-value'
  | 'close-create-post'
  | 'close-create-story'
  | 'close-post'
  | 'close-post-likes-menu'
  | 'close-profile-dropdown-display-accessibility-menu'
  | 'close-profile-dropdown-settings-menu'
  | 'close-story'
  | 'close-story-player'
  | 'collapse-post'
  | 'compose-new-message'
  | 'expand-post'
  | 'go-back'
  | 'go-back-to-home'
  | 'mute-video'
  | 'open-comment-options-menu'
  | 'open-notification-dropdown-options-menu'
  | 'open-post-options-menu'
  | 'pause-video'
  | 'play-video'
  | 'remove-gif'
  | 'remove-media'
  | 'see-all-in-messenger'
  | 'unmute-video'
  | 'unselect-item';

type IconButtonProps = {
  className: string;
  icon: {
    ariaLabel: IconButtonAriaLabel;
    className: string;
    Component: SharedSvg;
  };
  onClick?: VoidFunction;
};

export const IconButton = ({ className, icon, onClick }: IconButtonProps) => {
  const t = useTranslations('icon-buttons');

  return (
    <button
      aria-label={t(icon.ariaLabel)}
      className={`flex-center-justify-center primary-transition rounded-full p-2 ${className}`}
      onClick={onClick}
      type="button"
    >
      <icon.Component className={icon.className} />
    </button>
  );
};
