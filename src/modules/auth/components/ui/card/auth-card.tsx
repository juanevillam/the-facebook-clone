interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <main className="w-full md:w-5/12">
      <section className="bg-white md:rounded-lg md:shadow-lg">
        <div className="p-4">{children}</div>
      </section>
    </main>
  );
};
