import { ReactNode } from 'react';
import { formatCurrency } from '../../utils/calculations';

interface StatCardProps {
  title: string;
  amount: number;
  icon: ReactNode;
  variant: 'balance' | 'income' | 'expense';
  change?: number;
  delay?: string;
}

const variantMap = {
  balance: { card: 'stat-card-balance', icon: 'bg-yellow-400/20 text-yellow-600 dark:text-yellow-400', text: 'text-yellow-700 dark:text-yellow-300' },
  income: { card: 'stat-card-income', icon: 'bg-green-400/20 text-green-600 dark:text-green-400', text: 'text-green-700 dark:text-green-300' },
  expense: { card: 'stat-card-expense', icon: 'bg-red-400/20 text-red-600 dark:text-red-400', text: 'text-red-700 dark:text-red-300' },
};

export default function StatCard({ title, amount, icon, variant, change, delay = '' }: StatCardProps) {
  const v = variantMap[variant];
  return (
    <div className={`${v.card} rounded-2xl p-5 border card-hover glass-card animate-fade-in-up opacity-0 ${delay}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${v.icon} text-xl`}>
          {icon}
        </div>
        {change !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${change >= 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className={`text-2xl font-bold ${v.text}`}>{formatCurrency(amount)}</p>
    </div>
  );
}
