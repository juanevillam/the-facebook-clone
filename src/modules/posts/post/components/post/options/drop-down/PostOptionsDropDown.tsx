import { VoidFunction } from '@/assets/types';

interface PostOptionsDropDownProps {
  open: boolean;
  onDismiss: VoidFunction;
  children: React.ReactNode;
}

export const PostOptionsDropDown = ({
  onDismiss,
  open,
  children,
}: PostOptionsDropDownProps) =>
  open && (
    <>
      <div
        className="cursor-default fixed h-full left-0 only-desktop right-0 top-0 z-10"
        onClick={onDismiss}
        onKeyPress={(e) =>
          (e.key === 'Enter' || e.key === ' ') && onDismiss && onDismiss()
        }
        role="button"
        tabIndex={0}
      />
      <div className="absolute card drop-shadow-2xl only-desktop p-2 primary-transition right-3 top-12 w-72 lg:w-80 z-30">
        {children}
      </div>
    </>
  );
