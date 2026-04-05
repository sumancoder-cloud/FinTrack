import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTransactions } from '../../store/useFinanceStore';
import { CATEGORIES, Transaction, TransactionType, Category } from '../../data/mockData';

interface Props {
  open: boolean;
  onClose: () => void;
  editTransaction: Transaction | null;
}

export default function TransactionModal({ open, onClose, editTransaction }: Props) {
  const { addTransaction, updateTransaction } = useTransactions();
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food' as Category,
    type: 'expense' as TransactionType,
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (editTransaction) {
      setForm({ description: editTransaction.description, amount: editTransaction.amount.toString(), category: editTransaction.category, type: editTransaction.type, date: editTransaction.date });
    } else {
      setForm({ description: '', amount: '', category: 'Food', type: 'expense', date: new Date().toISOString().split('T')[0] });
    }
  }, [editTransaction, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!form.description || isNaN(amount) || amount <= 0) return;
    if (editTransaction) {
      updateTransaction(editTransaction.id, { ...form, amount });
    } else {
      addTransaction({ ...form, amount });
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="glass-card relative w-full max-w-md rounded-2xl p-6 shadow-2xl animate-fade-in-up opacity-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {editTransaction ? '✏️ Edit Transaction' : '+ New Transaction'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors">
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex rounded-xl overflow-hidden border border-border">
            {(['expense', 'income'] as TransactionType[]).map(t => (
              <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t }))}
                className={`flex-1 py-2.5 text-sm font-semibold capitalize transition-all ${form.type === t ? (t === 'income' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-card text-muted-foreground hover:bg-accent'}`}>
                {t === 'income' ? '↑ Income' : '↓ Expense'}
              </button>
            ))}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
            <input required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. Grocery Shopping"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Amount (₹)</label>
              <input required type="number" min="1" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="0"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Date</label>
              <input required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full btn-primary text-white font-semibold py-3 rounded-xl text-sm">
            {editTransaction ? 'Update Transaction' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
}
