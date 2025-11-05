"use client";

import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { StatsCards } from './components/StatsCards';
import { LeadTable, Lead } from './components/LeadTable';
import { SentimentChart } from './components/SentimentChart';
import { LeadDetailDrawer } from './components/LeadDetailDrawer';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

// Mock data generator
const generateMockLeads = (): Lead[] => {
  const names = [
    'Sarah Johnson', 'Michael Chen', 'Emma Williams', 'James Rodriguez',
    'Olivia Brown', 'William Taylor', 'Sophia Martinez', 'Alexander Davis',
    'Isabella Garcia', 'Daniel Anderson', 'Mia Thompson', 'Matthew White',
    'Charlotte Harris', 'David Martin', 'Amelia Lopez', 'Joseph Lee',
    'Harper Wilson', 'Christopher Moore', 'Evelyn Jackson', 'Andrew Thomas',
    'Abigail Taylor', 'Joshua Brown', 'Emily Jones', 'Ryan Williams',
    'Madison Smith', 'Nicholas Davis', 'Ava Miller', 'Brandon Anderson',
    'Chloe Martinez', 'Tyler Rodriguez', 'Ella Wilson', 'Kevin Moore',
    'Grace Garcia', 'Jason Lee', 'Lily Thompson', 'Justin White',
    'Zoe Harris', 'Benjamin Martin', 'Natalie Lopez', 'Samuel Jackson',
  ];

  const usernames = [
    'sarahj', 'mchen', 'emmaw', 'jrodriguez', 'oliviab', 'willtaylor',
    'sophiamtz', 'alexdavis', 'isabellag', 'dananderson', 'miathompson',
    'mattwhite', 'charlotte_h', 'davidm', 'amelialop', 'joelee',
    'harperwilson', 'chrismoore', 'evelyn_j', 'andrewt', 'abbyt',
    'joshbrown', 'emilyjones', 'ryanw', 'madisonsmith', 'nickdavis',
    'avamiller', 'brandonand', 'chloem', 'tyler_r', 'ellawilson',
    'kevinmoore', 'graceg', 'jasonlee', 'lilyt', 'justinwhite',
    'zoeharris', 'benmartin', 'nataliel', 'samjackson',
  ];

  const bios = [
    'Digital marketing enthusiast | Coffee lover ☕',
    'Fitness coach helping people transform their lives 💪',
    'Travel blogger exploring the world 🌍',
    'Tech entrepreneur | Innovation advocate',
    'Fashion designer | Sustainable fashion advocate',
    'Food blogger | Recipe creator 🍳',
    'Professional photographer | Storyteller 📷',
    'Yoga instructor | Wellness coach 🧘',
    'Music producer | Beat maker 🎵',
    'Real estate investor | Property expert 🏠',
    'Content creator | Video editor',
    'Software engineer | Open source contributor',
    'Graphic designer | Brand strategist',
    'Life coach | Motivational speaker',
    'Pet lover | Dog trainer 🐕',
    'Beauty influencer | Makeup artist',
    'Sports enthusiast | Marathon runner',
    'Book lover | Literary critic 📚',
    'Plant parent | Gardening tips 🌱',
    'Chef | Culinary innovator',
    'Crypto investor | Blockchain enthusiast',
    'Artist | Digital illustration',
    'Personal trainer | Nutrition expert',
    'Podcaster | Interviewer',
    'Freelance writer | Journalist',
    'Video game streamer | Esports fan 🎮',
    'Interior designer | Home decor',
    'Financial advisor | Investment tips',
    'Environmental activist | Sustainability',
    'Dance instructor | Choreographer',
    'Mental health advocate | Therapist',
    'Car enthusiast | Auto reviewer 🚗',
    'DIY creator | Craft lover',
    'Comedy writer | Stand-up comedian',
    'Marketing consultant | Growth hacker',
    'Musician | Singer-songwriter 🎸',
    'Vegan chef | Plant-based recipes',
    'Photographer | Nature lover',
    'Business coach | Entrepreneur',
    'Adventure seeker | Outdoor enthusiast',
  ];

  return names.map((name, index) => ({
    rank: index + 1,
    username: usernames[index],
    name,
    followers: Math.floor(Math.random() * 100000) + 5000,
    sentimentScore: Math.floor(Math.random() * 40) + 60,
    interestScore: Math.floor(Math.random() * 40) + 50,
    leadScore: Math.floor(Math.random() * 30) + 70,
    bio: bios[index],
  })).sort((a, b) => b.leadScore - a.leadScore)
    .map((lead, index) => ({ ...lead, rank: index + 1 }));
};

const sentimentData = [
  { name: 'Positive', value: 45 },
  { name: 'Neutral', value: 30 },
  { name: 'Interested', value: 20 },
  { name: 'Negative', value: 5 },
];

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleAnalyze = (username: string) => {
    setIsAnalyzing(true);
    toast.loading(`Analyzing @${username}...`);
    
    // Simulate API call
    setTimeout(() => {
      const mockLeads = generateMockLeads();
      setLeads(mockLeads);
      setHasAnalyzed(true);
      setIsAnalyzing(false);
      toast.dismiss();
      toast.success(`Successfully analyzed @${username}!`);
    }, 2000);
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedLead(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-200">
      <Navigation theme={theme} onThemeToggle={handleThemeToggle} />
      
      <main className="flex-1">
        <HeroSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        
        {hasAnalyzed && (
          <>
            <StatsCards
              totalUsers={leads.length}
              highPriorityLeads={leads.filter(l => l.leadScore >= 80).length}
              avgEngagement={7.8}
              sentimentPositive={72}
            />
            
            <LeadTable leads={leads} onLeadClick={handleLeadClick} />
            
            <SentimentChart data={sentimentData} />
          </>
        )}
      </main>
      
      <Footer />
      
      <LeadDetailDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
      />
      
      <Toaster theme={theme} />
    </div>
  );
}
