import { useRef } from 'react';

import { MediaType } from '@/assets/types';

export const useMedia = (
  onChangeMedia: (file: string, type: MediaType) => void,
  type: MediaType
): {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: () => void;
} => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    const fileType = file.type.split('/')[0] as 'image' | 'video';

    reader.onloadend = () => onChangeMedia(reader.result as string, fileType);
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () =>
    type !== 'video' && fileInputRef.current?.click();

  return { fileInputRef, handleFileChange, triggerFileInput };
};
