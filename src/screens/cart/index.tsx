import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';

export default function CartPage() {
  const navigate = useNavigate();
  return (
    <div className="page-enter" style={{ paddingBottom: 80 }}>
      <PageHeader title="Savatcha" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: '#212636', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <ShoppingCart style={{ width: 36, height: 36, color: '#444' }} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Savatcha bo'sh</h2>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 28, lineHeight: 1.5 }}>Gul qo'shish uchun do'konlarni ko'ring</p>
        <button onClick={() => navigate('/home')}
          style={{ padding: '14px 32px', borderRadius: 14, fontSize: 15, fontWeight: 600, background: '#8b5cf6', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Bosh sahifaga o'tish
        </button>
      </div>
    </div>
  );
}
