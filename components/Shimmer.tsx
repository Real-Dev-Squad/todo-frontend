import { cn } from '@/utils/utils'

type ShimmerProps = {
    className?: string;
}

export const Shimmer = ({
    className,
}: ShimmerProps) => {
    return <div className={cn("animate-pulse relative overflow-hidden rounded-lg mx-3 bg-indigo-50 opacity-90 max-w-full h-full", className)} data-testid="shimmer" />

};


export const ListShimmer = ({ className, count }: { className?: string, count: number }) => {
    return (
        <div className={cn("h-24 flex flex-col gap-2", className)} data-testid="list-shimmer">
            {[...Array(count)].map((_, index) => (
                <Shimmer key={index} />
            ))}
        </div>
    )
}
