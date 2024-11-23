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
        'primary-transition h-48 w-full items-center justify-center space-y-2 rounded-xl bg-gradient-to-b text-center font-semibold text-white hover:opacity-85 md:h-96 md:w-56 lg:w-60',
        {
          'from-green-400 to-blue-500': color === 'green-blue',
          'from-purple-400 to-pink-500': color === 'purple-pink',
        }
      )}
      onClick={onClick}
      type="button"
    >
      <Icon className="primary-text-light mx-auto size-11 rounded-full bg-white p-2 md:size-10" />
      <h1 className="only-desktop-block">{t('detailed')}</h1>
      <h1 className="only-mobile">{t('short')}</h1>
    </button>
  );
};
