import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { POSTS_USER_INFO_PATH } from '@/modules/posts/assets/translations';
import { POSTS_CREATE_STEPS_FEELINGS_LIST_PATH } from '@/modules/posts/create/assets/translations';
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
  const tUserInfo = useTranslations(POSTS_USER_INFO_PATH);
  const tFeelings = useTranslations(POSTS_CREATE_STEPS_FEELINGS_LIST_PATH);

  return (
    <p className="leading-tight">
      <span className="main-text font-semibold">{name}</span>
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
          <span className={`md:inline-block ${hideFellingInfo && 'hidden'}`}>
            &nbsp;{tFeelings(feeling)}
          </span>
        </span>
      )}
      {location && (
        <span>
          <span className="tertiary-text">&nbsp;{tUserInfo('in')}</span>
          <span className="main-text font-semibold">&nbsp;{location}</span>
        </span>
      )}
    </p>
  );
};
