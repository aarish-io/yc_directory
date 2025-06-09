import React from 'react'

export const Ping = () => {
    return (
        <div className="relative">
            <div className="absolute -left-4 top-1">
                <span className="flex size-[11px]">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-default opacity-75"></span>
                    <span className="relative inline-flex h-full w-full rounded-full bg-primary-default"></span>
                </span>
            </div>
        </div>
    )
}
