import { ClipboardList } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function OrdersPage() {
  return (
    <div style={{ paddingBottom: 100 }}>
      <PageHeader title="Buyurtmalar" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 16px' }}>
        <ClipboardList style={{ width: 56, height: 56, color: '#6b7280', marginBottom: 16 }} />
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Buyurtmalar yo'q</h2>
        <p style={{ fontSize: 14, color: '#9ca3b0' }}>
          Hozircha hech qanday buyurtma bermagansiz
        </p>
      </div>
    </div>
  );
}
