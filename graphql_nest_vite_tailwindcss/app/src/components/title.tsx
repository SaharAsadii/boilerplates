export const Title: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <h1
      className={`text-2xl md:text-4xl text-primary font-bold mb-16 mt-8 text-center ${className}`}
    >
      {children}
    </h1>
  );
};
