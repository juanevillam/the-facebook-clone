type AuthTextInputAriaDescribedBy =
  | 'forgot-password-form-instructions'
  | 'reset-password-form-instructions';

type EmailAuthTextInputId =
  | 'login-form-email-input'
  | 'sign-up-dialog-form-email-input'
  | 'sign-up-modal-form-email-input'
  | 'forgot-password-form-email-input';

type AuthTextInputId =
  | EmailAuthTextInputId
  | 'login-form-code-input'
  | 'login-form-password-input'
  | 'sign-up-dialog-form-name-input'
  | 'sign-up-dialog-form-password-input'
  | 'sign-up-modal-form-name-input'
  | 'sign-up-modal-form-password-input'
  | 'reset-password-password-input';

type AuthTextInputSkin = 'primary' | 'secondary';

type AuthTextInputVariant = 'desktop' | 'mobile';

type AuthTextInputProps = {
  ariaDescribedBy?: AuthTextInputAriaDescribedBy;
  datatestid?: string;
  disabled?: boolean;
  id: AuthTextInputId;
  minLength?: number;
  name: string;
  placeholder: string;
  skin?: AuthTextInputSkin;
  type: 'text' | 'email' | 'password';
  variant?: AuthTextInputVariant;
};

export type {
  AuthTextInputAriaDescribedBy,
  EmailAuthTextInputId,
  AuthTextInputId,
  AuthTextInputSkin,
  AuthTextInputVariant,
  AuthTextInputProps,
};
