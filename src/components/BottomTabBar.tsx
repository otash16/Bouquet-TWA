import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, ClipboardList, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { path: '/home', label: 'Asosiy', icon: Home },
  { path: '/cart', label: 'Savatcha', icon: ShoppingCart },
  { path: '/orders', label: 'Buyurtmalar', icon: ClipboardList },
  { path: '/profile', label: 'Profil', icon: User },
];

export default function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <nav className="flex items-center justify-around rounded-2xl px-2 py-2" style={{ backgroundColor: 'var(--bg-tab-bar)' }}>
        {tabs.map(tab => {
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                'flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer',
                isActive ? 'bg-[var(--bg-header)]' : ''
              )}
            >
              <tab.icon
                className={cn('w-5 h-5 transition-colors', isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]')}
              />
              <span
                className={cn('text-[10px] font-medium transition-colors', isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]')}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
