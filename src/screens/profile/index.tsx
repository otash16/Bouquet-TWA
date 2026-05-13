import { useEffect, useState } from 'react';
import { User, ClipboardList, Settings, LogOut, MessageCircle, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

interface UserInfo { firstName: string | null; lastName: string | null; username: string | null; }

export default function ProfilePage() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tgUser) {
      setUser({ firstName: tgUser.first_name ?? null, lastName: tgUser.last_name ?? null, username: tgUser.username ?? null });
    } else {
      setUser({ firstName: 'Dev', lastName: 'User', username: 'dev_user' });
    }
  }, []);

  const menuItems = [
    { icon: ClipboardList, label: 'Buyurtmalar tarixi' },
    { icon: MessageCircle, label: "Biz bilan bog'lanish" },
    { icon: Settings, label: 'Sozlamalar' },
  ];

  const menuStyle = { display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '14px 16px', background: '#fff', border: 'none', color: '#000', fontSize: 15, cursor: 'pointer', textAlign: 'left' as const };

  return (
    <div className="page-enter" style={{ paddingBottom: 90 }}>
      <PageHeader title="Profil" />
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, background: '#fff', border: '1px solid #E5E5EA' }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User style={{ width: 24, height: 24, color: '#8b5cf6' }} />
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 600 }}>{user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Foydalanuvchi' : '...'}</p>
            {user?.username && <p style={{ fontSize: 13, color: '#8E8E93', marginTop: 2 }}>@{user.username}</p>}
          </div>
        </div>

        {/* Menu */}
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #E5E5EA' }}>
          {menuItems.map((item, i) => (
            <button key={i} style={{ ...menuStyle, borderTop: i > 0 ? '1px solid #E5E5EA' : 'none' }}>
              <item.icon style={{ width: 20, height: 20, color: '#8E8E93', flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              <ChevronRight style={{ width: 16, height: 16, color: '#C7C7CC' }} />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button onClick={() => window.Telegram?.WebApp?.close()}
          style={{ ...menuStyle, borderRadius: 16, border: '1px solid #E5E5EA' }}>
          <LogOut style={{ width: 20, height: 20, color: '#FF3B30', flexShrink: 0 }} />
          <span style={{ color: '#FF3B30' }}>Chiqish</span>
        </button>
      </div>
    </div>
  );
}
