
import React from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import VaccinationCard from '../components/VaccinationCard';
import MapView from '../components/MapView';
import { Activity, AlertTriangle, ArrowRight, Calendar, Heart, MapPin, Shield, User, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="page-container">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-pandemic-blue flex items-center justify-center text-white">
            <User size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Welcome back, John</h2>
            <p className="text-sm text-muted-foreground">Last update: Today, 11:30 AM</p>
          </div>
        </div>
        
        <div className="status-chip bg-pandemic-red/10 text-pandemic-red inline-flex items-center mb-4">
          <AlertTriangle className="w-3 h-3 mr-1" />
          <span>Urgent: New outbreak reported</span>
        </div>
        
        <Card className="mb-6 border-pandemic-red/20 bg-pandemic-red/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-pandemic-red flex items-center">
              <Info className="w-4 h-4 mr-1" />
              Pandemic Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">A new virus variant has been detected in your region. Health authorities recommend wearing masks in crowded areas and getting your booster shot.</p>
          </CardContent>
        </Card>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">Pandemic Statistics</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard 
              title="New Cases" 
              value="3,459" 
              trend={-12}
              variant="danger"
              icon={<Activity size={18} className="text-pandemic-red" />}
            />
            <StatCard 
              title="Recoveries" 
              value="5,204" 
              trend={8}
              variant="success"
              icon={<Shield size={18} className="text-pandemic-green" />}
            />
            <StatCard 
              title="Local Risk" 
              value="Medium" 
              variant="warning"
              icon={<MapPin size={18} className="text-pandemic-yellow" />}
            />
            <StatCard 
              title="Your Status" 
              value="Protected" 
              variant="success"
              icon={<Heart size={18} className="text-pandemic-green" />}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">Pandemic Map</h2>
            <button className="text-sm font-medium text-pandemic-blue flex items-center" onClick={() => navigate('/map')}>
              View Full Map
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="h-80 w-full overflow-hidden rounded-2xl shadow-lg border border-border">
            <MapView />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Visualizing current pandemic spread. Red indicates high infection rates.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">Your Vaccination</h2>
            <button className="text-sm font-medium text-pandemic-blue flex items-center" onClick={() => navigate('/health')}>
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            <VaccinationCard 
              dose="First Dose" 
              date="Apr 15, 2023"
              brand="Pfizer"
              location="City Medical Center"
              status="completed"
            />
            <VaccinationCard 
              dose="Second Dose" 
              date="May 10, 2023"
              brand="Pfizer"
              location="City Medical Center"
              status="completed"
            />
            <VaccinationCard 
              dose="Booster Shot" 
              date="Jan 20, 2024"
              brand="Moderna"
              location="Community Health Center"
              status="scheduled"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">Upcoming Appointments</h2>
            <button className="text-sm font-medium text-pandemic-blue flex items-center" onClick={() => navigate('/appointments')}>
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <div className="flex items-start">
              <div className="p-2 bg-pandemic-blue/10 rounded-lg mr-4">
                <Calendar className="h-6 w-6 text-pandemic-blue" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Booster Shot Appointment</h3>
                <p className="text-sm text-muted-foreground">Jan 20, 2024 - 10:30 AM</p>
                <p className="text-sm text-muted-foreground">Community Health Center</p>
              </div>
              <div className="bg-pandemic-blue/5 px-3 py-1 rounded-full text-xs font-medium text-pandemic-blue">
                In 15 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
