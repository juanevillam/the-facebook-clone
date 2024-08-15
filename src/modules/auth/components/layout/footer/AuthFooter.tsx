import { AuthFooterLocaleSwitcher } from './locale-switcher/AuthFooterLocaleSwitcher';

export const AuthFooter = () => (
  <footer className="grid items-center justify-center md:h-1/6 md:justify-normal md:bg-white">
    <div className="space-y-3 py-3 md:mx-auto md:w-full md:max-w-4xl md:px-6 md:py-0 lg:max-w-5xl">
      <AuthFooterLocaleSwitcher />
      <hr className="hidden md:block" />
      <p className="text-sm text-gray-500">
        {process.env.NEXT_PUBLIC_AUTHOR} © {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);
