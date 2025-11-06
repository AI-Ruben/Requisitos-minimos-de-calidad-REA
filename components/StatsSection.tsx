
import React from 'react';
import type { Category, CategoryStats } from '../types';

interface StatCardProps {
  title: string;
  checked: number;
  total: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, checked, total }) => {
  const percentage = total > 0 ? (checked / total) * 100 : 0;
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</h3>
      <div className="text-4xl font-bold text-[#1e3c72] mb-3">{checked}</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-[#2a5298] to-[#6080A3] h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-600 mt-2">{checked} / {total}</p>
    </div>
  );
};

interface StatsSectionProps {
  totalChecked: number;
  totalItems: number;
  categoryStats: CategoryStats;
  categories: Category[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ totalChecked, totalItems, categoryStats, categories }) => (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard title="Ítems Completados" checked={totalChecked} total={totalItems} />
    {categories.map(cat => (
      <StatCard
        key={cat.id}
        title={cat.name.split(':')[1].trim()}
        checked={categoryStats[cat.id]?.checked || 0}
        total={categoryStats[cat.id]?.total || 0}
      />
    ))}
  </section>
);
