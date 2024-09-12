import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { IntlProvider } from 'next-intl';

import messages from '@messages/en.json';

import { EmailAuthTextInput } from '../EmailAuthTextInput';

const renderWithFormik = (ui: JSX.Element) => {
  return render(
    <IntlProvider messages={messages} locale="en">
      <Formik initialValues={{ email: '' }} onSubmit={jest.fn()}>
        {ui}
      </Formik>
    </IntlProvider>
  );
};

describe('[AUTH] EmailAuthTextInput', () => {
  test('renders desktop input with correct placeholder and type', () => {
    renderWithFormik(<EmailAuthTextInput />);

    const input = screen.getByTestId('email-auth-text-input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Email address');
    expect(input).toHaveAttribute('type', 'email');
  });

  test('renders mobile input with correct placeholder and type', () => {
    renderWithFormik(<EmailAuthTextInput variant="mobile" />);

    const input = screen.getByTestId('email-auth-text-input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', ' ');
    expect(input).toHaveAttribute('type', 'email');
  });
});
