'use client';

import { useEffect, useRef } from 'react';

type MobileDialogProps = {
  className?: string;
  open: boolean;
  titleId: string;
  translateFrom: 'x' | 'y';
  children: React.ReactNode;
};

export const MobileDialog = ({
  className = 'h-full',
  open,
  titleId,
  translateFrom,
  children,
}: MobileDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const translateClass =
    translateFrom === 'x' ? 'translate-x-full' : 'translate-y-full';

  const translateOpenClass =
    translateFrom === 'x' ? 'translate-x-0' : 'translate-y-0';

  useEffect(() => {
    open && dialogRef.current && dialogRef.current.focus();
  }, [open]);

  return (
    <div className="md:hidden">
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 h-full bg-overlay-100 transition-all duration-300 ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className={`card fixed inset-0 z-40 transition-transform duration-300 ${className} ${
          open ? translateOpenClass : translateClass
        }`}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
};
