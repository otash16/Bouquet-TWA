import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flower2, Phone } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import api from '@/services/api';

interface ShopDetail {
  id: string; slug: string; name: string; description: string | null;
  logo: string | null; coverImage: string | null; phone: string | null; flowerCount: number;
}
interface FlowerItem {
  id: string; name: string; price: number; discountPrice: number | null;
  images: string[]; categoryName: string | null;
}

export default function ShopPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState<ShopDetail | null>(null);
  const [flowers, setFlowers] = useState<FlowerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/client/shops/${slug}?lang=uz`)
      .then(r => { setShop(r.data.data); return api.get(`/client/flowers?shopId=${r.data.data.id}&lang=uz&limit=50`); })
      .then(r => setFlowers(r.data.data.records))
      .catch(console.error).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-6 h-6 border-2 border-[#8b5cf6] border-t-transparent rounded-full" style={{ animation: 'spin 0.8s linear infinite' }} /></div>;
  if (!shop) return <div className="text-center py-20 text-[#666]">Do'kon topilmadi</div>;

  return (
    <div className="page-enter pb-6">
      {/* Cover */}
      <div className="relative h-56">
        {shop.coverImage || shop.logo ? (
          <img src={shop.coverImage || shop.logo || ''} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
            <Flower2 className="w-16 h-16 text-[#333]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
        <button onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border-none cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Shop info */}
      <div className="px-5 -mt-8 relative z-10 mb-6">
        <h1 className="text-2xl font-bold mb-1">{shop.name}</h1>
        <p className="text-[14px] text-[#a0a0a0]">{shop.description || "Gul do'koni"}</p>
        {shop.phone && (
          <a href={`tel:${shop.phone}`} className="inline-flex items-center gap-1.5 mt-2 text-[13px] text-[#8b5cf6] no-underline">
            <Phone className="w-3.5 h-3.5" /> {shop.phone}
          </a>
        )}
      </div>

      {/* Flowers */}
      <div className="px-5">
        <h2 className="text-[17px] font-semibold mb-3">Gullar <span className="text-[#666] font-normal text-[14px]">({flowers.length})</span></h2>
        {flowers.length === 0 ? (
          <div className="text-center py-12">
            <Flower2 className="w-10 h-10 mx-auto mb-2 text-[#333]" />
            <p className="text-[14px] text-[#666]">Hali gullar qo'shilmagan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {flowers.map(flower => (
              <div key={flower.id} onClick={() => navigate(`/flower/${flower.id}`)}
                className="rounded-2xl overflow-hidden bg-[#1a1a1a] cursor-pointer active:scale-[0.97] transition-transform">
                <div className="aspect-square relative">
                  {flower.images[0] ? (
                    <img src={flower.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#222]">
                      <Flower2 className="w-8 h-8 text-[#333]" />
                    </div>
                  )}
                  {flower.categoryName && (
                    <span className="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white">
                      {flower.categoryName}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-[13px] font-medium truncate mb-1">{flower.name}</h3>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[14px] font-bold text-[#8b5cf6]">{formatPrice(flower.price)}</span>
                    {flower.discountPrice && (
                      <span className="text-[11px] text-[#666] line-through">{formatPrice(flower.discountPrice)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
