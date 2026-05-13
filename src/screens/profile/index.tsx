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

  const menuBtn = {
    display: 'flex', alignItems: 'center', gap: 14, width: '100%',
    padding: '15px 16px', background: '#212636', border: 'none',
    color: '#f5f5f5', fontSize: 15, cursor: 'pointer', textAlign: 'left' as const,
  };

  return (
    <div className="page-enter" style={{ paddingBottom: 80 }}>
      <PageHeader title="Profil" />

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* User card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 18, borderRadius: 18, background: '#212636' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User style={{ width: 28, height: 28, color: '#8b5cf6' }} />
          </div>
          <div>
            <p style={{ fontSize: 17, fontWeight: 600 }}>
              {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Foydalanuvchi' : '...'}
            </p>
            {user?.username && <p style={{ fontSize: 14, color: '#888', marginTop: 2 }}>@{user.username}</p>}
          </div>
        </div>

        {/* Menu */}
        <div style={{ borderRadius: 18, overflow: 'hidden' }}>
          {menuItems.map((item, i) => (
            <button key={i} style={{ ...menuBtn, borderTop: i > 0 ? '1px solid #252525' : 'none' }}>
              <item.icon style={{ width: 20, height: 20, color: '#777', flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              <ChevronRight style={{ width: 16, height: 16, color: '#444' }} />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button onClick={() => window.Telegram?.WebApp?.close()}
          style={{ ...menuBtn, borderRadius: 18, gap: 14 }}>
          <LogOut style={{ width: 20, height: 20, color: '#ef4444', flexShrink: 0 }} />
          <span style={{ fontSize: 15, color: '#ef4444' }}>Chiqish</span>
        </button>
      </div>
    </div>
  );
}
