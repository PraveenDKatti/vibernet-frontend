import React from 'react'

function SkeletonLoader() {
    return (
        <div className="p-4 bg-gray-50 rounded-xl shadow-md flex flex-col gap-3 animate-pulse">
            <div className="h-52 bg-gray-200 rounded-md" />
            <div className="flex gap-3 items-center">
                <div className="w-6 h-6 bg-gray-200 rounded-full shrink-0" />
                <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
            </div>
        </div>
    )
}

export default SkeletonLoader