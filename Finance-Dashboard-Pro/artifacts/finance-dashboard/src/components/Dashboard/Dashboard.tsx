import { useAuthStore } from '../../store/useAuthStore';
import { useTransactions } from '../../store/useFinanceStore';
import StatCard from '../UI/StatCard';
import BalanceChart from './BalanceChart';
import PieBreakdown from './PieBreakdown';
import RecentTransactions from './RecentTransactions';
import AdminQuickActions from './AdminQuickActions';
import ViewerBanner from './ViewerBanner';
import { TrendingUp, Wallet, TrendingDown, ShieldCheck, Eye } from 'lucide-react';
import { calcStats, getMonthlyComparison } from '../../utils/calculations';

export default function Dashboard() {
  const { session } = useAuthStore();
  const { transactions } = useTransactions();
  const stats = calcStats(transactions);
  const { expenseChange, incomeChange } = getMonthlyComparison(transactions);
  const isAdmin = session?.role === 'admin';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up opacity-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, <span className="gradient-text">{session?.name?.split(' ')[0] ?? 'there'}</span> 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin
              ? 'Full access — manage and track your complete financial picture.'
              : 'Viewer access — explore your financial overview in read-only mode.'}
          </p>
        </div>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 ${isAdmin ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
          {isAdmin ? <ShieldCheck size={15} /> : <Eye size={15} />}
          {isAdmin ? 'Admin Mode' : 'Viewer Mode'}
        </div>
      </div>

      {/* Viewer read-only banner */}
      {!isAdmin && <ViewerBanner />}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Balance" amount={stats.balance} icon={<Wallet size={22} />} variant="balance" delay="delay-100" />
        <StatCard title="Total Income" amount={stats.income} icon={<TrendingUp size={22} />} variant="income" change={incomeChange} delay="delay-200" />
        <StatCard title="Total Expenses" amount={stats.expenses} icon={<TrendingDown size={22} />} variant="expense" change={expenseChange} delay="delay-300" />
      </div>

      {/* Admin quick actions */}
      {isAdmin && <AdminQuickActions />}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><BalanceChart /></div>
        <div><PieBreakdown /></div>
      </div>

      {/* Recent transactions */}
      <RecentTransactions />
    </div>
  );
}
