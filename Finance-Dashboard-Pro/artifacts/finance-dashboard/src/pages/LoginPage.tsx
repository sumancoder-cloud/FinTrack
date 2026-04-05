import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Mail, Lock, TrendingUp, Shield, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';

interface Props {
  onNavigateSignup: () => void;
}

export default function LoginPage({ onNavigateSignup }: Props) {
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(email.trim(), password);
    setLoading(false);
    if (!result.success) setError(result.error ?? 'Login failed.');
  };

  const fillCredential = (type: 'admin' | 'viewer') => {
    if (type === 'admin') {
      setEmail('admin@fintrack.com');
      setPassword('Admin@123');
    } else {
      setEmail('viewer@fintrack.com');
      setPassword('Viewer@123');
    }
    setError('');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-bubble"
              style={{
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                left: `${10 + i * 12}%`,
                animationDuration: `${14 + i * 2}s`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-extrabold text-xl">F</div>
            <span className="text-white font-bold text-2xl">FinTrack</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Track your finances<br />like never before
          </h2>
          <p className="text-orange-100 text-lg leading-relaxed max-w-sm">
            Beautiful dashboards, smart insights, and secure role-based access — all in one place.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-1 gap-4">
          {[
            { icon: TrendingUp, text: 'Real-time balance tracking' },
            { icon: Shield, text: 'Role-based access control' },
            { icon: Zap, text: 'Smart spending insights' },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                <Icon size={16} />
              </div>
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md animate-fade-in-up opacity-0">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 justify-center mb-8">
            <div className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center text-white font-bold text-xl">F</div>
            <span className="font-bold text-2xl"><span className="gradient-text">Fin</span><span className="text-foreground">Track</span></span>
          </div>

          <h1 className="text-3xl font-extrabold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

          {/* Demo credentials */}
          <div className="bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 rounded-2xl p-4 mb-6">
            <p className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider mb-3">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillCredential('admin')}
                className="flex flex-col items-start gap-0.5 p-3 rounded-xl bg-white dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 hover:border-orange-400 transition-all text-left group"
              >
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                  <ShieldCheck size={12} /> Admin
                  <span className="text-orange-400 dark:text-orange-600 font-normal text-[10px] group-hover:text-orange-600 transition-colors">click to fill</span>
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">admin@fintrack.com</span>
                <span className="text-[11px] text-muted-foreground font-mono">Admin@123</span>
              </button>
              <button
                type="button"
                onClick={() => fillCredential('viewer')}
                className="flex flex-col items-start gap-0.5 p-3 rounded-xl bg-white dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 hover:border-orange-400 transition-all text-left group"
              >
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <Eye size={12} /> Viewer
                  <span className="text-blue-400 dark:text-blue-600 font-normal text-[10px] group-hover:text-blue-600 transition-colors">click to fill</span>
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">viewer@fintrack.com</span>
                <span className="text-[11px] text-muted-foreground font-mono">Viewer@123</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm mb-5">
              <AlertTriangle size={15} className="flex-shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-white font-bold py-3.5 rounded-xl text-sm mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <button onClick={onNavigateSignup} className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
              Create one free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
