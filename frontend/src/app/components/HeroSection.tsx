import { useState } from 'react';
import { Search, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeroSectionProps {
  onAnalyze: (username: string) => void;
  isAnalyzing: boolean;
}

export function HeroSection({ onAnalyze, isAnalyzing }: HeroSectionProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onAnalyze(username.trim());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg dark:shadow-xl border border-gray-100 dark:border-gray-800 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-gray-900 dark:text-white mb-3">
              Analyze Competitor Audience
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter an Instagram competitor username to discover potential customers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <LinkIcon className="h-5 w-5" />
              </div>
              <Input
                type="text"
                placeholder="@competitor_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-12 h-14 rounded-2xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isAnalyzing || !username.trim()}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Analyze
                </>
              )}
            </Button>

            <p className="text-center text-gray-500 dark:text-gray-500">
              ex: @nike, @starbucks
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
