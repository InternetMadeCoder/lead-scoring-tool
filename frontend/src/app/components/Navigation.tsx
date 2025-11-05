import { Moon, Sun, HelpCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

interface NavigationProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Navigation({ theme, onThemeToggle }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white">AL</span>
            </div>
            <span className="text-gray-900 dark:text-white">Audience Lead Scorer</span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <HelpCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Button>

            <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700 transition-all">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}
