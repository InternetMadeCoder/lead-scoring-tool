import { useState, useMemo } from 'react';
import { ArrowUpDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export interface Lead {
  rank: number;
  username: string;
  name: string;
  followers: number;
  sentimentScore: number;
  interestScore: number;
  leadScore: number;
  bio: string;
}

interface LeadTableProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export function LeadTable({ leads, onLeadClick }: LeadTableProps) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<keyof Lead>('leadScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAndSortedLeads = useMemo(() => {
    let filtered = leads.filter(
      (lead) =>
        lead.username.toLowerCase().includes(search.toLowerCase()) ||
        lead.name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return filtered;
  }, [leads, search, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedLeads.length / itemsPerPage);
  const paginatedLeads = filteredAndSortedLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-gray-900 dark:text-white mb-4">
            Ranked Leads
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by username or name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-gray-200 dark:border-gray-800">
                <TableHead className="text-gray-600 dark:text-gray-400">
                  Rank
                </TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">
                  Username
                </TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">
                  Name
                </TableHead>
                <TableHead
                  className="text-gray-600 dark:text-gray-400 cursor-pointer"
                  onClick={() => handleSort('followers')}
                >
                  <div className="flex items-center gap-1">
                    Followers
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="text-gray-600 dark:text-gray-400 cursor-pointer"
                  onClick={() => handleSort('sentimentScore')}
                >
                  <div className="flex items-center gap-1">
                    Sentiment
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="text-gray-600 dark:text-gray-400 cursor-pointer"
                  onClick={() => handleSort('interestScore')}
                >
                  <div className="flex items-center gap-1">
                    Interest
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="text-gray-600 dark:text-gray-400 cursor-pointer"
                  onClick={() => handleSort('leadScore')}
                >
                  <div className="flex items-center gap-1">
                    Lead Score
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLeads.map((lead) => (
                <TooltipProvider key={lead.username}>
                  <TableRow
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-800"
                    onClick={() => onLeadClick(lead)}
                  >
                    <TableCell className="text-gray-900 dark:text-gray-100">
                      {lead.rank}
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-blue-600 dark:text-blue-400 hover:underline">
                            @{lead.username}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{lead.bio}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">
                      {lead.name}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {lead.followers.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[80px]">
                          <div
                            className={`h-full rounded-full ${getScoreColor(
                              lead.sentimentScore
                            )}`}
                            style={{ width: `${lead.sentimentScore}%` }}
                          />
                        </div>
                        <span className="text-gray-900 dark:text-gray-100 min-w-[2rem]">
                          {lead.sentimentScore}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[80px]">
                          <div
                            className={`h-full rounded-full ${getScoreColor(
                              lead.interestScore
                            )}`}
                            style={{ width: `${lead.interestScore}%` }}
                          />
                        </div>
                        <span className="text-gray-900 dark:text-gray-100 min-w-[2rem]">
                          {lead.interestScore}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[80px]">
                          <div
                            className={`h-full rounded-full ${getScoreColor(
                              lead.leadScore
                            )}`}
                            style={{ width: `${lead.leadScore}%` }}
                          />
                        </div>
                        <span className="text-gray-900 dark:text-gray-100 min-w-[2rem]">
                          {lead.leadScore}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TooltipProvider>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-800">
          {paginatedLeads.map((lead) => (
            <div
              key={lead.username}
              onClick={() => onLeadClick(lead)}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-gray-900 dark:text-white mb-1">
                    {lead.name}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400">
                    @{lead.username}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full">
                  #{lead.rank}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Lead Score
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${getScoreColor(
                          lead.leadScore
                        )}`}
                        style={{ width: `${lead.leadScore}%` }}
                      />
                    </div>
                    <span className="text-gray-900 dark:text-gray-100 min-w-[2rem]">
                      {lead.leadScore}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Followers
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {lead.followers.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
