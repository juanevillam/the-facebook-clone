import { SharedSvgProps } from '../ui/icons/types';

interface LayoutProps {
  params: { locale: string };
  children: React.ReactNode;
}

interface PageProps {
  params: {
    locale: string;
  };
}

type imageType = {
  alt: string;
  src: string;
};

type filePickerType = React.MutableRefObject<HTMLInputElement | null>;

type voidFunctionType = () => void;

type sharedSvgType = React.FC<SharedSvgProps>;

export type {
  LayoutProps,
  PageProps,
  imageType,
  filePickerType,
  voidFunctionType,
  sharedSvgType,
};
