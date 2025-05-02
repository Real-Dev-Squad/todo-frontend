import { cn } from "@/utils/utils";

type ShimmerProps = {
  className?: string;
};

export const Shimmer = ({ className }: ShimmerProps) => {
  return (
    <div
      className={cn(
        "animate-pulse relative overflow-hidden rounded-lg mx-3 bg-indigo-50 opacity-90 max-w-full h-full",
        className
      )}
      data-testid="shimmer"
    />
  );
};
