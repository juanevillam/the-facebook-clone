import { AuthFooterLocaleSwitcher } from './locale-switcher/AuthFooterLocaleSwitcher';

export const AuthFooter = () => (
  <footer className="grid items-center justify-center md:bg-white md:h-1/6 md:justify-normal">
    <div className="py-3 md:py-0 space-y-3 md:max-w-4xl lg:max-w-5xl md:mx-auto md:px-6 md:w-full">
      <AuthFooterLocaleSwitcher />
      <hr className="hidden md:block" />
      <p className="text-gray-500 text-sm">
        {process.env.NEXT_PUBLIC_AUTHOR} © {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);
