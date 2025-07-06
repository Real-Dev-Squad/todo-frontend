import { cn } from "@/utils/utils";
import { Shimmer } from "@/components/Shimmer";

type ListShimmerProps = {
    className?: string;
    count: number
}

export const ListShimmer = ({ className, count }: ListShimmerProps) => {
    return (
        <div className={cn("h-24 flex flex-col gap-2", className)} data-testid="list-shimmer">
            {[...Array(count)].map((_, index) => (
                <Shimmer key={index} />
            ))}
        </div>
    )
}
