import {
  Briefcase, UtensilsCrossed, Home, Plane, ShoppingBag,
  HeartPulse, Film, Zap, Monitor, TrendingUp, LucideProps
} from 'lucide-react';
import { Category } from '../../data/mockData';

const ICON_MAP: Record<Category, React.ComponentType<LucideProps>> = {
  Salary: Briefcase,
  Food: UtensilsCrossed,
  Rent: Home,
  Travel: Plane,
  Shopping: ShoppingBag,
  Healthcare: HeartPulse,
  Entertainment: Film,
  Utilities: Zap,
  Freelance: Monitor,
  Investments: TrendingUp,
};

interface Props {
  category: Category | string;
  size?: number;
  className?: string;
  color?: string;
}

export default function CategoryIcon({ category, size = 16, className = '', color }: Props) {
  const Icon = ICON_MAP[category as Category] ?? Briefcase;
  return <Icon size={size} className={className} style={color ? { color } : undefined} />;
}
