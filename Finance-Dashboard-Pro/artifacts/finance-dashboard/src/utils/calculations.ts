import { Transaction, Category, CATEGORY_COLORS } from '../data/mockData';

export const calcStats = (transactions: Transaction[]) => {
  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses };
};

export const getThisMonthTransactions = (transactions: Transaction[]) => {
  const now = new Date();
  return transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
};

export const getLastMonthTransactions = (transactions: Transaction[]) => {
  const now = new Date();
  const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  return transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  });
};

export const getCategoryBreakdown = (transactions: Transaction[]) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const totals: Partial<Record<Category, number>> = {};
  for (const t of expenses) {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  }
  return Object.entries(totals)
    .map(([name, value]) => ({ name, value: value || 0, fill: CATEGORY_COLORS[name as Category] }))
    .sort((a, b) => b.value - a.value);
};

export const getHighestSpendingCategory = (transactions: Transaction[]) => {
  const breakdown = getCategoryBreakdown(transactions);
  return breakdown[0] || null;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const getMonthlyComparison = (transactions: Transaction[]) => {
  const thisMonth = calcStats(getThisMonthTransactions(transactions));
  const lastMonth = calcStats(getLastMonthTransactions(transactions));
  const expenseChange = lastMonth.expenses > 0
    ? ((thisMonth.expenses - lastMonth.expenses) / lastMonth.expenses) * 100
    : 0;
  const incomeChange = lastMonth.income > 0
    ? ((thisMonth.income - lastMonth.income) / lastMonth.income) * 100
    : 0;
  return { thisMonth, lastMonth, expenseChange, incomeChange };
};
