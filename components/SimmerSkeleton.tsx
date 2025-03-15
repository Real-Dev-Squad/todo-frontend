import React, { ReactNode } from 'react';

// Define the props interface for the ShimmerSkeleton component
interface ShimmerSkeletonProps {
    children: ReactNode;
    loading: boolean;
    height?: string | number;
    width?: string | number;
    borderRadius?: string;
}

// ShimmerSkeleton component with TypeScript typing
const ShimmerSkeleton: React.FC<ShimmerSkeletonProps> = ({
    children,
    loading,
    width,
    height = '100px',
    borderRadius,
}) => {
    // If not loading, render the children
    if (!loading) {
        return <>{children}</>;
    }

    // If loading, render the shimmer effectx
    return (
        <div
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
    );
};

export { ShimmerSkeleton };