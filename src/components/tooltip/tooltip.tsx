type TooltipProps = {
  label: string;
  position: string;
  children: React.ReactNode;
};

export const Tooltip = ({ label, position, children }: TooltipProps) => {
  return (
    <div className="relative w-full md:w-max">
      {children}
      <div
        className={`active-bg-inverse primary-text-inverse absolute hidden md:peer-hover:block left-1/2 opacity-95 pointer-events-none px-3.5 py-2.5 rounded-lg text-xs -translate-x-1/2 whitespace-nowrap z-10 ${position}`}
      >
        {label}
      </div>
    </div>
  );
};
