import { Users, TrendingUp, Activity, Smile } from 'lucide-react';

interface StatsCardsProps {
  totalUsers: number;
  highPriorityLeads: number;
  avgEngagement: number;
  sentimentPositive: number;
}

export function StatsCards({
  totalUsers,
  highPriorityLeads,
  avgEngagement,
  sentimentPositive,
}: StatsCardsProps) {
  const stats = [
    {
      label: 'Total Users Analyzed',
      value: totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'High-Priority Leads',
      value: highPriorityLeads.toLocaleString(),
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Avg. Engagement',
      value: `${avgEngagement.toFixed(1)}%`,
      icon: Activity,
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      label: 'Positive Sentiment',
      value: `${sentimentPositive}%`,
      icon: Smile,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-lg border border-gray-100 dark:border-gray-800 p-6 hover:shadow-lg dark:hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
