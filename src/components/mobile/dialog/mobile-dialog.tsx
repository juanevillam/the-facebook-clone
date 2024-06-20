interface MobileDialogProps {
  open: boolean;
  translateFrom: 'x' | 'y';
  children: React.ReactNode;
}

export const MobileDialog = ({
  open,
  translateFrom,
  children,
}: MobileDialogProps) => {
  const translateClass =
    translateFrom === 'x' ? 'translate-x-full' : 'translate-y-full';

  const translateOpenClass =
    translateFrom === 'x' ? 'translate-x-0' : 'translate-y-0';

  return (
    <div className="md:hidden">
      <div
        className={`bg-overlay-100 duration-500 fixed h-full left-0 right-0 transition-all top-0 w-full z-10 ${
          open ? 'opacity-100 visible' : 'invisible opacity-0'
        }`}
      />
      <div
        className={`bg-white bottom-0 duration-500 fixed h-full left-0 right-0 transition-transform z-10 dark:bg-dark-100 ${
          open ? translateOpenClass : translateClass
        }`}
      >
        {children}
      </div>
    </div>
  );
};
