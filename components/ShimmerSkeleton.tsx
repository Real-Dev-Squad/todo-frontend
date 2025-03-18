import React, { ReactNode } from 'react';

interface ShimmerSkeletonProps {
    children: ReactNode;
    placeholder?: ReactNode;
    loading: boolean;
    height?: string | number;
    width?: string | number;
    borderRadius?: string;
}

const ShimmerSkeleton: React.FC<ShimmerSkeletonProps> = ({
    children,
    loading,
    width,
    height = '100px',
    borderRadius,
    placeholder
}) => {
    // If not loading, render the children
    if (!loading) {
        return <>{children}</>;
    }


    // If loading, render the shimmer effect
    return (
        <>
            {
                // if placeholder component provided render that instead
                !!placeholder
                    ? <>{placeholder}</>
                    : <div
                        className="relative overflow-hidden rounded-lg bg-white mx-6 max-w-full"
                        style={{
                            height,
                            width,
                            borderRadius
                        }}
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