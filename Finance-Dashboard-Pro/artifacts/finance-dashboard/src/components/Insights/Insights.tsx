import { useTransactions } from '../../store/useFinanceStore';
import {
  getThisMonthTransactions, getLastMonthTransactions, getMonthlyComparison,
  getHighestSpendingCategory, getCategoryBreakdown, formatCurrency
} from '../../utils/calculations';
import CategoryIcon from '../UI/CategoryIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Lightbulb, Target, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function Insights() {
  const { transactions } = useTransactions();
  const thisMonth = getThisMonthTransactions(transactions);
  const lastMonth = getLastMonthTransactions(transactions);
  const { expenseChange, incomeChange, thisMonth: tm, lastMonth: lm } = getMonthlyComparison(transactions);
  const topCategory = getHighestSpendingCategory(thisMonth);
  const breakdown = getCategoryBreakdown(thisMonth).slice(0, 5);
  const lastBreakdown = getCategoryBreakdown(lastMonth);
  const savingsRate = tm.income > 0 ? ((tm.income - tm.expenses) / tm.income * 100) : 0;

  const comparisonData = [
    { name: 'Income', 'This Month': tm.income, 'Last Month': lm.income },
    { name: 'Expenses', 'This Month': tm.expenses, 'Last Month': lm.expenses },
    { name: 'Savings', 'This Month': Math.max(0, tm.income - tm.expenses), 'Last Month': Math.max(0, lm.income - lm.expenses) },
  ];

  const generateInsights = () => {
    const insights: { text: string; type: 'good' | 'warn' | 'info' }[] = [];
    if (transactions.length === 0) return [{ text: 'Add transactions to start generating personalized insights.', type: 'info' as const }];
    if (expenseChange > 20) insights.push({ text: `Your expenses increased by ${Math.abs(expenseChange).toFixed(0)}% compared to last month. Consider reviewing discretionary spending.`, type: 'warn' });
    else if (expenseChange < -10) insights.push({ text: `Great job! You reduced expenses by ${Math.abs(expenseChange).toFixed(0)}% this month.`, type: 'good' });
    if (topCategory) {
      const lastCat = lastBreakdown.find(c => c.name === topCategory.name);
      if (lastCat && lastCat.value > 0) {
        const change = ((topCategory.value - lastCat.value) / lastCat.value * 100);
        if (change > 30) insights.push({ text: `You spent ${change.toFixed(0)}% more on ${topCategory.name} this month compared to last month.`, type: 'warn' });
      }
      insights.push({ text: `${topCategory.name} is your highest spending category this month at ${formatCurrency(topCategory.value)}.`, type: 'info' });
    }
    if (savingsRate > 30) insights.push({ text: `Excellent savings rate of ${savingsRate.toFixed(0)}%! You're on track for your financial goals.`, type: 'good' });
    else if (savingsRate > 0 && savingsRate < 10) insights.push({ text: `Your savings rate is ${savingsRate.toFixed(0)}%. Try to aim for at least 20% savings monthly.`, type: 'warn' });
    if (incomeChange > 0) insights.push({ text: `Your income grew by ${incomeChange.toFixed(0)}% this month. Keep building multiple income streams!`, type: 'good' });
    if (insights.length === 0) insights.push({ text: 'Your finances look stable. Keep tracking to get more detailed insights over time.', type: 'info' });
    return insights;
  };

  const insights = generateInsights();

  const insightIcon = (type: 'good' | 'warn' | 'info') => {
    if (type === 'good') return <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-green-600 dark:text-green-400" />;
    if (type === 'warn') return <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-orange-500 dark:text-orange-400" />;
    return <Info size={16} className="flex-shrink-0 mt-0.5 text-blue-500 dark:text-blue-400" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="animate-fade-in-up opacity-0">
        <h1 className="text-3xl font-bold text-foreground">Insights</h1>
        <p className="text-muted-foreground mt-1">Smart analysis of your personal financial patterns</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up opacity-0 delay-100">
        <div className="glass-card rounded-2xl p-5 card-hover">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center"><Target size={18} /></div>
            <span className="font-semibold text-sm text-foreground">Savings Rate</span>
          </div>
          <p className="text-3xl font-bold gradient-text">{savingsRate.toFixed(1)}%</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </div>
        <div className="glass-card rounded-2xl p-5 card-hover">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${expenseChange >= 0 ? 'bg-red-100 dark:bg-red-900/30 text-red-500' : 'bg-green-100 dark:bg-green-900/30 text-green-600'}`}>
              {expenseChange >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            </div>
            <span className="font-semibold text-sm text-foreground">Expense Change</span>
          </div>
          <p className={`text-3xl font-bold ${expenseChange >= 0 ? 'text-red-500' : 'text-green-600'}`}>{expenseChange >= 0 ? '+' : ''}{expenseChange.toFixed(1)}%</p>
          <p className="text-xs text-muted-foreground mt-1">vs last month</p>
        </div>
        <div className="glass-card rounded-2xl p-5 card-hover">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center"><TrendingUp size={18} /></div>
            <span className="font-semibold text-sm text-foreground">Top Spend</span>
          </div>
          <div className="flex items-center gap-2">
            {topCategory && (
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${topCategory.fill}20` }}>
                <CategoryIcon category={topCategory.name} size={14} color={topCategory.fill} />
              </div>
            )}
            <p className="text-xl font-bold text-foreground">{topCategory?.name ?? 'N/A'}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{topCategory ? formatCurrency(topCategory.value) : 'No expenses yet'}</p>
        </div>
      </div>

      {/* Comparison chart */}
      <div className="glass-card rounded-2xl p-6 animate-fade-in-up opacity-0 delay-200">
        <h2 className="text-lg font-bold text-foreground mb-1">Monthly Comparison</h2>
        <p className="text-sm text-muted-foreground mb-6">This month vs last month</p>
        {transactions.length === 0 ? (
          <div className="h-52 flex items-center justify-center text-muted-foreground text-sm text-center">
            <div>
              <TrendingUp size={40} className="mx-auto mb-3 opacity-30" />
              <p>Add transactions to see your monthly comparison</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={comparisonData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.08)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '12px', fontSize: '12px' }} />
              <Legend />
              <Bar dataKey="This Month" fill="#f97316" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Last Month" fill="#fdba74" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category breakdown */}
        <div className="glass-card rounded-2xl p-6 animate-fade-in-up opacity-0 delay-300">
          <h2 className="text-lg font-bold text-foreground mb-5">Top Spending Categories</h2>
          {breakdown.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-2">
              <TrendingDown size={36} className="opacity-25" />
              <p className="text-sm">No expense data this month</p>
            </div>
          ) : (
            <div className="space-y-4">
              {breakdown.map((item, i) => {
                const pct = (item.value / breakdown[0].value * 100).toFixed(0);
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5 text-sm">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${item.fill}18` }}>
                          <CategoryIcon category={item.name} size={14} color={item.fill} />
                        </div>
                        <span className="font-medium text-foreground">{item.name}</span>
                      </div>
                      <span className="font-bold text-sm text-foreground">{formatCurrency(item.value)}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: item.fill }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Smart Insights */}
        <div className="glass-card rounded-2xl p-6 animate-fade-in-up opacity-0 delay-400">
          <div className="flex items-center gap-2 mb-5">
            <Lightbulb size={18} className="text-orange-500" />
            <h2 className="text-lg font-bold text-foreground">Smart Insights</h2>
          </div>
          <div className="space-y-3">
            {insights.map((ins, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-xl text-sm leading-relaxed ${ins.type === 'good' ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800' : ins.type === 'warn' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'}`}>
                {insightIcon(ins.type)}
                <p>{ins.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
