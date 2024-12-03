import { SharedSvgProps } from './icons/types';

type LayoutProps = {
  params: { locale: string };
  children: React.ReactNode;
};

type PageProps = {
  params: {
    locale: string;
  };
};

type DynamicPageProps = {
  params: {
    id: string;
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

type MediaType = 'image' | 'video' | null;

type Media = {
  file: string | null;
  type: MediaType;
};

export type {
  LayoutProps,
  PageProps,
  DynamicPageProps,
  ImageType,
  FileInputRef,
  SharedSvg,
  InputEvent,
  SetValue,
  Media,
  MediaType,
};
