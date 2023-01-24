import React from 'react';
import Navigation from '../components/inbox/Navigation';

function NotFound() {
    return (
        <>
            <Navigation />
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-400 text-2xl font-semibold">Page Not Found ! </p>
            </div>
        </>
    );
}

export default NotFound;
