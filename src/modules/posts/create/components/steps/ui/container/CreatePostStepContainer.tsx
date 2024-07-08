import { InputEvent } from '@/assets/types';
import { SearchInput } from '@/components/inputs';
import { SearchInputLabel } from '@/components/inputs/search-input/SearchInput';
import { Feeling, Location } from '@/modules/posts/create/assets/types';

interface CreatePostStepContainerProps {
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
}

export const CreatePostStepContainer = ({
  activeItem,
  searchInput,
  children,
}: CreatePostStepContainerProps) => {
  const ActiveItemComponent = activeItem?.Component;

  return (
    <>
      <div className="border-b md:border-none p-3 primary-border">
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
