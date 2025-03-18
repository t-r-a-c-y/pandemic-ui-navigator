
import React from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Stethoscope, User } from 'lucide-react';

export interface ChatMessageProps {
  message: string;
  isAI: boolean;
  timestamp: Date;
  messageType?: 'general' | 'warning' | 'success' | 'info';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isAI, 
  timestamp, 
  messageType = 'general' 
}) => {
  return (
    <div className={cn(
      "flex w-full gap-3 mb-4",
      isAI ? "justify-start" : "justify-end"
    )}>
      {isAI && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-pandemic-blue text-white">
            <Stethoscope className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "rounded-xl px-4 py-3 max-w-[80%]",
        isAI 
          ? "bg-card text-card-foreground border border-border rounded-tl-none" 
          : "bg-pandemic-blue text-white rounded-tr-none",
        messageType === 'warning' && isAI && "bg-amber-50 border-amber-200 text-amber-800",
        messageType === 'success' && isAI && "bg-green-50 border-green-200 text-green-800",
        messageType === 'info' && isAI && "bg-blue-50 border-blue-200 text-blue-800"
      )}>
        <p className="text-sm whitespace-pre-wrap">{message}</p>
        <p className="text-xs mt-1 opacity-70">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {!isAI && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-muted text-muted-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
