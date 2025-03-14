import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Info, AlertTriangle, CheckCircle, X, Calendar, Map, Syringe, BadgeAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

// Notification type definition
interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'urgent';
  link?: string;
  linkType?: 'appointment' | 'map' | 'health' | 'resource';
}

const notificationsData: Notification[] = [
  {
    id: '1',
    title: 'New COVID-19 Outbreak',
    description: 'A new COVID-19 outbreak has been reported in your area. Please take necessary precautions.',
    date: '2023-11-10T09:30:00',
    read: false,
    type: 'warning',
    link: '/map',
    linkType: 'map'
  },
  {
    id: '2',
    title: 'Vaccination Appointment Reminder',
    description: 'Your COVID-19 booster appointment is scheduled for tomorrow at 2:00 PM.',
    date: '2023-11-09T14:00:00',
    read: true,
    type: 'info',
    link: '/appointments',
    linkType: 'appointment'
  },
  {
    id: '3',
    title: 'Health Check-up Completed',
    description: 'Your recent health check-up results are now available. All indicators are normal.',
    date: '2023-11-08T10:15:00',
    read: true,
    type: 'success',
    link: '/health',
    linkType: 'health'
  },
  {
    id: '4',
    title: 'Travel Advisory',
    description: 'A travel advisory has been issued for international travel due to rising cases globally.',
    date: '2023-11-07T16:45:00',
    read: false,
    type: 'urgent',
    link: '/resources',
    linkType: 'resource'
  },
  {
    id: '5',
    title: 'New Health Resources Available',
    description: 'New resources on pandemic prevention have been added to the resources section.',
    date: '2023-11-06T11:20:00',
    read: false,
    type: 'info',
    link: '/resources',
    linkType: 'resource'
  },
  {
    id: '6',
    title: 'Local Quarantine Guidelines Updated',
    description: 'The local health department has updated quarantine guidelines. Please review the changes.',
    date: '2023-11-05T13:10:00',
    read: true,
    type: 'warning',
    link: '/resources',
    linkType: 'resource'
  }
];

const NotificationIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
  switch (type) {
    case 'info':
      return <Info className="h-5 w-5 text-blue-500" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'urgent':
      return <BadgeAlert className="h-5 w-5 text-red-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const LinkIcon: React.FC<{ linkType?: Notification['linkType'] }> = ({ linkType }) => {
  switch (linkType) {
    case 'appointment':
      return <Calendar className="h-4 w-4" />;
    case 'map':
      return <Map className="h-4 w-4" />;
    case 'health':
      return <Syringe className="h-4 w-4" />;
    case 'resource':
      return <Info className="h-4 w-4" />;
    default:
      return null;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  
  // If it's today, just show the time
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // If it's yesterday, show "Yesterday"
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // Otherwise show the full date
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const { toast } = useToast();
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast({
      description: "Notification dismissed",
      duration: 3000,
    });
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      description: "All notifications marked as read",
      duration: 3000,
    });
  };
  
  const clearAll = () => {
    setNotifications([]);
    toast({
      description: "All notifications cleared",
      duration: 3000,
    });
  };
  
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <Layout>
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              Mark all as read
            </Button>
            <Button variant="outline" onClick={clearAll} disabled={notifications.length === 0}>
              Clear all
            </Button>
          </div>
        </div>
        
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={cn(
                  "transition-all hover:shadow-md",
                  !notification.read && "border-l-4 border-primary"
                )}
              >
                <CardHeader className="flex flex-row items-start gap-4 p-4 pb-0">
                  <div className="mt-1">
                    <NotificationIcon type={notification.type} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{notification.title}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 -mr-2"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="mt-1 text-xs">
                      {formatDate(notification.date)}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm">{notification.description}</p>
                </CardContent>
                {notification.link && (
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs px-2"
                      onClick={() => markAsRead(notification.id)}
                    >
                      {notification.read ? 'Mark as unread' : 'Mark as read'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1 ml-auto"
                      asChild
                      onClick={() => markAsRead(notification.id)}
                    >
                      <a href={notification.link}>
                        <LinkIcon linkType={notification.linkType} />
                        <span>{notification.linkType === 'map' ? 'View on map' : 
                               notification.linkType === 'appointment' ? 'View appointment' : 
                               notification.linkType === 'health' ? 'Check health info' : 'View resource'}</span>
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No notifications</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              You're all caught up! When you receive notifications, they will appear here.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notifications;
