type MobileDialogProps = {
  className?: string;
  onDismiss?: VoidFunction;
  open: boolean;
  translateFrom: 'x' | 'y';
  children: React.ReactNode;
};

export const MobileDialog = ({
  className = 'h-full',
  open,
  onDismiss,
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
        className={`fixed left-0 right-0 top-0 z-40 h-full bg-overlay-100 transition-all duration-300 ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={onDismiss}
        onKeyPress={(e) =>
          (e.key === 'Enter' || e.key === ' ') && onDismiss && onDismiss()
        }
        role="button"
        tabIndex={0}
      />
      <div
        className={`card fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${className} ${
          open ? translateOpenClass : translateClass
        }`}
      >
        {children}
      </div>
    </div>
  );
};
