import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';

export default function CartPage() {
  const navigate = useNavigate();

  return (
    <div style={{ paddingBottom: 100 }}>
      <PageHeader title="Savatcha" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 16px' }}>
        <ShoppingCart style={{ width: 56, height: 56, color: '#6b7280', marginBottom: 16 }} />
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Savatcha bo'sh</h2>
        <p style={{ fontSize: 14, color: '#9ca3b0', textAlign: 'center', marginBottom: 24 }}>
          Gul qo'shish uchun do'konlarni ko'ring
        </p>
        <button
          onClick={() => navigate('/home')}
          style={{
            padding: '12px 24px',
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#c9a84c',
            color: '#000',
          }}
        >
          Bosh sahifaga o'tish
        </button>
      </div>
    </div>
  );
}
