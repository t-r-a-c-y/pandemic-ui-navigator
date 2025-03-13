
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'danger' | 'warning' | 'success';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  icon,
  variant = 'default',
  className,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-pandemic-blue/10 text-pandemic-blue';
      case 'danger':
        return 'bg-pandemic-red/10 text-pandemic-red';
      case 'warning':
        return 'bg-pandemic-yellow/10 text-pandemic-yellow';
      case 'success':
        return 'bg-pandemic-green/10 text-pandemic-green';
      default:
        return 'bg-white text-foreground';
    }
  };

  return (
    <div className={cn(
      'rounded-2xl p-4 shadow-sm border border-border/40',
      getVariantStyles(),
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-sm font-medium opacity-80">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend !== undefined && (
            <p className={`text-xs font-medium mt-1 ${trend >= 0 ? 'text-pandemic-red' : 'text-pandemic-green'}`}>
              {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
            </p>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-full bg-white/50 backdrop-blur-sm">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
