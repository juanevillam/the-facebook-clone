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

export type { LayoutProps, PageProps, imageType };
