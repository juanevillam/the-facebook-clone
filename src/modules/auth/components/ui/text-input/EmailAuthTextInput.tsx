import { useTranslations } from 'next-intl';

import { AuthTextInput } from './AuthTextInput';
import {
  AuthTextInputAriaDescribedBy,
  AuthTextInputSkin,
  AuthTextInputVariant,
  EmailAuthTextInputId,
} from './types';

type EmailAuthTextInputProps = {
  ariaDescribedBy?: AuthTextInputAriaDescribedBy;
  disabled?: boolean;
  id: EmailAuthTextInputId;
  skin?: AuthTextInputSkin;
  variant?: AuthTextInputVariant;
};

export const EmailAuthTextInput = ({
  ariaDescribedBy,
  disabled,
  id,
  skin,
  variant,
}: EmailAuthTextInputProps) => {
  const t = useTranslations();

  return (
    <AuthTextInput
      ariaDescribedBy={ariaDescribedBy}
      datatestid="email-auth-text-input"
      disabled={disabled}
      id={id}
      name="email"
      placeholder={t('form.fields.email-address')}
      skin={skin}
      type="email"
      variant={variant}
    />
  );
};
