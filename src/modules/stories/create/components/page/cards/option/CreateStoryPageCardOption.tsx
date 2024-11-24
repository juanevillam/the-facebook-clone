import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { SharedSvg } from '@/assets/types';

type CreateStoryPageCardOptionProps = {
  color: 'green-blue' | 'purple-pink';
  Icon: SharedSvg;
  onClick: VoidFunction;
  variant: 'photo' | 'text';
};

export const CreateStoryPageCardOption = ({
  color,
  Icon,
  onClick,
  variant,
}: CreateStoryPageCardOptionProps) => {
  const t = useTranslations(`stories.create.page.options.${variant}`);

  return (
    <button
      className={classNames(
        'primary-transition h-44 w-full items-center justify-center space-y-1 rounded-md bg-gradient-to-b text-center font-medium text-white hover:opacity-85 md:h-96 md:w-56 md:space-y-2 md:rounded-xl md:font-semibold lg:w-60',
        {
          'from-green-400 to-blue-500 md:from-green-400/95 md:to-blue-500/95':
            color === 'green-blue',
          'from-purple-400 to-pink-500 md:from-purple-400/95 md:to-pink-500/95':
            color === 'purple-pink',
        }
      )}
      onClick={onClick}
      type="button"
    >
      <Icon className="primary-text-light mx-auto size-11 rounded-full bg-white p-2 shadow-md md:size-10" />
      <h1 className="only-desktop-block">{t('detailed')}</h1>
      <h1 className="only-mobile">{t('short')}</h1>
    </button>
  );
};
