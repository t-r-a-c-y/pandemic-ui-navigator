
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/health':
        return 'Health Status';
      case '/appointments':
        return 'Appointments';
      case '/map':
        return 'Risk Map';
      case '/resources':
        return 'Resources';
      case '/auth':
        return 'Sign In';
      default:
        return 'PandemicNet';
    }
  };

  if (location.pathname === '/auth') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border px-4 py-4">
      <div className="flex items-center justify-between max-w-screen-sm mx-auto">
        <h1 className="text-xl font-semibold tracking-tight">{getPageTitle()}</h1>
        <div className="flex items-center space-x-4">
          <button className="relative w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80">
            <Search size={20} />
          </button>
          <button className="relative w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-pandemic-red rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
