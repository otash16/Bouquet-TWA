import { ClipboardList } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function OrdersPage() {
  return (
    <div className="page-enter pb-20">
      <PageHeader title="Buyurtmalar" />
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#1a1a1a] flex items-center justify-center mb-5">
          <ClipboardList className="w-9 h-9 text-[#444]" />
        </div>
        <h2 className="text-lg font-semibold mb-1">Buyurtmalar yo'q</h2>
        <p className="text-[14px] text-[#a0a0a0]">Hozircha hech qanday buyurtma bermagansiz</p>
      </div>
    </div>
  );
}
