/* eslint-disable @next/next/no-img-element */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import { IntlProvider } from 'next-intl';
import { z } from 'zod';

import messages from '@messages/en.json';

import { EmailAuthTextInput } from '../EmailAuthTextInput';

const emailSchema = z.object({
  email: z.string().email('form.validations.email-address'),
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt="Alert icon" {...props} />
  ),
}));

const renderWithFormik = (ui: JSX.Element) => {
  return render(
    <IntlProvider messages={messages} locale="en">
      <Formik
        initialValues={{ email: '' }}
        validate={(values) => {
          try {
            emailSchema.parse(values);
          } catch (error) {
            if (error instanceof z.ZodError) {
              return error.formErrors.fieldErrors;
            }
          }
        }}
        onSubmit={jest.fn()}
      >
        {ui}
      </Formik>
    </IntlProvider>
  );
};

describe('[AUTH] EmailAuthTextInput', () => {
  test('renders desktop input with correct attributes', () => {
    renderWithFormik(<EmailAuthTextInput />);

    const input = screen.getByTestId('email-auth-text-input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Email address');
    expect(input).toHaveAttribute('type', 'email');
  });

  test('renders mobile input with correct attributes', () => {
    renderWithFormik(<EmailAuthTextInput variant="mobile" />);

    const input = screen.getByTestId('email-auth-text-input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', ' ');
    expect(input).toHaveAttribute('type', 'email');
  });

  test('displays an error message when an invalid email is entered', async () => {
    renderWithFormik(<EmailAuthTextInput />);

    const input = screen.getByTestId('email-auth-text-input');

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.blur(input);

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');

      expect(errorMessage).toHaveTextContent('Must be a valid email');
    });
  });

  test('does not display an error message when a valid email is entered', async () => {
    renderWithFormik(<EmailAuthTextInput />);

    const input = screen.getByTestId('email-auth-text-input');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.blur(input);

    await waitFor(() => {
      const errorMessage = screen.queryByRole('alert');

      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
