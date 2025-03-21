import { cn } from '@/utils/utils';
import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ShimmerSkeletonProps {
    children: ReactNode;
    placeholder?: ReactNode;
    loading: boolean;
    className?: string;
    style?: React.CSSProperties | undefined
}

const ShimmerSkeleton: React.FC<ShimmerSkeletonProps> = ({
    children,
    loading,
    placeholder,
    className,
    style
}) => {
    // If not loading, render the children
    if (!loading) {
        return children;
    }


    // If loading, render the shimmer effect
    return (
        <>
            {
                // if placeholder component provided render that instead
                !!placeholder
                    ? placeholder : <div
                        style={style}
                        className={cn("relative overflow-hidden rounded-lg mx-6 bg-white max-w-full h-24", className)}
                        data-testid="shimmer-container"
                    >
                        {/* Shimmer animation element */}
                        <div className="absolute inset-0" data-testid="shimmer">
                            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-white via-indigo-50 to-white" />
                        </div>
                    </div>
            };
        </>
    );
};

export { ShimmerSkeleton };