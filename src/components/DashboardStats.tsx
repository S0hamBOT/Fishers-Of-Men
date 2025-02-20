import React from "react";
import { Trophy, Target, Clock } from "lucide-react";
import { problems } from "../components/practice/ProblemList";

interface StatsCardProps {
  title: string;
  value: string;
  total: number;
  icon: React.ReactNode;
}

function StatsCard({ title, value, total, icon }: StatsCardProps) {
  const percentage = Math.round((parseInt(value) / total) * 100);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="rounded-full bg-indigo-100 p-3">{icon}</div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">
              {value}{" "}
              <span className="text-base font-normal text-gray-500">
                / {total}
              </span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-600">
            {percentage}%
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface TopicProgressProps {
  progress: Record<string, number>;
}

export function DashboardStats({ progress }: TopicProgressProps) {
  // Calculate total problems per category
  const categoryTotals: Record<string, number> = problems.reduce(
    (acc, problem) => {
      const category = problem.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Get completed problems per category from progress prop
  const completedByCategory = Object.entries(categoryTotals).map(
    ([category, total]) => ({
      category,
      completed: progress[category] || 0,
      total,
    })
  );

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {completedByCategory.map(({ category, completed, total }) => (
        <StatsCard
          key={category}
          title={category}
          value={completed.toString()}
          total={total}
          icon={<Target className="h-6 w-6 text-indigo-600" />}
        />
      ))}
    </div>
  );
}
