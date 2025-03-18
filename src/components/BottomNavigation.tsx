'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Search, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
    const router = useRouter();
    console.log(router, 'router')

    return (
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 max-w-md mx-auto h-14">
            <div className="flex justify-around">
                <Link href="/" className="flex flex-col items-center">
                    <Home className="w-6 h-6" />
                    <span className="text-xs">Home</span>
                </Link>

                <Link href="/search" className="flex flex-col items-center">
                    <Search className="w-6 h-6" />
                    <span className="text-xs">Search</span>
                </Link>

                <Link href="/profile" className="flex flex-col items-center">
                    <User className="w-6 h-6" />
                    <span className="text-xs">Profile</span>
                </Link>
            </div>
        </div>
    );
};

export default BottomNavigation;