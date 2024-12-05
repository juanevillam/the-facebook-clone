'use client';

import { useEffect, useRef } from 'react';

import classNames from 'classnames';

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
        className={classNames(
          'fixed inset-0 z-40 h-full bg-overlay-100 transition-opacity duration-300',
          {
            'visible opacity-100': open,
            'invisible opacity-0': !open,
          }
        )}
      />
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className={classNames(
          `card fixed inset-0 z-40 transition-transform duration-300 ${className}`,
          {
            [translateOpenClass]: open,
            [translateClass]: !open,
          }
        )}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
};
