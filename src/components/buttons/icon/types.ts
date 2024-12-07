import { SharedSvg } from '@/assets/types';

type IconButtonAriaLabel =
  | 'back-to-login'
  | 'clear-search'
  | 'clear-value'
  | 'close-create-post'
  | 'close-create-story'
  | 'close-display-accessibility-menu'
  | 'close-post'
  | 'close-post-likes-menu'
  | 'close-settings-menu'
  | 'close-sign-up-modal'
  | 'close-story'
  | 'close-story-player'
  | 'collapse-post'
  | 'compose-new-message'
  | 'expand-post'
  | 'go-back'
  | 'go-back-to-home'
  | 'mute-video'
  | 'open-comment-options-menu'
  | 'open-messenger-dropdown'
  | 'open-notification-options-menu'
  | 'open-notifications-dropdown'
  | 'open-post-options-menu'
  | 'open-profile-dropdown'
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

export type { IconButtonAriaLabel, IconButtonProps };
