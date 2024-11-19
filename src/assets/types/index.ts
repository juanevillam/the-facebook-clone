import { SharedSvgProps } from '../ui/icons/types';

type LayoutProps = {
  params: { locale: string };
  children: React.ReactNode;
};

type PageProps = {
  params: {
    locale: string;
  };
};

type ImageType = {
  alt: string;
  src: string;
};

type FileInputRef = React.MutableRefObject<HTMLInputElement | null>;

type SharedSvg = React.FC<SharedSvgProps>;

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export type {
  LayoutProps,
  PageProps,
  ImageType,
  FileInputRef,
  SharedSvg,
  InputEvent,
  SetValue,
};
