import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

const colorMap = {
  primary: 'bg-blue-100 text-blue-600',
  success: 'bg-green-100 text-green-600',
  warning: 'bg-yellow-100 text-yellow-600',
  danger: 'bg-red-100 text-red-600',
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'primary' }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-semibold">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        {icon && <div className={`p-3 rounded-lg ${colorMap[color]}`}>{icon}</div>}
      </div>
    </div>
  );
};
