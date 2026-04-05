import { useState } from 'react';
import { Plus, Download, TrendingUp, FileText } from 'lucide-react';
import { useFinanceUIStore } from '../../store/useFinanceStore';
import TransactionModal from '../Transactions/TransactionModal';

export default function AdminQuickActions() {
  const { setCurrentPage } = useFinanceUIStore();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="animate-fade-in-up opacity-0 delay-200">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Plus, label: 'Add Transaction', color: 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-orange-900/30', action: () => setModalOpen(true) },
            { icon: FileText, label: 'View Transactions', color: 'bg-card border border-border text-foreground hover:bg-accent', action: () => setCurrentPage('transactions') },
            { icon: TrendingUp, label: 'View Insights', color: 'bg-card border border-border text-foreground hover:bg-accent', action: () => setCurrentPage('insights') },
            { icon: Download, label: 'Export CSV', color: 'bg-card border border-border text-foreground hover:bg-accent', action: () => setCurrentPage('transactions') },
          ].map(({ icon: Icon, label, color, action }, i) => (
            <button
              key={i}
              onClick={action}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${color}`}
            >
              <Icon size={16} className="flex-shrink-0" />
              <span className="text-left leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>
      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} editTransaction={null} />
    </>
  );
}
