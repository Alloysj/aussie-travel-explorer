import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

type Page = 'home' | 'listings' | 'destination' | 'account' | 'saved';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: SupabaseUser | null;
}

export function Navigation({ currentPage, onNavigate, user }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'listings' as Page, label: 'Destinations' },
    ...(user ? [{ id: 'saved' as Page, label: 'Saved' }] : []),
  ];

  const getUserDisplayName = () => {
    return user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">TQ</span>
              </div>
              <span className="font-bold text-xl hidden sm:block">TravelQuest</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md transition-colors cursor-pointer flex items-center space-x-1 ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.id === 'saved' && <Heart className="w-4 h-4" />}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Account */}
          <div className="hidden md:block">
            {user ? (
              <Button
                variant="ghost"
                onClick={() => onNavigate('account')}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">
                    {getUserDisplayName().substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{getUserDisplayName()}</span>
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => onNavigate('account')}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md w-full text-left transition-colors cursor-pointer flex items-center space-x-2 ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.id === 'saved' && <Heart className="w-4 h-4" />}
                  <span>{item.label}</span>
                </button>
              ))}
              
              {user ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    onNavigate('account');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start mt-2 cursor-pointer"
                >
                  <Avatar className="w-4 h-4 mr-2">
                    <AvatarFallback className="text-xs">
                      {getUserDisplayName().substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {getUserDisplayName()}
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    onNavigate('account');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start mt-2 cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}