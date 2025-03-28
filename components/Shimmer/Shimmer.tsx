import { cn } from '@/utils/utils'

type ShimmerProps = {

    /** Tailwind classes to override default styling */
    className?: string;
}

export const Shimmer = ({
    className,
}: ShimmerProps) => {
    return <div className={cn("animate-pulse relative overflow-hidden rounded-lg mx-3 bg-indigo-50 opacity-90 max-w-full h-full", className)} data-testid="shimmer" />
};

type ListShimmerProps = {
    /** Tailwind classes to container's override default styling */
    className?: string;

    /** Number of the shimmer inside the container   */
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
