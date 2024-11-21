'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { SetValue } from '@/assets/types';
import { ArrowLeftIcon, GlobeIcon } from '@/assets/ui/icons';
import { usePathname, useRouter } from '@/navigation';

import { DropDownHeaderIcon } from '../../../icons';
import { ProfileDropDownStep } from '../../types';
import { ProfileDropDownRadioInput } from '../shared';

type ProfileDropDownSettingsStepProps = {
  setStep: SetValue<ProfileDropDownStep>;
};

export const ProfileDropDownSettingsStep = ({
  setStep,
}: ProfileDropDownSettingsStepProps) => {
  const locale = useLocale();
  const t = useTranslations('navbar.drop-downs.profile.steps.settings');
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = () => setStep('default');

  const handleLanguageChange = (locale: 'en' | 'es') => {
    // @ts-expect-error -- TypeScript will validate that only known `params`
    // are used in combination with a given `pathname`. Since the two will
    // always match for the current route, we can skip runtime checks.
    router.replace({ pathname, params }, { locale: locale });
  };

  return (
    <div className="px-4 py-3">
      <div className="flex-center mb-4 w-full space-x-2">
        <DropDownHeaderIcon
          leftPosition="-left-4"
          icon={{
            className: 'stroke-2 secondary-stroke size-full',
            Component: ArrowLeftIcon,
            name: 'back',
          }}
          onClick={handleClose}
          tooltilp={false}
        />
        <h1 className="primary-text truncate text-2xl font-bold">
          {t('title')}
        </h1>
      </div>
      <div className="mb-2 flex space-x-2">
        <div className="primary-bg primary-transition h-max rounded-full p-2">
          <GlobeIcon className="primary-fill size-6" />
        </div>
        <div>
          <h1 className="primary-text text-lg font-semibold">
            {t('language.title')}
          </h1>
          <p className="secondary-text truncate text-sm">
            {t('language.description')}
          </p>
        </div>
      </div>
      <div className="mb-4 ml-10">
        <ProfileDropDownRadioInput
          checked={locale === 'en'}
          label="english"
          name="language"
          onChange={() => handleLanguageChange('en')}
        />
        <ProfileDropDownRadioInput
          checked={locale === 'es'}
          label="spanish"
          name="language"
          onChange={() => handleLanguageChange('es')}
        />
      </div>
    </div>
  );
};
