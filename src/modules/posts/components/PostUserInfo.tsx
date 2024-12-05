import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Feeling } from '@/modules/posts/create/types';
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
  const t = useTranslations();

  return (
    <p className="leading-tight">
      <Link
        aria-label={t('links.visit-profile', { user: name })}
        className={classNames('font-semibold hover:underline', {
          'text-primary-dark md:text-primary': isModal,
          'text-primary': !isModal,
        })}
        href={`/${username}` as any}
      >
        {name}
      </Link>
      {(feeling || location) && (
        <span
          className={classNames({
            'text-tertiary-dark md:text-tertiary': isModal,
            'text-tertiary': !isModal,
          })}
        >
          &nbsp;{t('posts.user-info.is')}
        </span>
      )}
      {feeling && (
        <span
          aria-label={t('posts.user-info.feeling-aria', {
            user: name,
            feeling,
          })}
          className={classNames({
            'text-tertiary-dark md:text-tertiary': isModal,
            'text-tertiary': !isModal,
          })}
        >
          {hideFellingInfo && (
            <span className="md:hidden">
              &nbsp;{t('posts.user-info.feeling')}
            </span>
          )}
          &nbsp;
          <Image
            alt={t('posts.user-info.feeling-icon-alt', { feeling })}
            className="inline-block"
            height={18}
            loading="eager"
            src={`/images/feelings/${feeling}-icon.png`}
            width={18}
          />
          <span className="hidden md:inline-block">
            &nbsp;{t('posts.user-info.feeling')}
          </span>
          <span
            className={classNames('md:inline-block', {
              hidden: hideFellingInfo,
            })}
          >
            &nbsp;{t(`posts.feelings.${feeling}`)}
          </span>
        </span>
      )}
      {location && (
        <span
          aria-label={t('posts.user-info.location-aria', {
            user: name,
            location,
          })}
        >
          <span className="text-tertiary">&nbsp;{t('posts.user-info.in')}</span>
          <span className="text-primary font-semibold">&nbsp;{location}</span>
        </span>
      )}
    </p>
  );
};
