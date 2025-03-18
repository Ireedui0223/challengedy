import React, { ReactNode } from 'react';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="max-w-md mx-auto bg-white min-h-screen relative">
            <main>{children}</main>
            <BottomNavigation />
        </div>
    );
};

export default Layout;