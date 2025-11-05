import { X, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Lead } from './LeadTable';
import { Avatar, AvatarFallback } from './ui/avatar';

interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadDetailDrawer({ lead, isOpen, onClose }: LeadDetailDrawerProps) {
  if (!lead) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-gray-900 dark:text-white">
              Lead Details
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Profile Section */}
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                  {lead.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-gray-900 dark:text-white mb-1">
                  {lead.name}
                </h4>
                <p className="text-blue-600 dark:text-blue-400">
                  @{lead.username}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
              <p className="text-gray-600 dark:text-gray-400">
                {lead.bio}
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">
                  Rank
                </span>
                <span className="text-gray-900 dark:text-white">
                  #{lead.rank}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">
                  Followers
                </span>
                <span className="text-gray-900 dark:text-white">
                  {lead.followers.toLocaleString()}
                </span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    Lead Score
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {lead.leadScore}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{ width: `${lead.leadScore}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    Sentiment Score
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {lead.sentimentScore}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${lead.sentimentScore}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    Interest Score
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {lead.interestScore}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${lead.interestScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              onClick={() =>
                window.open(`https://instagram.com/${lead.username}`, '_blank')
              }
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Open on Instagram
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
