interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="p-4 md:bg-white md:rounded-lg md:shadow-lg md:w-5/12">
      {children}
    </div>
  );
};
