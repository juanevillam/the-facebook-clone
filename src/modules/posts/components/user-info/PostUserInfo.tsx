import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Feeling } from '@/modules/posts/create/assets/types';
import { Link } from '@/navigation';

type PostUserInfoProps = {
  feeling?: Feeling;
  hideFellingInfo?: boolean;
  isModal?: boolean;
  location?: string;
  name: string;
  username: string;
};

export const PostUserInfo = ({
  feeling,
  hideFellingInfo = false,
  isModal = false,
  location,
  name,
  username,
}: PostUserInfoProps) => {
  const t = useTranslations('posts');

  return (
    <p className="leading-tight">
      <Link
        className={classNames('font-semibold hover:underline', {
          'primary-text-dark md:primary-text': isModal,
          'primary-text': !isModal,
        })}
        href={`/${username}` as any}
      >
        {name}
      </Link>
      {(feeling || location) && (
        <span
          className={classNames({
            'tertiary-text-dark md:tertiary-text': isModal,
            'tertiary-text': !isModal,
          })}
        >
          &nbsp;{t('user-info.is')}
        </span>
      )}
      {feeling && (
        <span
          className={classNames({
            'tertiary-text-dark md:tertiary-text': isModal,
            'tertiary-text': !isModal,
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
