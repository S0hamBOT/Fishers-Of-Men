import React from "react";
import { Trophy, Target, Clock } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

interface DashboardStatsProps {
  progress: Record<string, number>;
}

function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center">
        <div className="rounded-full bg-indigo-100 p-3">{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function DashboardStats({ progress }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Example StatsCard usage, assuming progress contains categories like "Python" */}
      {Object.entries(progress).map(([category, value]) => (
        <StatsCard
          key={category}
          title={category}
          value={value}
          icon={<Trophy className="h-6 w-6 text-indigo-600" />}
        />
      ))}
    </div>
  );
}
