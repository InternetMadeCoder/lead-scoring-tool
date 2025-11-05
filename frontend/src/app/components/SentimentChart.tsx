import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SentimentChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export function SentimentChart({ data }: SentimentChartProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-xl border border-gray-100 dark:border-gray-800 p-6">
        <h2 className="text-gray-900 dark:text-white mb-6">
          Sentiment Distribution
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) =>
                  `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '8px 12px',
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: '20px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
