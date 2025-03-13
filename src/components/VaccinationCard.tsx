
import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

interface VaccinationCardProps {
  dose: string;
  date?: string;
  brand?: string;
  location?: string;
  status: 'completed' | 'scheduled' | 'pending';
}

const VaccinationCard: React.FC<VaccinationCardProps> = ({
  dose,
  date,
  brand,
  location,
  status,
}) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-border/40 bg-white">
      <div className={`px-4 py-3 flex items-center justify-between ${
        status === 'completed' ? 'bg-pandemic-green/10' :
        status === 'scheduled' ? 'bg-pandemic-blue/10' : 'bg-pandemic-gray/10'
      }`}>
        <h3 className="font-medium">{dose}</h3>
        <div className="flex items-center space-x-1.5">
          {status === 'completed' ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-pandemic-green" />
              <span className="text-sm font-medium text-pandemic-green">Completed</span>
            </>
          ) : status === 'scheduled' ? (
            <>
              <Clock className="w-4 h-4 text-pandemic-blue" />
              <span className="text-sm font-medium text-pandemic-blue">Scheduled</span>
            </>
          ) : (
            <span className="text-sm font-medium text-pandemic-gray-dark">Pending</span>
          )}
        </div>
      </div>
      {(date || brand || location) && (
        <div className="p-4 space-y-2">
          {date && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="text-sm font-medium">{date}</span>
            </div>
          )}
          {brand && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Vaccine</span>
              <span className="text-sm font-medium">{brand}</span>
            </div>
          )}
          {location && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Location</span>
              <span className="text-sm font-medium">{location}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VaccinationCard;
