import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Feeling } from '@/modules/posts/create/assets/types';

type PostUserInfoProps = {
  feeling?: Feeling;
  hideFellingInfo?: boolean;
  isPostContent?: boolean;
  location?: string;
  name: string;
};

export const PostUserInfo = ({
  feeling,
  hideFellingInfo = false,
  isPostContent = false,
  location,
  name,
}: PostUserInfoProps) => {
  const t = useTranslations('posts');

  return (
    <p className="leading-tight">
      <span
        className={classNames('font-semibold', {
          'primary-text-dark md:primary-text': isPostContent,
          'primary-text': !isPostContent,
        })}
      >
        {name}
      </span>
      {(feeling || location) && (
        <span
          className={classNames({
            'tertiary-text-dark md:tertiary-text': isPostContent,
            'tertiary-text': !isPostContent,
          })}
        >
          &nbsp;{t('user-info.is')}
        </span>
      )}
      {feeling && (
        <span
          className={classNames({
            'tertiary-text-dark md:tertiary-text': isPostContent,
            'tertiary-text': !isPostContent,
          })}
        >
          {hideFellingInfo && (
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
