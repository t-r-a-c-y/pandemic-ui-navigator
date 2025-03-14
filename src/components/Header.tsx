
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  
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
      case '/notifications':
        return 'Notifications';
      case '/search':
        return 'Search';
      case '/auth':
        return 'Sign In';
      case '/profile':
        return 'My Profile';
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
          <Link to="/search" className="relative w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80">
            <Search size={20} />
          </Link>
          <Link to="/notifications" className="relative w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-pandemic-red rounded-full border-2 border-white"></span>
          </Link>
          {isAuthenticated ? (
            <Link to="/profile">
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-pandemic-blue text-white">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/auth" className="text-sm font-medium text-pandemic-blue hover:text-pandemic-blue/90">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
