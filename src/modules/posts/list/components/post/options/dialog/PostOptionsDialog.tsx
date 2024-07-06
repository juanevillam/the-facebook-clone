import { MobileDialog } from '@/components/mobile';

interface PostOptionsDialogProps {
  open: boolean;
  onDismiss?: VoidFunction;
  children: React.ReactNode;
}

export const PostOptionsDialog = ({
  open,
  onDismiss,
  children,
}: PostOptionsDialogProps) => {
  return (
    <MobileDialog
      className="h-max"
      onDismiss={onDismiss}
      open={open}
      translateFrom="y"
    >
      <div className="dialog-accent-content">
        <div className="main-bg-accent py-1.5 rounded-lg">{children}</div>
      </div>
    </MobileDialog>
  );
};
