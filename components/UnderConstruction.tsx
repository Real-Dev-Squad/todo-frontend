import React from 'react'

export function UnderConstruction() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-12">
      <div className="mb-8 flex flex-col items-center">
        <svg
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
          className="mb-4"
          aria-hidden="true"
        >
          <rect width="80" height="80" rx="16" fill="#E5E7EB" />
          <path
            d="M20 60L60 20M20 20l40 40"
            stroke="#9CA3AF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Page Under Construction</h1>
        <p className="max-w-md text-center text-gray-500">
          This page is coming soon. We&apos;re working hard to bring you new features. Please check
          back in the near future!
        </p>
      </div>
    </div>
  )
}
