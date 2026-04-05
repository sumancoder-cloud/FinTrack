import { useFinanceUIStore } from '../../store/useFinanceStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Moon, Sun, LayoutDashboard, ArrowLeftRight, TrendingUp, LogOut, ChevronDown, ShieldCheck, Eye } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { darkMode, toggleDarkMode, currentPage, setCurrentPage } = useFinanceUIStore();
  const { session, logout } = useAuthStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
  ] as const;

  const initials = session?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? 'U';
  const isAdmin = session?.role === 'admin';

  return (
    <nav className="nav-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">F</div>
            <span className="font-bold text-lg hidden sm:block">
              <span className="gradient-text">Fin</span>
              <span className="text-foreground">Track</span>
            </span>
          </button>

          {/* Nav items */}
          <div className="flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <item.icon size={16} />
                <span className="hidden sm:block">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Dark mode */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(v => !v)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-border bg-card hover:bg-accent transition-all"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white ${isAdmin ? 'bg-orange-500' : 'bg-blue-500'}`}>
                  {initials}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-foreground leading-none">{session?.name?.split(' ')[0]}</p>
                  <div className={`flex items-center gap-0.5 text-[10px] font-medium leading-none mt-0.5 ${isAdmin ? 'text-orange-500' : 'text-blue-500'}`}>
                    {isAdmin ? <ShieldCheck size={10} /> : <Eye size={10} />}
                    <span>{isAdmin ? 'Admin' : 'Viewer'}</span>
                  </div>
                </div>
                <ChevronDown size={13} className="text-muted-foreground hidden sm:block" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 glass-card rounded-2xl p-2 z-50 shadow-xl border border-border">
                    <div className="px-3 py-2.5 border-b border-border mb-1">
                      <p className="font-semibold text-sm text-foreground">{session?.name}</p>
                      <p className="text-xs text-muted-foreground">{session?.email}</p>
                      <span className={`inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${isAdmin ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                        {isAdmin ? <ShieldCheck size={11} /> : <Eye size={11} />}
                        {isAdmin ? 'Admin' : 'Viewer'}
                      </span>
                    </div>
                    <button
                      onClick={() => { setUserMenuOpen(false); logout(); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all font-medium"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
