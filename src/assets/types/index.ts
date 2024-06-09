interface LayoutProps {
  params: { locale: string };
  children: React.ReactNode;
}

interface PageProps {
  params: {
    locale: string;
  };
}

export type { LayoutProps, PageProps };
