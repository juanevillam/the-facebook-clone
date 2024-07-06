import { VoidFunction } from '@/assets/types';

interface PostOptionsModalProps {
  open: boolean;
  onDismiss: VoidFunction;
  children: React.ReactNode;
}

export const PostOptionsModal = ({
  onDismiss,
  open,
  children,
}: PostOptionsModalProps) =>
  open && (
    <>
      <div
        className="cursor-default fixed h-full left-0 bottom-0 right-0 top-0 z-10"
        onClick={onDismiss}
        onKeyPress={(e) =>
          (e.key === 'Enter' || e.key === ' ') && onDismiss && onDismiss()
        }
        role="button"
        tabIndex={0}
      />
      <div className="only-desktop card main-transition absolute p-2 right-3 drop-shadow-2xl top-12 w-72 lg:w-80 z-30">
        {children}
      </div>
    </>
  );
