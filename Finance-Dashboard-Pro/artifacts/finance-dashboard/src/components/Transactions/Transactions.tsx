import { useState } from 'react';
import { useFinanceUIStore, useTransactions } from '../../store/useFinanceStore';
import { useAuthStore } from '../../store/useAuthStore';
import { formatCurrency, formatDate } from '../../utils/calculations';
import { CATEGORY_COLORS, Transaction } from '../../data/mockData';
import CategoryIcon from '../UI/CategoryIcon';
import TransactionModal from './TransactionModal';
import { Search, ArrowUpDown, Trash2, Edit3, Plus, Download, Eye } from 'lucide-react';

export default function Transactions() {
  const { filterType, setFilterType, searchQuery, setSearchQuery, sortField, setSortField, sortOrder, setSortOrder } = useFinanceUIStore();
  const { transactions, deleteTransaction } = useTransactions();
  const { session } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);

  const isAdmin = session?.role === 'admin';

  // Filter and sort
  let filtered = transactions;
  if (filterType !== 'all') filtered = filtered.filter(t => t.type === filterType);
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(t =>
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.amount.toString().includes(q)
    );
  }
  filtered = [...filtered].sort((a, b) => {
    if (sortField === 'date') {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortOrder === 'asc' ? diff : -diff;
    }
    return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
  });

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortField === field) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortOrder('desc'); }
  };

  const exportCSV = () => {
    const headers = 'Date,Description,Category,Type,Amount\n';
    const rows = filtered.map(t => `${t.date},${t.description},${t.category},${t.type},${t.amount}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'transactions.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const openAdd = () => { setEditTx(null); setModalOpen(true); };
  const openEdit = (t: Transaction) => { setEditTx(t); setModalOpen(true); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 animate-fade-in-up opacity-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
            {!isAdmin && (
              <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Eye size={11} /> Read Only
              </span>
            )}
          </div>
          <p className="text-muted-foreground mt-1">{filtered.length} records found</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-accent transition-all">
            <Download size={15} /> Export CSV
          </button>
          {isAdmin && (
            <button onClick={openAdd} className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-semibold">
              <Plus size={15} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Viewer notice */}
      {!isAdmin && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-sm mb-5 animate-fade-in-up opacity-0 delay-100">
          <Eye size={15} className="flex-shrink-0" />
          <span><strong>Viewer mode:</strong> You can search, filter, and export transactions, but cannot add, edit, or delete them.</span>
        </div>
      )}

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4 mb-6 animate-fade-in-up opacity-0 delay-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="search" placeholder="Search by description, category, or amount..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm" />
          </div>
          <div className="flex rounded-xl overflow-hidden border border-border">
            {(['all', 'income', 'expense'] as const).map(f => (
              <button key={f} onClick={() => setFilterType(f)}
                className={`px-4 py-2.5 text-sm font-medium transition-all ${filterType === f ? 'bg-orange-500 text-white' : 'bg-card text-muted-foreground hover:bg-accent'}`}>
                {f === 'all' ? 'All' : f === 'income' ? '↑ Income' : '↓ Expense'}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => toggleSort('date')} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${sortField === 'date' ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'border-border bg-card text-muted-foreground hover:bg-accent'}`}>
              <ArrowUpDown size={13} /> Date
            </button>
            <button onClick={() => toggleSort('amount')} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${sortField === 'amount' ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'border-border bg-card text-muted-foreground hover:bg-accent'}`}>
              <ArrowUpDown size={13} /> Amount
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden animate-fade-in-up opacity-0 delay-300">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-5xl mb-4">{searchQuery || filterType !== 'all' ? '🔍' : '💳'}</div>
            <p className="text-lg font-medium">{searchQuery || filterType !== 'all' ? 'No transactions found' : 'No transactions yet'}</p>
            <p className="text-sm mt-1">{searchQuery || filterType !== 'all' ? 'Try adjusting your search or filters' : isAdmin ? 'Click "Add Transaction" to get started' : 'Your transactions will appear here'}</p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    {['Transaction', 'Category', 'Date', 'Type', 'Amount', ...(isAdmin ? ['Actions'] : [])].map((h, i) => (
                      <th key={i} className={`px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${i >= 4 ? 'text-right' : 'text-left'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t, i) => (
                    <tr key={t.id} className={`border-b border-border/50 hover:bg-accent/30 transition-colors ${i % 2 === 0 ? '' : 'bg-muted/10'}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${CATEGORY_COLORS[t.category]}18` }}>
                            <CategoryIcon category={t.category} size={16} color={CATEGORY_COLORS[t.category]} />
                          </div>
                          <span className="font-medium text-foreground text-sm">{t.description}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${CATEGORY_COLORS[t.category]}15`, color: CATEGORY_COLORS[t.category] }}>{t.category}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{formatDate(t.date)}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${t.type === 'income' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>{t.type}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className={`font-bold text-sm ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                          {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                        </span>
                      </td>
                      {isAdmin && (
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => openEdit(t)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-all"><Edit3 size={14} /></button>
                            <button onClick={() => deleteTransaction(t.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile */}
            <div className="md:hidden divide-y divide-border/50">
              {filtered.map(t => (
                <div key={t.id} className="px-4 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${CATEGORY_COLORS[t.category]}18` }}><CategoryIcon category={t.category} size={18} color={CATEGORY_COLORS[t.category]} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{t.description}</p>
                    <p className="text-xs text-muted-foreground">{t.category} · {formatDate(t.date)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`font-bold text-sm ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}</p>
                    {isAdmin && (
                      <div className="flex gap-1 mt-1 justify-end">
                        <button onClick={() => openEdit(t)} className="text-blue-500 hover:text-blue-700 p-1"><Edit3 size={12} /></button>
                        <button onClick={() => deleteTransaction(t.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={12} /></button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} editTransaction={editTx} />
    </div>
  );
}
