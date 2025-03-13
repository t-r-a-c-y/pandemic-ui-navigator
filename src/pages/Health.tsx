
import React from 'react';
import { Activity, FilePlus, Thermometer, Virus } from 'lucide-react';
import Layout from '@/components/Layout';
import VaccinationCard from '@/components/VaccinationCard';
import StatCard from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const Health: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight">Health Status</h2>
          <p className="text-muted-foreground">Monitor your vaccination status and health information.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <StatCard 
            title="Risk Level"
            value="Low Risk"
            icon={<Virus className="w-5 h-5 text-pandemic-green" />}
            variant="success"
          />
          <StatCard 
            title="Last Check"
            value="Today"
            icon={<Activity className="w-5 h-5 text-pandemic-blue" />}
            variant="primary"
          />
        </div>

        <Card className="mb-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Vaccination Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium">2/3 Doses</span>
              </div>
              <Progress className="h-2" value={66} />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="vaccinations" className="mb-5">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
            <TabsTrigger value="health-records">Health Records</TabsTrigger>
          </TabsList>
          <TabsContent value="vaccinations" className="space-y-3 mt-3">
            <VaccinationCard
              dose="First Dose"
              date="Jan 15, 2023"
              brand="Pfizer-BioNTech"
              location="City General Hospital"
              status="completed"
            />
            <VaccinationCard
              dose="Second Dose"
              date="Feb 12, 2023"
              brand="Pfizer-BioNTech"
              location="City General Hospital"
              status="completed"
            />
            <VaccinationCard
              dose="Booster Shot"
              date="Mar 10, 2024"
              status="scheduled"
              location="Downtown Health Clinic"
            />
          </TabsContent>
          <TabsContent value="health-records" className="space-y-3 mt-3">
            <HealthRecordCard
              title="COVID-19 Test"
              date="Dec 5, 2023"
              result="Negative"
              type="PCR Test"
            />
            <HealthRecordCard
              title="Symptom Check"
              date="Nov 20, 2023"
              result="Normal"
              type="Self-assessment"
            />
            <div className="flex justify-center mt-4">
              <button className="flex items-center space-x-2 text-pandemic-blue font-medium px-4 py-2 rounded-lg border border-pandemic-blue/30 hover:bg-pandemic-blue/5 transition-colors">
                <FilePlus className="w-4 h-4" />
                <span>Add New Record</span>
              </button>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Thermometer className="w-5 h-5 mr-2 text-pandemic-red" />
              Symptom Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Track your symptoms and monitor your health status daily.
            </p>
            <button className="w-full bg-pandemic-blue text-white font-medium rounded-xl py-3 shadow-sm hover:bg-pandemic-blue/90 transition-colors">
              Start Daily Check
            </button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// Health Record Card Component
interface HealthRecordProps {
  title: string;
  date: string;
  result: string;
  type: string;
}

const HealthRecordCard: React.FC<HealthRecordProps> = ({
  title,
  date,
  result,
  type,
}) => {
  const getResultStyle = () => {
    if (result === 'Negative' || result === 'Normal') {
      return 'bg-pandemic-green/10 text-pandemic-green';
    } else if (result === 'Positive') {
      return 'bg-pandemic-red/10 text-pandemic-red';
    } else {
      return 'bg-pandemic-blue/10 text-pandemic-blue';
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-border/40 bg-white">
      <div className="px-4 py-3 flex items-center justify-between bg-pandemic-blue/5">
        <h3 className="font-medium">{title}</h3>
        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getResultStyle()}`}>
          {result}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Date</span>
          <span className="text-sm font-medium">{date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Type</span>
          <span className="text-sm font-medium">{type}</span>
        </div>
      </div>
    </div>
  );
};

export default Health;
