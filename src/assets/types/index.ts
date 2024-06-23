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

type ImageType = {
  alt: string;
  src: string;
};

type FileInputRef = React.MutableRefObject<HTMLInputElement | null>;

type VoidFunction = () => void;

type SharedSvg = React.FC<SharedSvgProps>;

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export type {
  LayoutProps,
  PageProps,
  ImageType,
  FileInputRef,
  VoidFunction,
  SharedSvg,
  InputEvent,
};
