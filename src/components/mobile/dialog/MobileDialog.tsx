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
        className={`bg-overlay-100 fixed h-full left-0 right-0 top-0 w-full z-10 transition-all duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      />
      <div
        className={`card bottom-0 fixed h-full left-0 right-0 z-10 transition-transform duration-500 ${
          open ? translateOpenClass : translateClass
        }`}
      >
        {children}
      </div>
    </div>
  );
};
