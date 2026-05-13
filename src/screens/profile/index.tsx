import { useEffect, useState } from 'react';
import { User, ClipboardList, Settings, LogOut, MessageCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

interface UserInfo {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tgUser) {
      setUser({
        firstName: tgUser.first_name ?? null,
        lastName: tgUser.last_name ?? null,
        username: tgUser.username ?? null,
      });
    } else {
      setUser({ firstName: 'Dev', lastName: 'User', username: 'dev_user' });
    }
  }, []);

  const menuItems = [
    { icon: ClipboardList, label: 'Buyurtmalar tarixi' },
    { icon: MessageCircle, label: "Biz bilan bog'lanish" },
    { icon: Settings, label: 'Sozlamalar' },
  ];

  const cardStyle = {
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#2a3040',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    color: '#fff',
    textAlign: 'left' as const,
  };

  return (
    <div style={{ paddingBottom: 100 }}>
      <PageHeader title="Profil" />

      <div style={{ padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* User card */}
        <div style={cardStyle}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', backgroundColor: '#232838',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <User style={{ width: 24, height: 24, color: '#6b7280' }} />
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 15 }}>
              {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Foydalanuvchi' : '...'}
            </p>
            {user?.username && (
              <p style={{ fontSize: 13, color: '#9ca3b0', marginTop: 2 }}>@{user.username}</p>
            )}
          </div>
        </div>

        {/* Menu items */}
        {menuItems.map((item, i) => (
          <button key={i} style={cardStyle}>
            <item.icon style={{ width: 20, height: 20, color: '#9ca3b0', flexShrink: 0 }} />
            <span style={{ fontSize: 14, flex: 1 }}>{item.label}</span>
            <span style={{ color: '#6b7280', fontSize: 18 }}>›</span>
          </button>
        ))}

        {/* Logout */}
        <button
          onClick={() => window.Telegram?.WebApp?.close()}
          style={{ ...cardStyle, marginTop: 4 }}
        >
          <LogOut style={{ width: 20, height: 20, color: '#ef4444', flexShrink: 0 }} />
          <span style={{ fontSize: 14, color: '#ef4444' }}>Chiqish</span>
        </button>
      </div>
    </div>
  );
}
