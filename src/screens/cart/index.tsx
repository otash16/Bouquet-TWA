import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';

export default function CartPage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in pb-24">
      <PageHeader title="Savatcha" />
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <ShoppingCart className="w-16 h-16 mb-4" style={{ color: 'var(--text-muted)' }} />
        <h2 className="text-lg font-semibold mb-1">Savatcha bo'sh</h2>
        <p className="text-sm text-center mb-6" style={{ color: 'var(--text-secondary)' }}>
          Gul qo'shish uchun do'konlarni ko'ring
        </p>
        <button
          onClick={() => navigate('/home')}
          className="px-6 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          style={{ backgroundColor: 'var(--accent)', color: '#000' }}
        >
          Bosh sahifaga o'tish
        </button>
      </div>
    </div>
  );
}
