
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import MapView from '@/components/MapView';
import { Search, Filter, AlertCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Map: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Pandemic Risk Map</h2>
          <p className="text-muted-foreground">View current outbreak locations and risk levels around the world.</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="relative mb-4">
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search locations..." 
                className="pl-9 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Map View */}
        <div className="rounded-2xl overflow-hidden shadow-sm mb-5 h-[400px]">
          <MapView />
        </div>

        {/* Tabs for Data Views */}
        <Tabs defaultValue="outbreaks" className="mb-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="outbreaks">Active Outbreaks</TabsTrigger>
            <TabsTrigger value="cases">Case Counts</TabsTrigger>
            <TabsTrigger value="alerts">Recent Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="outbreaks" className="space-y-3 mt-3">
            <OutbreakCard 
              location="New York"
              cases={1245}
              riskLevel="high"
              trend="increasing"
              lastUpdated="2 hours ago"
            />
            <OutbreakCard 
              location="California"
              cases={892}
              riskLevel="high"
              trend="stable"
              lastUpdated="3 hours ago"
            />
            <OutbreakCard 
              location="Florida"
              cases={567}
              riskLevel="medium"
              trend="decreasing"
              lastUpdated="5 hours ago"
            />
          </TabsContent>
          
          <TabsContent value="cases" className="mt-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Global Case Counts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Cases</span>
                    <span className="font-medium">32,567</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Recovered</span>
                    <span className="font-medium">189,754</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Cases</span>
                    <span className="font-medium">223,321</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-3 mt-3">
            <AlertCard 
              title="New Outbreak Detected"
              location="Chicago, IL"
              timestamp="Today, 09:23 AM"
              severity="high"
            />
            <AlertCard 
              title="Travel Warning"
              location="International Travel"
              timestamp="Yesterday, 04:15 PM" 
              severity="medium"
            />
            <AlertCard 
              title="Containment Success"
              location="Seattle, WA"
              timestamp="June 3, 2023"
              severity="low"
            />
          </TabsContent>
        </Tabs>

        {/* Nearby Locations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Locations Near You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <LocationCard 
                name="Downtown Health Clinic"
                distance="0.8 miles"
                type="Testing Center"
                status="Open"
              />
              <LocationCard 
                name="City General Hospital"
                distance="1.2 miles"
                type="Hospital"
                status="Busy"
              />
              <LocationCard 
                name="Westside Pharmacy"
                distance="1.5 miles"
                type="Vaccination Site"
                status="Open"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// Outbreak Card Component
interface OutbreakCardProps {
  location: string;
  cases: number;
  riskLevel: 'low' | 'medium' | 'high';
  trend: 'increasing' | 'decreasing' | 'stable';
  lastUpdated: string;
}

const OutbreakCard: React.FC<OutbreakCardProps> = ({
  location,
  cases,
  riskLevel,
  trend,
  lastUpdated,
}) => {
  const getRiskStyle = () => {
    switch(riskLevel) {
      case 'high': return 'bg-pandemic-red/10 text-pandemic-red';
      case 'medium': return 'bg-pandemic-yellow/10 text-pandemic-yellow';
      case 'low': return 'bg-pandemic-green/10 text-pandemic-green';
    }
  };

  const getTrendStyle = () => {
    switch(trend) {
      case 'increasing': return 'text-pandemic-red';
      case 'decreasing': return 'text-pandemic-green';
      case 'stable': return 'text-pandemic-blue';
    }
  };

  const getTrendIcon = () => {
    switch(trend) {
      case 'increasing': return '↑';
      case 'decreasing': return '↓';
      case 'stable': return '→';
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-border/40 bg-white">
      <div className="px-4 py-3 flex items-center justify-between bg-pandemic-blue/5">
        <h3 className="font-medium">{location}</h3>
        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskStyle()}`}>
          {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Active Cases</span>
          <span className="text-sm font-medium">{cases.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Trend</span>
          <span className={`text-sm font-medium ${getTrendStyle()}`}>
            {getTrendIcon()} {trend.charAt(0).toUpperCase() + trend.slice(1)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Last Updated</span>
          <span className="text-sm">{lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};

// Alert Card Component
interface AlertCardProps {
  title: string;
  location: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

const AlertCard: React.FC<AlertCardProps> = ({
  title,
  location,
  timestamp,
  severity,
}) => {
  const getSeverityStyle = () => {
    switch(severity) {
      case 'high': return 'bg-pandemic-red/10 text-pandemic-red';
      case 'medium': return 'bg-pandemic-yellow/10 text-pandemic-yellow';
      case 'low': return 'bg-pandemic-green/10 text-pandemic-green';
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-border/40 bg-white">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className={`w-4 h-4 mr-2 ${severity === 'high' ? 'text-pandemic-red' : severity === 'medium' ? 'text-pandemic-yellow' : 'text-pandemic-green'}`} />
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityStyle()}`}>
          {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Location</span>
          <span className="text-sm font-medium">{location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Time</span>
          <span className="text-sm">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

// Location Card Component
interface LocationCardProps {
  name: string;
  distance: string;
  type: string;
  status: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  name,
  distance,
  type,
  status,
}) => {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
      <div className="w-10 h-10 rounded-full bg-pandemic-blue/10 flex items-center justify-center flex-shrink-0">
        <MapPin className="w-5 h-5 text-pandemic-blue" />
      </div>
      <div className="flex-grow">
        <h4 className="font-medium text-sm">{name}</h4>
        <p className="text-xs text-muted-foreground">{type} • {distance}</p>
      </div>
      <div className={`px-2 py-0.5 text-xs rounded-full font-medium ${status === 'Open' ? 'bg-pandemic-green/10 text-pandemic-green' : status === 'Busy' ? 'bg-pandemic-yellow/10 text-pandemic-yellow' : 'bg-pandemic-red/10 text-pandemic-red'}`}>
        {status}
      </div>
    </div>
  );
};

export default Map;
