
import React, { useState } from 'react';
import { Book, FileText, FileDown, Link, Globe, HelpCircle, FileCheck, Phone, Video } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';

// Resource item interface
interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'link' | 'video' | 'infographic';
  category: 'prevention' | 'treatment' | 'information' | 'support';
  icon: React.ReactNode;
  link: string;
  date: string;
}

// Mock data for resources
const resourcesData: ResourceItem[] = [
  {
    id: '1',
    title: 'COVID-19 Prevention Guidelines',
    description: 'Official guidelines on how to prevent COVID-19 spread in your community.',
    type: 'document',
    category: 'prevention',
    icon: <FileText className="h-6 w-6" />,
    link: '#',
    date: '2023-09-15'
  },
  {
    id: '2',
    title: 'Pandemic Response Plan',
    description: 'Learn about the national response plan and what to expect during different pandemic phases.',
    type: 'document',
    category: 'information',
    icon: <FileCheck className="h-6 w-6" />,
    link: '#',
    date: '2023-08-22'
  },
  {
    id: '3',
    title: 'World Health Organization Updates',
    description: 'Direct link to WHO pandemic updates and global health information.',
    type: 'link',
    category: 'information',
    icon: <Globe className="h-6 w-6" />,
    link: 'https://www.who.int',
    date: '2023-10-01'
  },
  {
    id: '4',
    title: 'Mental Health During Pandemics',
    description: 'Resources to help maintain mental wellbeing during extended isolation periods.',
    type: 'document',
    category: 'support',
    icon: <HelpCircle className="h-6 w-6" />,
    link: '#',
    date: '2023-07-30'
  },
  {
    id: '5',
    title: 'Vaccine Information Sheet',
    description: 'Comprehensive information about available vaccines, efficacy, and side effects.',
    type: 'document',
    category: 'treatment',
    icon: <FileDown className="h-6 w-6" />,
    link: '#',
    date: '2023-09-28'
  },
  {
    id: '6',
    title: 'How Viruses Spread - Educational Video',
    description: 'Educational content explaining how viruses transmit between individuals.',
    type: 'video',
    category: 'information',
    icon: <Video className="h-6 w-6" />,
    link: '#',
    date: '2023-06-14'
  },
  {
    id: '7',
    title: 'Telehealth Services Directory',
    description: 'Find remote healthcare providers available in your region.',
    type: 'link',
    category: 'support',
    icon: <Phone className="h-6 w-6" />,
    link: '#',
    date: '2023-08-05'
  },
  {
    id: '8',
    title: 'Home Care Instructions',
    description: 'Guidelines for caring for someone with COVID-19 at home safely.',
    type: 'document',
    category: 'treatment',
    icon: <Book className="h-6 w-6" />,
    link: '#',
    date: '2023-09-10'
  }
];

const ResourceCard: React.FC<{ resource: ResourceItem }> = ({ resource }) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <div className="mt-1 bg-secondary p-2 rounded-full">
          {resource.icon}
        </div>
        <div>
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <CardDescription className="text-sm mt-1">{resource.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-xs text-muted-foreground">
          Last updated: {resource.date}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={() => window.open(resource.link, '_blank')}
        >
          {resource.type === 'document' ? (
            <FileDown className="h-4 w-4" />
          ) : resource.type === 'link' ? (
            <Link className="h-4 w-4" />
          ) : (
            <Video className="h-4 w-4" />
          )}
          {resource.type === 'document' ? 'Download' : resource.type === 'link' ? 'Visit' : 'Watch'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('all');

  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = currentCategory === 'all' || resource.category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Pandemic Resources</h1>
          <p className="text-muted-foreground">
            Access important information, guides, and support materials
          </p>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" onClick={() => setSearchTerm('')}>
            Clear
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setCurrentCategory}>
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
            <TabsTrigger value="treatment">Treatment</TabsTrigger>
            <TabsTrigger value="information">Information</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No resources found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;
