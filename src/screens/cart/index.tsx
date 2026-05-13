import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';

export default function CartPage() {
  const navigate = useNavigate();
  return (
    <div className="page-enter" style={{ paddingBottom: 90, minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Savatcha" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: '#F2F2F7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <ShoppingCart style={{ width: 36, height: 36, color: '#C7C7CC' }} />
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Savatcha bo'sh</h2>
        <p style={{ fontSize: 14, color: '#8E8E93', marginBottom: 28 }}>Gul qo'shish uchun do'konlarni ko'ring</p>
        <button onClick={() => navigate('/home')}
          style={{ padding: '12px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600, background: '#8b5cf6', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Bosh sahifaga o'tish
        </button>
      </div>
    </div>
  );
}
