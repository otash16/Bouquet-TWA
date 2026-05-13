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

  return (
    <div className="page-enter pb-20">
      <PageHeader title="Profil" />
      <div className="px-5 space-y-4">
        {/* User card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a1a1a]">
          <div className="w-14 h-14 rounded-full bg-[#8b5cf6]/15 flex items-center justify-center shrink-0">
            <User className="w-7 h-7 text-[#8b5cf6]" />
          </div>
          <div>
            <p className="text-[16px] font-semibold">
              {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Foydalanuvchi' : '...'}
            </p>
            {user?.username && <p className="text-[13px] text-[#a0a0a0] mt-0.5">@{user.username}</p>}
          </div>
        </div>

        {/* Menu */}
        <div className="rounded-2xl overflow-hidden">
          {menuItems.map((item, i) => (
            <button key={i}
              className="flex items-center gap-3.5 w-full px-4 py-[14px] bg-[#1a1a1a] border-none text-white text-[15px] cursor-pointer text-left"
              style={{ borderTop: i > 0 ? '1px solid #222' : 'none' }}>
              <item.icon className="w-5 h-5 text-[#888] shrink-0" />
              <span className="flex-1">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-[#444]" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button onClick={() => window.Telegram?.WebApp?.close()}
          className="flex items-center gap-3.5 w-full px-4 py-[14px] rounded-2xl bg-[#1a1a1a] border-none cursor-pointer text-left">
          <LogOut className="w-5 h-5 text-[#ef4444] shrink-0" />
          <span className="text-[15px] text-[#ef4444]">Chiqish</span>
        </button>
      </div>
    </div>
  );
}
