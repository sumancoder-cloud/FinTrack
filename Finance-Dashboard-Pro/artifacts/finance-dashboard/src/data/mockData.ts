export type TransactionType = 'income' | 'expense';
export type Category = 'Salary' | 'Food' | 'Rent' | 'Travel' | 'Shopping' | 'Healthcare' | 'Entertainment' | 'Utilities' | 'Freelance' | 'Investments';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export const CATEGORIES: Category[] = [
  'Salary', 'Food', 'Rent', 'Travel', 'Shopping',
  'Healthcare', 'Entertainment', 'Utilities', 'Freelance', 'Investments'
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Salary: '#22c55e',
  Food: '#f97316',
  Rent: '#ef4444',
  Travel: '#3b82f6',
  Shopping: '#a855f7',
  Healthcare: '#ec4899',
  Entertainment: '#eab308',
  Utilities: '#06b6d4',
  Freelance: '#10b981',
  Investments: '#8b5cf6',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Salary: '💼',
  Food: '🍔',
  Rent: '🏠',
  Travel: '✈️',
  Shopping: '🛍️',
  Healthcare: '💊',
  Entertainment: '🎬',
  Utilities: '⚡',
  Freelance: '💻',
  Investments: '📈',
};

const today = new Date();
const getDate = (daysAgo: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const initialTransactions: Transaction[] = [
  { id: '1', date: getDate(0), description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
  { id: '2', date: getDate(1), description: 'Grocery Shopping', amount: 3200, category: 'Food', type: 'expense' },
  { id: '3', date: getDate(2), description: 'Apartment Rent', amount: 18000, category: 'Rent', type: 'expense' },
  { id: '4', date: getDate(3), description: 'Flight Tickets', amount: 12500, category: 'Travel', type: 'expense' },
  { id: '5', date: getDate(4), description: 'Freelance Project', amount: 25000, category: 'Freelance', type: 'income' },
  { id: '6', date: getDate(5), description: 'Amazon Shopping', amount: 5600, category: 'Shopping', type: 'expense' },
  { id: '7', date: getDate(6), description: 'Netflix Subscription', amount: 649, category: 'Entertainment', type: 'expense' },
  { id: '8', date: getDate(7), description: 'Electricity Bill', amount: 2100, category: 'Utilities', type: 'expense' },
  { id: '9', date: getDate(8), description: 'Stock Dividends', amount: 8500, category: 'Investments', type: 'income' },
  { id: '10', date: getDate(9), description: 'Restaurant Dinner', amount: 1800, category: 'Food', type: 'expense' },
  { id: '11', date: getDate(10), description: 'Doctor Visit', amount: 2500, category: 'Healthcare', type: 'expense' },
  { id: '12', date: getDate(12), description: 'Freelance Design', amount: 15000, category: 'Freelance', type: 'income' },
  { id: '13', date: getDate(14), description: 'Uber Rides', amount: 1200, category: 'Travel', type: 'expense' },
  { id: '14', date: getDate(15), description: 'Clothes Shopping', amount: 4200, category: 'Shopping', type: 'expense' },
  { id: '15', date: getDate(16), description: 'Gym Membership', amount: 1500, category: 'Healthcare', type: 'expense' },
  { id: '16', date: getDate(18), description: 'Bonus', amount: 20000, category: 'Salary', type: 'income' },
  { id: '17', date: getDate(20), description: 'Water & Gas Bill', amount: 1800, category: 'Utilities', type: 'expense' },
  { id: '18', date: getDate(21), description: 'Movie Tickets', amount: 800, category: 'Entertainment', type: 'expense' },
  { id: '19', date: getDate(22), description: 'Investment Return', amount: 12000, category: 'Investments', type: 'income' },
  { id: '20', date: getDate(24), description: 'Food Delivery', amount: 950, category: 'Food', type: 'expense' },
  // Last month
  { id: '21', date: getDate(32), description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
  { id: '22', date: getDate(33), description: 'Groceries', amount: 2800, category: 'Food', type: 'expense' },
  { id: '23', date: getDate(34), description: 'Rent', amount: 18000, category: 'Rent', type: 'expense' },
  { id: '24', date: getDate(35), description: 'Holiday Trip', amount: 22000, category: 'Travel', type: 'expense' },
  { id: '25', date: getDate(36), description: 'Freelance Income', amount: 18000, category: 'Freelance', type: 'income' },
  { id: '26', date: getDate(38), description: 'Electronics', amount: 8500, category: 'Shopping', type: 'expense' },
  { id: '27', date: getDate(40), description: 'Spotify & OTT', amount: 1200, category: 'Entertainment', type: 'expense' },
  { id: '28', date: getDate(42), description: 'Electricity', amount: 1900, category: 'Utilities', type: 'expense' },
  { id: '29', date: getDate(44), description: 'Mutual Funds Return', amount: 9500, category: 'Investments', type: 'income' },
  { id: '30', date: getDate(46), description: 'Pharmacy', amount: 1400, category: 'Healthcare', type: 'expense' },
];

export const balanceTrend = [
  { month: 'Oct', balance: 42000 },
  { month: 'Nov', balance: 55000 },
  { month: 'Dec', balance: 38000 },
  { month: 'Jan', balance: 68000 },
  { month: 'Feb', balance: 72000 },
  { month: 'Mar', balance: 61000 },
  { month: 'Apr', balance: 89000 },
];
