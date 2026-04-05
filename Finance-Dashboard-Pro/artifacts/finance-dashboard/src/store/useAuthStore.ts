import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialTransactions } from '../data/mockData';

export type UserRole = 'admin' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
  transactions: typeof initialTransactions;
}

export interface Session {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthStore {
  users: User[];
  session: Session | null;

  signup: (name: string, email: string, password: string, role: UserRole) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  getCurrentUser: () => User | null;
  updateUserTransactions: (transactions: User['transactions']) => void;
}

// Seed default accounts
const seedUsers: User[] = [
  {
    id: 'admin-001',
    name: 'Suman Admin',
    email: 'admin@fintrack.com',
    password: 'Admin@123',
    role: 'admin',
    createdAt: new Date().toISOString(),
    transactions: initialTransactions,
  },
  {
    id: 'viewer-001',
    name: 'Suman Viewer',
    email: 'viewer@fintrack.com',
    password: 'Viewer@123',
    role: 'viewer',
    createdAt: new Date().toISOString(),
    transactions: initialTransactions.slice(0, 15),
  },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: seedUsers,
      session: null,

      signup: (name, email, password, role) => {
        const { users } = get();
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
          return { success: false, error: 'An account with this email already exists.' };
        }
        if (password.length < 6) {
          return { success: false, error: 'Password must be at least 6 characters.' };
        }
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          password,
          role,
          createdAt: new Date().toISOString(),
          transactions: [],
        };
        set(s => ({ users: [...s.users, newUser] }));
        return { success: true };
      },

      login: (email, password) => {
        const { users } = get();
        const user = users.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!user) {
          return { success: false, error: 'Invalid email or password. Please try again.' };
        }
        set({
          session: {
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
        return { success: true };
      },

      logout: () => set({ session: null }),

      getCurrentUser: () => {
        const { users, session } = get();
        if (!session) return null;
        return users.find(u => u.id === session.userId) ?? null;
      },

      updateUserTransactions: (transactions) => {
        const { session } = get();
        if (!session) return;
        set(s => ({
          users: s.users.map(u =>
            u.id === session.userId ? { ...u, transactions } : u
          ),
        }));
      },
    }),
    {
      name: 'fintrack-auth',
      partialize: (state) => ({ users: state.users, session: state.session }),
    }
  )
);
