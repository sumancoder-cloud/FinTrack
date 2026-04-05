import { Eye, Info } from 'lucide-react';

export default function ViewerBanner() {
  return (
    <div className="flex items-start sm:items-center gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 animate-fade-in-up opacity-0 delay-100">
      <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
        <Eye size={18} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">Viewer Mode</p>
          <Info size={13} className="text-blue-500" />
        </div>
        <p className="text-blue-600 dark:text-blue-400 text-xs mt-0.5">
          You can view all financial data, charts, and insights — but cannot add, edit, or delete transactions.
          Contact your Admin to get elevated access.
        </p>
      </div>
    </div>
  );
}
