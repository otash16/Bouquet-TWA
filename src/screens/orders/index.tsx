import { ClipboardList } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function OrdersPage() {
  return (
    <div className="animate-fade-in pb-24">
      <PageHeader title="Buyurtmalar" />
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <ClipboardList className="w-16 h-16 mb-4" style={{ color: 'var(--text-muted)' }} />
        <h2 className="text-lg font-semibold mb-1">Buyurtmalar yo'q</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Hozircha hech qanday buyurtma bermagansiz
        </p>
      </div>
    </div>
  );
}
