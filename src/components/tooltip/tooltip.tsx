interface TooltipProps {
  label: string;
  position: string;
  children: React.ReactNode;
}

export const Tooltip = ({ label, position, children }: TooltipProps) => {
  return (
    <div className="relative w-full md:w-max">
      {children}
      <div
        className={`absolute bg-dark-500 left-1/2 hidden opacity-95 pointer-events-none px-3.5 py-2.5 rounded-lg text-xs -translate-x-1/2 text-white whitespace-nowrap z-10 md:peer-hover:block dark:bg-smoke-500 dark:text-black ${position}`}
      >
        {label}
      </div>
    </div>
  );
};
