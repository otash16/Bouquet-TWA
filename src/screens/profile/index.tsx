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
      // Dev mode
      setUser({ firstName: 'Dev', lastName: 'User', username: 'dev_user' });
    }
  }, []);

  const menuItems = [
    { icon: ClipboardList, label: 'Buyurtmalar tarixi', action: () => {} },
    { icon: MessageCircle, label: "Biz bilan bog'lanish", action: () => {} },
    { icon: Settings, label: 'Sozlamalar', action: () => {} },
  ];

  return (
    <div className="animate-fade-in pb-24">
      <PageHeader title="Profil" />

      <div className="px-4 mt-4 space-y-3">
        {/* User card */}
        <div className="rounded-xl p-4 flex items-center gap-3" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <User className="w-6 h-6" style={{ color: 'var(--text-muted)' }} />
          </div>
          <div>
            <p className="font-semibold">
              {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Foydalanuvchi' : '...'}
            </p>
            {user?.username && (
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>@{user.username}</p>
            )}
          </div>
        </div>

        {/* Menu items */}
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="w-full rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <item.icon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
            <span className="text-sm flex-1 text-left">{item.label}</span>
            <span style={{ color: 'var(--text-muted)' }}>›</span>
          </button>
        ))}

        {/* Logout */}
        <button
          onClick={() => window.Telegram?.WebApp?.close()}
          className="w-full rounded-xl p-4 flex items-center gap-3 cursor-pointer"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <LogOut className="w-5 h-5" style={{ color: 'var(--danger)' }} />
          <span className="text-sm" style={{ color: 'var(--danger)' }}>Chiqish</span>
        </button>
      </div>
    </div>
  );
}
