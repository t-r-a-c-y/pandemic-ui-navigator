
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Heart, Calendar, Map, FileText } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  if (location.pathname === '/auth') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-border px-2 py-2">
      <div className="grid grid-cols-5 max-w-screen-sm mx-auto">
        <NavItem to="/" icon={<Home size={24} />} label="Home" />
        <NavItem to="/health" icon={<Heart size={24} />} label="Health" />
        <NavItem to="/appointments" icon={<Calendar size={24} />} label="Appointments" />
        <NavItem to="/map" icon={<Map size={24} />} label="Map" />
        <NavItem to="/resources" icon={<FileText size={24} />} label="Resources" />
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex flex-col items-center justify-center px-2 py-2 rounded-xl
        ${isActive ? 'text-pandemic-blue' : 'text-muted-foreground'}
        transition-all duration-200
      `}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
    </NavLink>
  );
};

export default BottomNav;
