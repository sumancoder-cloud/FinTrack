import { useTransactions } from '../../store/useFinanceStore';
import { useFinanceUIStore } from '../../store/useFinanceStore';
import { formatCurrency, formatDate } from '../../utils/calculations';
import { CATEGORY_COLORS } from '../../data/mockData';
import CategoryIcon from '../UI/CategoryIcon';
import { ArrowRight } from 'lucide-react';

export default function RecentTransactions() {
  const { transactions } = useTransactions();
  const { setCurrentPage } = useFinanceUIStore();
  const recent = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in-up opacity-0 delay-600">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">Recent Transactions</h2>
          <p className="text-sm text-muted-foreground">Your latest activity</p>
        </div>
        <button onClick={() => setCurrentPage('transactions')} className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
          View all <ArrowRight size={14} />
        </button>
      </div>
      {recent.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-4xl mb-3">💳</div>
          <p className="font-medium">No transactions yet</p>
          <p className="text-sm mt-1">Add your first transaction to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recent.map(t => (
            <div key={t.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/50 transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${CATEGORY_COLORS[t.category]}20` }}>
                <CategoryIcon category={t.category} size={18} color={CATEGORY_COLORS[t.category]} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">{t.description}</p>
                <p className="text-xs text-muted-foreground">{t.category} · {formatDate(t.date)}</p>
              </div>
              <span className={`font-bold text-sm flex-shrink-0 ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
