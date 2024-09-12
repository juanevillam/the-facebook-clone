import { useTranslations } from 'next-intl';

import {
  AuthTextInput,
  AuthTextInputSkin,
  AuthTextInputVariant,
} from '../AuthTextInput';

type EmailAuthTextInputProps = {
  disabled?: boolean;
  skin?: AuthTextInputSkin;
  variant?: AuthTextInputVariant;
};

export const EmailAuthTextInput = ({
  disabled,
  variant,
}: EmailAuthTextInputProps) => {
  const t = useTranslations();

  return (
    <AuthTextInput
      datatestid="email-auth-text-input"
      disabled={disabled}
      name="email"
      placeholder={t('form.fields.email-address')}
      type="email"
      variant={variant}
    />
  );
};
