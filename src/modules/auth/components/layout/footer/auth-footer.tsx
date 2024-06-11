import { AuthFooterLocaleSwitcher } from './locale-switcher/auth-footer-locale-switcher';

export const AuthFooter = () => (
  <footer className="grid items-center justify-center md:bg-white md:h-1/6 md:justify-normal">
    <div className="py-3 space-y-3 md:max-w-4xl md:mx-auto md:px-6 md:py-0 md:w-full lg:max-w-5xl">
      <AuthFooterLocaleSwitcher />
      <hr className="hidden md:block" />
      <p className="text-sm text-gray-500">
        {process.env.NEXT_PUBLIC_AUTHOR} © {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);
