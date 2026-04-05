import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { useTransactions } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/calculations';

function buildBalanceTrend(transactions: ReturnType<typeof useTransactions>['transactions']) {
  const months: Record<string, { income: number; expense: number }> = {};
  for (const t of transactions) {
    const d = new Date(t.date);
    const key = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    if (!months[key]) months[key] = { income: 0, expense: 0 };
    if (t.type === 'income') months[key].income += t.amount;
    else months[key].expense += t.amount;
  }
  return Object.entries(months)
    .slice(-7)
    .map(([month, { income, expense }]) => ({ month, balance: income - expense }));
}

export default function BalanceChart() {
  const { transactions } = useTransactions();
  const data = buildBalanceTrend(transactions);

  return (
    <div className="glass-card rounded-2xl p-6 card-hover animate-fade-in-up opacity-0 delay-400">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">Balance Trend</h2>
          <p className="text-sm text-muted-foreground">Monthly net balance</p>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">Monthly</span>
      </div>
      {data.length === 0 ? (
        <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">
          <div className="text-center"><div className="text-3xl mb-2">📊</div><p>No data to display yet</p></div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.08)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v: number) => [formatCurrency(v), 'Balance']}
              contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(249,115,22,0.15)', fontSize: '13px' }}
            />
            <Area type="monotone" dataKey="balance" stroke="#f97316" strokeWidth={3} fill="url(#balanceGrad)" dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }} activeDot={{ fill: '#f97316', strokeWidth: 0, r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
