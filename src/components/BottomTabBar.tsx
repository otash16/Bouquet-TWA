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
  const location = useLocation();

  return (
    <div style={{ position: 'fixed', bottom: 16, left: 16, right: 16, zIndex: 50 }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 20,
        padding: '6px 8px',
        backgroundColor: '#2a3040',
        boxShadow: '0 -2px 20px rgba(0,0,0,0.3)',
      }}>
        {tabs.map(tab => {
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: '8px 16px',
                borderRadius: 14,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: isActive ? '#1e3a3a' : 'transparent',
              }}
            >
              <tab.icon style={{ width: 20, height: 20, color: isActive ? '#c9a84c' : '#9ca3b0' }} />
              <span style={{ fontSize: 10, fontWeight: 500, color: isActive ? '#c9a84c' : '#9ca3b0' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
