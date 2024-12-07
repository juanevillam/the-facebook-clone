type SharedSvgProps = {
  ariaHidden?: 'true' | 'false';
  className: string;
};

type SharedActiveSvgProps = {
  className: string;
  isActive: boolean;
};

export type { SharedSvgProps, SharedActiveSvgProps };
