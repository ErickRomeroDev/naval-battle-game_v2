
export interface SquareProps {
  children?: React.ReactNode;
}

export const Square = ({ children }: SquareProps) => {
  return (
    <div className="h-[94%] w-[94%] rounded-md border bg-blue-100 z-10">
      {children}
    </div>
  );
};
