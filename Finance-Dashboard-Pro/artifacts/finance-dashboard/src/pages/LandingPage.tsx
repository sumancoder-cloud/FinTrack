import { useFinanceUIStore } from '../store/useFinanceStore';
import { useAuthStore } from '../store/useAuthStore';
import {
  TrendingUp, Shield, Zap, PieChart, ChevronRight, BarChart2,
  Lock, Smartphone, Check, ArrowRight, LogOut, ShieldCheck, Eye, Moon, Sun
} from 'lucide-react';

const features = [
  { icon: BarChart2, title: 'Real-time Analytics', desc: 'Track your income, expenses, and net balance with beautiful, interactive charts updated instantly.', color: 'from-orange-400 to-orange-600' },
  { icon: PieChart, title: 'Spending Breakdown', desc: 'Visualize where your money goes with interactive pie charts by category.', color: 'from-amber-400 to-orange-500' },
  { icon: Shield, title: 'Role-Based Access', desc: 'Admin and Viewer roles ensure secure access. Admins can add and edit; Viewers can only read.', color: 'from-orange-500 to-red-500' },
  { icon: Zap, title: 'Smart Insights', desc: 'Get personalized insights comparing this month vs last month automatically.', color: 'from-yellow-400 to-orange-400' },
  { icon: Smartphone, title: 'Fully Responsive', desc: 'Works beautifully on mobile, tablet, and desktop. Your data, anywhere.', color: 'from-orange-400 to-amber-500' },
  { icon: Lock, title: 'Secure Auth', desc: 'localStorage-based authentication with clear Admin and Viewer roles.', color: 'from-red-400 to-orange-500' },
];

const stats = [
  { label: 'Transactions Tracked', value: '30+' },
  { label: 'Categories', value: '10' },
  { label: 'Chart Types', value: '3' },
  { label: 'Monthly Insights', value: '∞' },
];

export default function LandingPage() {
  const { setCurrentPage, toggleDarkMode, darkMode } = useFinanceUIStore();
  const { session, logout } = useAuthStore();
  const isAdmin = session?.role === 'admin';

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="nav-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">F</div>
            <span className="font-bold text-xl"><span className="gradient-text">Fin</span><span className="text-foreground">Track</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/20 transition-all">{darkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
            {session && (
              <div className="flex items-center gap-2">
                <span className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${isAdmin ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'}`}>
                  {isAdmin ? <ShieldCheck size={12} /> : <Eye size={12} />}
                  {isAdmin ? 'Admin' : 'Viewer'} · {session.name.split(' ')[0]}
                </span>
                <button onClick={() => setCurrentPage('dashboard')} className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5">
                  Dashboard <ChevronRight size={16} />
                </button>
                <button onClick={logout} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-500 transition-colors border border-border rounded-xl px-3 py-2">
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium mb-6 animate-fade-in-up opacity-0">
              <Zap size={14} /> Built for Frontend Developer Internship Assessment
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight animate-fade-in-up opacity-0 delay-100">
              Manage your money<br />
              <span className="gradient-text animate-float inline-block">like a pro</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up opacity-0 delay-200">
              A beautiful, feature-rich finance dashboard with real-time insights, secure authentication, role-based access control, and smart spending analytics.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0 delay-300">
              <button onClick={() => setCurrentPage('login')} className="btn-primary text-white font-bold px-8 py-4 rounded-2xl text-lg flex items-center justify-center gap-2 group">
                Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setCurrentPage('login')} className="bg-card border border-border text-foreground font-semibold px-8 py-4 rounded-2xl text-lg hover:bg-accent transition-all flex items-center justify-center gap-2">
                Sign In <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* Hero mockup */}
          <div className="mt-16 max-w-3xl mx-auto animate-fade-in-up opacity-0 delay-400">
            <div className="glass-card rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 h-7 bg-muted/60 rounded-lg ml-2" />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[{ label: 'Balance', val: '₹1,38,000', color: 'text-yellow-600' }, { label: 'Income', val: '₹2,58,500', color: 'text-green-600' }, { label: 'Expenses', val: '₹1,20,500', color: 'text-red-500' }].map((s, i) => (
                  <div key={i} className="bg-muted/50 rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className={`font-bold text-sm mt-1 ${s.color}`}>{s.val}</p>
                  </div>
                ))}
              </div>
              <div className="h-24 bg-gradient-to-r from-orange-100 via-orange-50 to-amber-100 dark:from-orange-900/20 dark:via-orange-900/10 dark:to-amber-900/20 rounded-xl flex items-end justify-around px-4 pb-3">
                {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-5 rounded-t-md bg-orange-400 opacity-80" style={{ height: `${h * 0.6}px` }} />
                    <span className="text-[9px] text-muted-foreground">M{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="py-14 bg-orange-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="text-white">
                <p className="text-4xl font-extrabold">{s.value}</p>
                <p className="text-orange-100 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-foreground">Everything you need to track your <span className="gradient-text">finances</span></h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Powerful features designed for modern financial management</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 card-hover group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}><f.icon size={22} /></div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-foreground">Role-Based <span className="gradient-text">Access Control</span></h2>
            <p className="mt-4 text-muted-foreground text-lg">Two modes, one dashboard — tailored for every user</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-8 card-hover border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center"><Eye size={22} /></div>
                <div><h3 className="text-xl font-bold text-foreground">Viewer Mode</h3><span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">Read Only</span></div>
              </div>
              <ul className="space-y-3">
                {['View all transactions', 'Browse dashboard & charts', 'See financial insights', 'Filter & search data', 'Export to CSV'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-foreground"><Check size={16} className="text-green-500 flex-shrink-0" /> {item}</li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-border text-xs font-mono text-muted-foreground space-y-1">
                <p>📧 viewer@fintrack.com</p>
                <p>🔑 Viewer@123</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 card-hover border-2 border-orange-300 dark:border-orange-700 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-bold text-white bg-orange-500 px-3 py-1 rounded-full">Recommended</div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center"><ShieldCheck size={22} /></div>
                <div><h3 className="text-xl font-bold text-foreground">Admin Mode</h3><span className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">Full Control</span></div>
              </div>
              <ul className="space-y-3">
                {['Everything in Viewer', 'Add new transactions', 'Edit existing records', 'Delete transactions', 'Quick action shortcuts'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-foreground"><Check size={16} className="text-orange-500 flex-shrink-0" /> {item}</li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-border text-xs font-mono text-muted-foreground space-y-1">
                <p>📧 admin@fintrack.com</p>
                <p>🔑 Admin@123</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to take control?</h2>
          <p className="text-orange-100 text-lg mb-10">Your data, your dashboard. Secure and private.</p>
          <button onClick={() => setCurrentPage('login')} className="bg-white text-orange-600 font-bold px-10 py-4 rounded-2xl text-lg hover:bg-orange-50 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 mx-auto group">
            Launch Dashboard <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl btn-primary flex items-center justify-center text-white font-bold">F</div>
            <span className="font-bold"><span className="gradient-text">Fin</span><span className="text-foreground">Track</span></span>
          </div>
          <p className="text-sm text-muted-foreground">Built with React + Vite + Tailwind CSS + Recharts + Zustand</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <button onClick={() => setCurrentPage('dashboard')} className="hover:text-orange-500 transition-colors">Dashboard</button>
            <button onClick={() => setCurrentPage('transactions')} className="hover:text-orange-500 transition-colors">Transactions</button>
            <button onClick={() => setCurrentPage('insights')} className="hover:text-orange-500 transition-colors">Insights</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
