import { ClipboardList } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function OrdersPage() {
  return (
    <div className="page-enter" style={{ paddingBottom: 80 }}>
      <PageHeader title="Buyurtmalar" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <ClipboardList style={{ width: 36, height: 36, color: '#444' }} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Buyurtmalar yo'q</h2>
        <p style={{ fontSize: 14, color: '#888', lineHeight: 1.5 }}>Hozircha hech qanday buyurtma bermagansiz</p>
      </div>
    </div>
  );
}
