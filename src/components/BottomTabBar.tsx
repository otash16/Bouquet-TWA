import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, ClipboardList, User } from 'lucide-react';

const tabs = [
  { path: '/home', label: 'Asosiy', icon: Home },
  { path: '/cart', label: 'Savatcha', icon: ShoppingCart },
  { path: '/orders', label: 'Buyurtmalar', icon: ClipboardList },
  { path: '/profile', label: 'Profil', icon: User },
];

export default function BottomTabBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 bg-[#212636] border-t border-[#333a4a]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
      <div className="flex items-center justify-around py-1.5">
        {tabs.map(tab => {
          const active = pathname.startsWith(tab.path);
          return (
            <button key={tab.path} onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-0.5 py-1 min-w-[64px] bg-transparent border-none cursor-pointer">
              <tab.icon className="w-[22px] h-[22px]" style={{ color: active ? '#8b5cf6' : '#666' }} />
              <span className="text-[10px] font-medium" style={{ color: active ? '#8b5cf6' : '#666' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
