import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTransactions } from '../../store/useFinanceStore';
import { getCategoryBreakdown, formatCurrency } from '../../utils/calculations';

export default function PieBreakdown() {
  const { transactions } = useTransactions();
  const data = getCategoryBreakdown(transactions).slice(0, 6);

  return (
    <div className="glass-card rounded-2xl p-6 card-hover animate-fade-in-up opacity-0 delay-500 h-full">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground">Spending Breakdown</h2>
        <p className="text-sm text-muted-foreground">By category</p>
      </div>
      {data.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-muted-foreground text-sm text-center">
          <div><div className="text-3xl mb-2">🥧</div><p>No expenses yet</p></div>
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {data.map((entry, i) => <Cell key={i} fill={entry.fill} strokeWidth={0} />)}
              </Pie>
              <Tooltip
                formatter={(v: number) => [formatCurrency(v), 'Spent']}
                contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '12px', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {data.slice(0, 4).map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.fill }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
