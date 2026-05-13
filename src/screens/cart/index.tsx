import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';

export default function CartPage() {
  const navigate = useNavigate();
  return (
    <div className="page-enter pb-20">
      <PageHeader title="Savatcha" />
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#1a1a1a] flex items-center justify-center mb-5">
          <ShoppingCart className="w-9 h-9 text-[#444]" />
        </div>
        <h2 className="text-lg font-semibold mb-1">Savatcha bo'sh</h2>
        <p className="text-[14px] text-[#a0a0a0] mb-6">Gul qo'shish uchun do'konlarni ko'ring</p>
        <button onClick={() => navigate('/home')}
          className="px-6 py-3 rounded-xl text-[15px] font-semibold bg-[#8b5cf6] text-white border-none cursor-pointer active:opacity-85 transition-opacity">
          Bosh sahifaga o'tish
        </button>
      </div>
    </div>
  );
}
