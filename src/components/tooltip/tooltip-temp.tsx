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
        className={`active-bg-inverse primary-text-inverse pointer-events-none absolute left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-xs opacity-95 md:peer-hover:block ${position}`}
      >
        {label}
      </div>
    </div>
  );
};
