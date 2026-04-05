import { create } from 'zustand';
import { Transaction } from '../data/mockData';
import { useAuthStore } from './useAuthStore';

export type FilterType = 'all' | 'income' | 'expense';
export type SortField = 'date' | 'amount';
export type SortOrder = 'asc' | 'desc';

interface FinanceUIState {
  filterType: FilterType;
  searchQuery: string;
  sortField: SortField;
  sortOrder: SortOrder;
  darkMode: boolean;
  currentPage: 'landing' | 'login' | 'dashboard' | 'transactions' | 'insights';

  setFilterType: (f: FilterType) => void;
  setSearchQuery: (q: string) => void;
  setSortField: (f: SortField) => void;
  setSortOrder: (o: SortOrder) => void;
  toggleDarkMode: () => void;
  setCurrentPage: (p: FinanceUIState['currentPage']) => void;
}

export const useFinanceUIStore = create<FinanceUIState>((set) => ({
  filterType: 'all',
  searchQuery: '',
  sortField: 'date',
  sortOrder: 'desc',
  darkMode: false,
  currentPage: 'landing',

  setFilterType: (filterType) => set({ filterType }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortField: (sortField) => set({ sortField }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  toggleDarkMode: () => set(s => ({ darkMode: !s.darkMode })),
  setCurrentPage: (currentPage) => set({ currentPage }),
}));

// Hook that provides dynamic per-user transaction operations
export function useTransactions() {
  const { getCurrentUser, updateUserTransactions } = useAuthStore();
  const user = getCurrentUser();
  const transactions: Transaction[] = user?.transactions ?? [];

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    if (!user) return;
    const updated = [{ ...t, id: Date.now().toString() }, ...transactions];
    updateUserTransactions(updated);
  };

  const updateTransaction = (id: string, patch: Partial<Transaction>) => {
    if (!user) return;
    const updated = transactions.map(tx => tx.id === id ? { ...tx, ...patch } : tx);
    updateUserTransactions(updated);
  };

  const deleteTransaction = (id: string) => {
    if (!user) return;
    const updated = transactions.filter(tx => tx.id !== id);
    updateUserTransactions(updated);
  };

  return { transactions, addTransaction, updateTransaction, deleteTransaction };
}
