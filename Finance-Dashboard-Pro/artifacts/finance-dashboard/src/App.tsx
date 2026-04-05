import { useEffect, useState } from 'react';
import { useFinanceUIStore } from './store/useFinanceStore';
import { useAuthStore } from './store/useAuthStore';
import Background from './components/Background/Background';
import Navbar from './components/UI/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Transactions from './components/Transactions/Transactions';
import Insights from './components/Insights/Insights';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

type AuthPage = 'login' | 'signup';

export default function App() {
  const { currentPage, darkMode } = useFinanceUIStore();
  const { session } = useAuthStore();
  const [authPage, setAuthPage] = useState<AuthPage>('login');

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // Not logged in — show landing or auth pages
  if (!session) {
    if (currentPage === 'landing') {
      return (
        <>
          <Background />
          <LandingPage />
        </>
      );
    }
    return (
      <>
        <Background />
        {authPage === 'login' ? (
          <LoginPage onNavigateSignup={() => setAuthPage('signup')} />
        ) : (
          <SignupPage onNavigateLogin={() => setAuthPage('login')} />
        )}
      </>
    );
  }

  // Logged in — show app
  if (currentPage === 'landing') {
    return (
      <>
        <Background />
        <LandingPage />
      </>
    );
  }

  return (
    <>
      <Background />
      <div className="min-h-screen">
        <Navbar />
        <main>
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'transactions' && <Transactions />}
          {currentPage === 'insights' && <Insights />}
        </main>
      </div>
    </>
  );
}
