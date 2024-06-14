import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your account.</p>`,
  });
};

const sendResetPasswordEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`,
  });
};

const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA code: ${token}.</p>`,
  });
};

export {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendTwoFactorTokenEmail,
};
