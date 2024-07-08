import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Feeling } from '@/modules/posts/create/assets/types';

interface PostUserInfoProps {
  feeling?: Feeling;
  hideFellingInfo?: boolean;
  location?: string;
  name: string;
}

export const PostUserInfo = ({
  feeling,
  hideFellingInfo,
  location,
  name,
}: PostUserInfoProps) => {
  const tUserInfo = useTranslations('posts.user-info');
  const tFeelings = useTranslations('posts.feelings');

  return (
    <p className="leading-tight">
      <span className="font-semibold primary-text">{name}</span>
      {(feeling || location) && (
        <span className="tertiary-text">&nbsp;{tUserInfo('is')}</span>
      )}
      {feeling && (
        <span className="tertiary-text">
          {!hideFellingInfo && (
            <span className="md:hidden">&nbsp;{tUserInfo('feeling')}</span>
          )}
          &nbsp;
          <Image
            alt={tUserInfo('feeling-icon-alt', { feeling })}
            className="inline-block"
            height={18}
            loading="eager"
            src={`/images/feelings/${feeling}-icon.png`}
            width={18}
          />
          <span className="hidden md:inline-block">
            &nbsp;{tUserInfo('feeling')}
          </span>
          <span
            className={classNames('md:inline-block', {
              hidden: hideFellingInfo,
            })}
          >
            &nbsp;{tFeelings(feeling)}
          </span>
        </span>
      )}
      {location && (
        <span>
          <span className="tertiary-text">&nbsp;{tUserInfo('in')}</span>
          <span className="font-semibold primary-text">&nbsp;{location}</span>
        </span>
      )}
    </p>
  );
};
