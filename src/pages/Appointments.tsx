
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Plus, 
  User,
  Check,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Mock data for appointments
const upcomingAppointments = [
  {
    id: 1,
    title: 'Booster Shot',
    date: new Date('2024-01-20T10:30:00'),
    location: 'Community Health Center',
    address: '123 Main St, Anytown, USA',
    type: 'Vaccination',
    doctor: 'Dr. Sarah Johnson',
    notes: 'Bring your vaccination card'
  },
  {
    id: 2,
    title: 'Regular Checkup',
    date: new Date('2024-01-25T14:15:00'),
    location: 'City Medical Center',
    address: '456 Park Ave, Anytown, USA',
    type: 'Checkup',
    doctor: 'Dr. James Wilson',
    notes: 'Annual physical examination'
  }
];

const pastAppointments = [
  {
    id: 3,
    title: 'Second Dose',
    date: new Date('2023-05-10T11:00:00'),
    location: 'City Medical Center',
    address: '456 Park Ave, Anytown, USA',
    type: 'Vaccination',
    doctor: 'Dr. James Wilson',
    notes: 'Pfizer vaccine'
  },
  {
    id: 4,
    title: 'First Dose',
    date: new Date('2023-04-15T09:45:00'),
    location: 'City Medical Center',
    address: '456 Park Ave, Anytown, USA',
    type: 'Vaccination',
    doctor: 'Dr. Lisa Brown',
    notes: 'Pfizer vaccine'
  }
];

type Appointment = {
  id: number;
  title: string;
  date: Date;
  location: string;
  address: string;
  type: string;
  doctor: string;
  notes: string;
};

const AppointmentCard = ({ appointment, showActions = false }: { appointment: Appointment; showActions?: boolean }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Vaccination':
        return 'bg-pandemic-blue/10 text-pandemic-blue';
      case 'Testing':
        return 'bg-pandemic-red/10 text-pandemic-red';
      case 'Checkup':
        return 'bg-pandemic-green/10 text-pandemic-green';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };
  
  return (
    <Card className="mb-4 overflow-hidden">
      <div className="flex flex-col cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{appointment.title}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {format(appointment.date, 'MMMM d, yyyy')} at {format(appointment.date, 'h:mm a')}
              </CardDescription>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
              {appointment.type}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <MapPin className="h-4 w-4 mr-1" />
            {appointment.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            {appointment.doctor}
          </div>
          
          {showDetails && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Appointment Details</h4>
              
              <div className="grid gap-2 text-sm">
                <div>
                  <span className="font-medium">Address:</span> {appointment.address}
                </div>
                <div>
                  <span className="font-medium">Notes:</span> {appointment.notes}
                </div>
              </div>
              
              {showActions && (
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Clock className="h-4 w-4 mr-1" /> Reschedule
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

const AppointmentForm = ({ onClose }: { onClose: () => void }) => {
  const [date, setDate] = useState<Date>();
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="appointment-type">Appointment Type</Label>
        <Select>
          <SelectTrigger id="appointment-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vaccination">Vaccination</SelectItem>
            <SelectItem value="testing">COVID Testing</SelectItem>
            <SelectItem value="checkup">Regular Checkup</SelectItem>
            <SelectItem value="consultation">Consultation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="appointment-title">Title</Label>
        <Input id="appointment-title" placeholder="Appointment title" />
      </div>
      
      <div className="space-y-2">
        <Label>Date</Label>
        <div className="grid gap-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className={cn("border rounded-md pointer-events-auto")}
            disabled={(date) => date < new Date()}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="appointment-time">Time</Label>
        <Select>
          <SelectTrigger id="appointment-time">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="09:00">9:00 AM</SelectItem>
            <SelectItem value="10:00">10:00 AM</SelectItem>
            <SelectItem value="11:00">11:00 AM</SelectItem>
            <SelectItem value="13:00">1:00 PM</SelectItem>
            <SelectItem value="14:00">2:00 PM</SelectItem>
            <SelectItem value="15:00">3:00 PM</SelectItem>
            <SelectItem value="16:00">4:00 PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="appointment-location">Facility</Label>
        <Select>
          <SelectTrigger id="appointment-location">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="community">Community Health Center</SelectItem>
            <SelectItem value="city">City Medical Center</SelectItem>
            <SelectItem value="university">University Hospital</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="appointment-notes">Notes</Label>
        <Textarea id="appointment-notes" placeholder="Additional information..." />
      </div>
      
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
        <Button className="flex-1">
          <Check className="h-4 w-4 mr-1" /> Schedule
        </Button>
      </div>
    </div>
  );
};

const Appointments = () => {
  const [openDialog, setOpenDialog] = useState(false);
  
  return (
    <Layout>
      <div className="page-container pb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-1" /> New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>
                  Fill in the details to book your medical appointment.
                </DialogDescription>
              </DialogHeader>
              <AppointmentForm onClose={() => setOpenDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mb-6">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map(appointment => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment}
                    showActions={true}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming appointments</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setOpenDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Schedule Now
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="past" className="mt-4">
              {pastAppointments.map(appointment => (
                <AppointmentCard 
                  key={appointment.id} 
                  appointment={appointment} 
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Appointments;
