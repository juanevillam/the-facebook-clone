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
        className="only-desktop cursor-default fixed h-full left-0 right-0 top-0 z-10"
        onClick={onDismiss}
        onKeyPress={(e) =>
          (e.key === 'Enter' || e.key === ' ') && onDismiss && onDismiss()
        }
        role="button"
        tabIndex={0}
      />
      <div className="only-desktop card main-transition absolute p-2 right-3 drop-shadow-2xl dark:drop-shadow-none dark:border dark:main-border top-12 w-72 lg:w-80 z-10">
        {children}
      </div>
    </>
  );
