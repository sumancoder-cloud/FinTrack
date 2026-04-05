import { useState } from 'react';
import { useAuthStore, UserRole } from '../store/useAuthStore';
import { Eye, EyeOff, Mail, Lock, User, Shield, ArrowLeft, Check, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigateLogin: () => void;
}

const passwordRules = [
  { label: 'At least 6 characters', test: (p: string) => p.length >= 6 },
  { label: 'Contains a letter', test: (p: string) => /[a-zA-Z]/.test(p) },
  { label: 'Contains a number', test: (p: string) => /\d/.test(p) },
];

export default function SignupPage({ onNavigateLogin }: Props) {
  const { signup } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'viewer' as UserRole });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const result = signup(form.name.trim(), form.email.trim(), form.password, form.role);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? 'Signup failed.');
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="text-center max-w-sm animate-fade-in-up opacity-0">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Account Created!</h2>
          <p className="text-muted-foreground mb-6">Your account has been created successfully. You can now sign in.</p>
          <button onClick={onNavigateLogin} className="btn-primary text-white font-bold px-8 py-3 rounded-xl w-full">
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/10 animate-bubble"
              style={{ width: `${50 + i * 25}px`, height: `${50 + i * 25}px`, left: `${8 + i * 15}%`, animationDuration: `${15 + i * 2}s`, animationDelay: `${i * 2}s` }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-extrabold text-xl">F</div>
            <span className="text-white font-bold text-2xl">FinTrack</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Join thousands<br />tracking smarter
          </h2>
          <p className="text-orange-100 text-lg leading-relaxed max-w-sm">
            Sign up in seconds. No credit card required. Start tracking your finances immediately.
          </p>
        </div>
        <div className="relative z-10 space-y-4">
          <div className="glass-card rounded-2xl p-4 bg-white/10 border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center"><ShieldCheck size={18} /></div>
              <div>
                <p className="text-white font-semibold text-sm">Admin Role</p>
                <p className="text-orange-100 text-xs">Add, edit, and delete transactions</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4 bg-white/10 border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center"><Eye size={18} /></div>
              <div>
                <p className="text-white font-semibold text-sm">Viewer Role</p>
                <p className="text-orange-100 text-xs">View reports and analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md animate-fade-in-up opacity-0">
          <button onClick={onNavigateLogin} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft size={15} /> Back to Sign In
          </button>

          <h1 className="text-3xl font-extrabold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Start tracking your finances today — free forever</p>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm mb-5">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-1.5 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all"
                  required
                />
              </div>
            </div>

            {/* Role picker */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Account Role</label>
              <div className="grid grid-cols-2 gap-3">
                {(['viewer', 'admin'] as UserRole[]).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, role: r }))}
                    className={`flex items-center gap-2 p-3.5 rounded-xl border-2 transition-all text-left ${
                      form.role === r
                        ? r === 'admin'
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
                        : 'border-border bg-card hover:border-muted-foreground'
                    }`}
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: r === 'admin' ? 'rgba(249,115,22,0.1)' : 'rgba(59,130,246,0.1)' }}>{r === 'admin' ? <ShieldCheck size={15} className="text-orange-500" /> : <Eye size={15} className="text-blue-500" />}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground capitalize">{r}</p>
                      <p className="text-[11px] text-muted-foreground">{r === 'admin' ? 'Full access' : 'View only'}</p>
                    </div>
                    {form.role === r && (
                      <Check size={14} className={`ml-auto flex-shrink-0 ${r === 'admin' ? 'text-orange-500' : 'text-blue-500'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all"
                  required
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 space-y-1">
                  {passwordRules.map((rule, i) => (
                    <div key={i} className={`flex items-center gap-1.5 text-xs ${rule.test(form.password) ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                      <Check size={11} className={rule.test(form.password) ? 'opacity-100' : 'opacity-30'} />
                      {rule.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirm}
                  onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all ${
                    form.confirm && form.confirm !== form.password ? 'border-red-400' : 'border-border'
                  }`}
                  required
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.confirm && form.confirm !== form.password && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <button onClick={onNavigateLogin} className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
