import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Feeling } from '@/modules/posts/create/assets/types';

type PostUserInfoProps = {
  feeling?: Feeling;
  hideFellingInfo?: boolean;
  location?: string;
  name: string;
};

export const PostUserInfo = ({
  feeling,
  hideFellingInfo,
  location,
  name,
}: PostUserInfoProps) => {
  const t = useTranslations('posts');

  return (
    <p className="leading-tight">
      <span className="primary-text font-semibold">{name}</span>
      {(feeling || location) && (
        <span className="tertiary-text">&nbsp;{t('user-info.is')}</span>
      )}
      {feeling && (
        <span className="tertiary-text">
          {!hideFellingInfo && (
            <span className="md:hidden">&nbsp;{t('user-info.feeling')}</span>
          )}
          &nbsp;
          <Image
            alt={t('user-info.feeling-icon-alt', { feeling })}
            className="inline-block"
            height={18}
            loading="eager"
            src={`/images/feelings/${feeling}-icon.png`}
            width={18}
          />
          <span className="hidden md:inline-block">
            &nbsp;{t('user-info.feeling')}
          </span>
          <span
            className={classNames('md:inline-block', {
              hidden: hideFellingInfo,
            })}
          >
            &nbsp;{t(`feelings.${feeling}`)}
          </span>
        </span>
      )}
      {location && (
        <span>
          <span className="tertiary-text">&nbsp;{t('user-info.in')}</span>
          <span className="primary-text font-semibold">&nbsp;{location}</span>
        </span>
      )}
    </p>
  );
};
