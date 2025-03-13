
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  
  return (
    <div className="flex flex-col min-h-screen relative">
      {!isAuthPage && <Header />}
      <main className={`flex-1 ${!isAuthPage ? 'pt-20 pb-20' : ''}`}>
        <div className="animate-in">
          {children}
        </div>
      </main>
      {!isAuthPage && <BottomNav />}
    </div>
  );
};

export default Layout;
