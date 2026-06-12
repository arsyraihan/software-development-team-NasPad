import React from 'react';

export default function ApplicationLogo({ className = '', isWhite = false }) {
    if (isWhite) {
        return (
            <div className={`font-black tracking-widest uppercase text-3xl drop-shadow-md ${className}`}>
                <span className="text-white">OneTracker</span>
            </div>
        );
    }

    return (
        <div className={`font-black tracking-widest uppercase text-2xl ${className}`}>
            <span className="text-red-600">One</span>
            <span className="text-orange-500">Tracker</span>
        </div>
    );
}