
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search as SearchIcon, Calendar, Map, FileText, User, Pill, ArrowRight, Activity, Book, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Search result type definitions
interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'appointment' | 'location' | 'resource' | 'contact' | 'health';
  link: string;
  date?: string;
  highlight?: string;
}

const searchData: SearchResult[] = [
  // Appointments
  {
    id: 'app-1',
    title: 'COVID-19 Vaccination',
    description: 'Scheduled for Nov 15, 2023 at Central Hospital',
    category: 'appointment',
    link: '/appointments',
    date: '2023-11-15T10:30:00',
    highlight: 'covid'
  },
  {
    id: 'app-2',
    title: 'Flu Shot Appointment',
    description: 'Scheduled for Dec 3, 2023 at Neighborhood Clinic',
    category: 'appointment',
    link: '/appointments',
    date: '2023-12-03T14:00:00',
    highlight: 'flu'
  },
  
  // Locations
  {
    id: 'loc-1',
    title: 'Central Hospital Testing Center',
    description: 'PCR testing available daily 8AM-5PM',
    category: 'location',
    link: '/map',
    highlight: 'testing'
  },
  {
    id: 'loc-2',
    title: 'Community Vaccination Site',
    description: 'Walk-ins welcome for COVID-19 and flu vaccines',
    category: 'location',
    link: '/map',
    highlight: 'vaccination'
  },
  {
    id: 'loc-3',
    title: 'Downtown Medical Center',
    description: 'COVID-19 treatment and testing center',
    category: 'location',
    link: '/map',
    highlight: 'covid'
  },
  
  // Resources
  {
    id: 'res-1',
    title: 'COVID-19 Prevention Guidelines',
    description: 'Official guidelines on preventing the spread of COVID-19',
    category: 'resource',
    link: '/resources',
    highlight: 'prevention'
  },
  {
    id: 'res-2',
    title: 'Pandemic Mental Health Resources',
    description: 'Support for maintaining mental wellbeing during pandemics',
    category: 'resource',
    link: '/resources',
    highlight: 'mental health'
  },
  {
    id: 'res-3',
    title: 'Vaccine Information Sheet',
    description: 'Detailed information about available vaccines and their efficacy',
    category: 'resource',
    link: '/resources',
    highlight: 'vaccine'
  },
  
  // Health
  {
    id: 'health-1',
    title: 'Symptom Checker',
    description: 'Check your symptoms against known pandemic illnesses',
    category: 'health',
    link: '/health',
    highlight: 'symptoms'
  },
  {
    id: 'health-2',
    title: 'Vaccination Status',
    description: 'Your COVID-19 vaccination record and status',
    category: 'health',
    link: '/health',
    highlight: 'vaccination'
  },
  
  // Contacts
  {
    id: 'contact-1',
    title: 'Dr. Sarah Johnson',
    description: 'Primary care physician, Central Hospital',
    category: 'contact',
    link: '/appointments',
    highlight: 'doctor'
  },
  {
    id: 'contact-2',
    title: 'Health Department Hotline',
    description: 'For reporting symptoms and emergencies',
    category: 'contact',
    link: '/resources',
    highlight: 'emergency'
  }
];

const CategoryIcon: React.FC<{ category: SearchResult['category'] }> = ({ category }) => {
  switch (category) {
    case 'appointment':
      return <Calendar className="h-5 w-5 text-blue-500" />;
    case 'location':
      return <Map className="h-5 w-5 text-green-500" />;
    case 'resource':
      return <FileText className="h-5 w-5 text-amber-500" />;
    case 'contact':
      return <User className="h-5 w-5 text-purple-500" />;
    case 'health':
      return <Activity className="h-5 w-5 text-red-500" />;
    default:
      return <SearchIcon className="h-5 w-5 text-gray-500" />;
  }
};

const RecentSearches = [
  'COVID-19 symptoms', 
  'vaccine near me', 
  'pandemic guidelines',
  'testing centers',
  'flu prevention'
];

const QuickAccess = [
  { title: 'My Appointments', icon: Calendar, link: '/appointments' },
  { title: 'Nearby Testing', icon: Map, link: '/map' },
  { title: 'Health Status', icon: Activity, link: '/health' },
  { title: 'Prevention Guide', icon: Book, link: '/resources' },
  { title: 'Support Groups', icon: Users, link: '/resources' },
  { title: 'Medication Info', icon: Pill, link: '/resources' }
];

const highlightText = (text: string, highlight?: string) => {
  if (!highlight) return text;
  
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === highlight?.toLowerCase() 
      ? <span key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</span> 
      : part
  );
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  const filteredResults = searchData.filter(result => {
    // Filter by search term
    const matchesSearch = !searchQuery || 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category  
    const matchesCategory = activeTab === 'all' || result.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Layout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Search</h1>
          <p className="text-muted-foreground">
            Find what you need across the PandemicNet platform
          </p>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for appointments, locations, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {!searchQuery ? (
          <>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {QuickAccess.map((item, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                    onClick={() => navigate(item.link)}
                  >
                    <item.icon className="h-6 w-6" />
                    <span>{item.title}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Recent Searches</h2>
              <Command className="rounded-lg border shadow-md">
                <CommandList>
                  <CommandGroup heading="History">
                    {RecentSearches.map((search, index) => (
                      <CommandItem 
                        key={index}
                        onSelect={() => setSearchQuery(search)}
                        className="cursor-pointer"
                      >
                        <SearchIcon className="mr-2 h-4 w-4" />
                        <span>{search}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </>
        ) : (
          <>
            <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="appointment">Appointments</TabsTrigger>
                <TabsTrigger value="location">Locations</TabsTrigger>
                <TabsTrigger value="resource">Resources</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="contact">Contacts</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-4">
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <Card key={result.id} className="hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-start gap-4 pb-2">
                      <div className="mt-1">
                        <CategoryIcon category={result.category} />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {highlightText(result.title, searchQuery)}
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                          {result.date && ` • ${formatDate(result.date)}`}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">
                        {highlightText(result.description, searchQuery)}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-auto gap-1"
                        asChild
                      >
                        <a href={result.link}>
                          <span>View details</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No results found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search term or category filter
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Search;
