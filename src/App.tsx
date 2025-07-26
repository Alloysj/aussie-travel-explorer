import React, { useState, useEffect } from 'react';
import './styles/globals.css';
import { Home } from './components/Home';
import { TravelListings } from './components/TravelListings';
import { DestinationDetail } from './components/DestinationDetail';
import { UserAccount } from './components/UserAccount';
import { SavedDestinations } from './components/SavedDestinations';
import { Navigation } from './components/Navigation';
import { Toaster } from './components/ui/sonner';
import { supabase } from './utils/supabase/client';
import type { User } from '@supabase/supabase-js';


type Page = 'home' | 'listings' | 'destination' | 'account' | 'saved';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDestinationSelect = (destinationId: string) => {
    setSelectedDestination(destinationId);
    setCurrentPage('destination');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onDestinationSelect={handleDestinationSelect} onNavigate={setCurrentPage} />;
      case 'listings':
        return <TravelListings onDestinationSelect={handleDestinationSelect} />;
      case 'destination':
        return (
          <DestinationDetail 
            destinationId={selectedDestination} 
            onBack={() => setCurrentPage('listings')} 
            user={user}
          />
        );
      case 'account':
        return <UserAccount user={user} onNavigate={setCurrentPage} />;
      case 'saved':
        return <SavedDestinations user={user} onDestinationSelect={handleDestinationSelect} />;
      default:
        return <Home onDestinationSelect={handleDestinationSelect} onNavigate={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold">TQ</span>
          </div>
          <p className="text-muted-foreground">Loading TravelQuest...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        user={user}
      />
      <main className="pt-16">
        {renderPage()}
      </main>
      <Toaster />
    </div>
  );
}