import { AuthFooterLocaleSwitcher } from './locale-switcher/auth-footer-locale-switcher';

export const AuthFooter = () => (
  <footer className="bg-white grid items-center justify-center w-full md:h-1/6 md:justify-normal">
    <div className="max-w-2xl mx-auto px-6 py-3 space-y-3 w-full md:max-w-4xl md:py-0 lg:max-w-5xl">
      <AuthFooterLocaleSwitcher />
      <hr className="hidden w-full md:block" />
      <p className="text-sm text-smoke-200">
        {process.env.NEXT_PUBLIC_AUTHOR} © {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);
