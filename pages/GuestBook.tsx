
import React from 'react';
import GuestRegistry from '../components/GuestRegistry';

interface GuestBookProps {
    guests: any[];
    onAddGuest: (name: string, location: string) => void;
}

const GuestBook: React.FC<GuestBookProps> = ({ guests, onAddGuest }) => {
    return (
        <div className="pt-24 min-h-screen bg-[#FDF5E6]">
            <div className="text-center mb-8">
                <h1 className="text-5xl font-script text-[#800000] mb-4">Blessings & Wishes</h1>
                <p className="text-[#4A0E0E] font-serif italic max-w-2xl mx-auto px-4">
                    "Your love and blessings mean the world to us. Thank you for being part of our journey."
                </p>
            </div>
            <GuestRegistry guests={guests} onAddGuest={onAddGuest} />
        </div>
    );
};

export default GuestBook;
