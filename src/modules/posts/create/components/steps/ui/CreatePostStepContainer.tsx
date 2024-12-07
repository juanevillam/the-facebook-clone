import { InputEvent } from '@/assets/types';
import { SearchInput } from '@/components';
import { SearchInputLabel } from '@/components/SearchInput';
import { Feeling, Location } from '@/modules/posts/create/types';

type CreatePostStepContainerProps = {
  activeItem?: {
    Component: React.ElementType;
    handleSetItem: ((item: Feeling) => void) | ((item: Location) => void);
    value: Feeling | Location | null;
  };
  searchInput: {
    handleChange: (event: InputEvent) => void;
    handleClear: VoidFunction;
    label: SearchInputLabel;
    value: string;
  };
  children: React.ReactNode;
};

export const CreatePostStepContainer = ({
  activeItem,
  searchInput,
  children,
}: CreatePostStepContainerProps) => {
  const ActiveItemComponent = activeItem?.Component;

  return (
    <>
      <div className="border-primary border-b p-3 md:border-none">
        <SearchInput
          label={searchInput.label}
          handleClear={searchInput.handleClear}
          onChange={searchInput.handleChange}
          value={searchInput.value}
        />
      </div>
      {activeItem?.value && ActiveItemComponent && (
        <div className="create-post-modal-spacing-area">
          <ActiveItemComponent
            active
            item={activeItem.value}
            onClick={activeItem.handleSetItem}
          />
        </div>
      )}
      <div className="modal-scrollable-area">{children}</div>
    </>
  );
};
