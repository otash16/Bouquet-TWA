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
    <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, zIndex: 50, background: '#fff', borderTop: '1px solid #E5E5EA', paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingTop: 8, paddingBottom: 6 }}>
        {tabs.map(tab => {
          const active = pathname.startsWith(tab.path);
          const color = active ? '#8b5cf6' : '#8E8E93';
          return (
            <button key={tab.path} onClick={() => navigate(tab.path)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '2px 0', border: 'none', background: 'none', cursor: 'pointer', minWidth: 64 }}>
              <tab.icon style={{ width: 22, height: 22, color }} />
              <span style={{ fontSize: 10, fontWeight: 500, color }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
