import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flower2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import api from '@/services/api';

interface ShopDetail {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  logo: string | null;
  coverImage: string | null;
  phone: string | null;
  flowerCount: number;
}

interface FlowerItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  discountPrice: number | null;
  images: string[];
  shopName: string;
  categoryName: string | null;
}

export default function ShopPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState<ShopDetail | null>(null);
  const [flowers, setFlowers] = useState<FlowerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/client/shops/${slug}?lang=uz`)
      .then(r => {
        setShop(r.data.data);
        return api.get(`/client/flowers?shopId=${r.data.data.id}&lang=uz&limit=50`);
      })
      .then(r => setFlowers(r.data.data.records))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>Yuklanmoqda...</div>;
  if (!shop) return <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>Do'kon topilmadi</div>;

  return (
    <div className="animate-fade-in pb-24">
      {/* Cover */}
      <div className="relative h-48">
        {shop.coverImage || shop.logo ? (
          <img src={shop.coverImage || shop.logo || ''} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-header)' }}>
            <Flower2 className="w-16 h-16" style={{ color: 'var(--accent)' }} />
          </div>
        )}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Shop info */}
      <div className="px-4 py-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <h1 className="text-lg font-bold">{shop.name}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          {shop.description || "Gul do'koni"} · {shop.flowerCount} ta gul
        </p>
        {shop.phone && (
          <p className="text-sm mt-1" style={{ color: 'var(--accent)' }}>{shop.phone}</p>
        )}
      </div>

      {/* Flowers */}
      <div className="px-4 mt-4">
        <h2 className="text-base font-semibold mb-3">Gullar</h2>
        {flowers.length === 0 ? (
          <div className="text-center py-8">
            <Flower2 className="w-10 h-10 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Hali gullar qo'shilmagan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {flowers.map(flower => (
              <div
                key={flower.id}
                onClick={() => navigate(`/flower/${flower.id}`)}
                className="rounded-xl overflow-hidden cursor-pointer active:scale-[0.97] transition-transform"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="h-32 relative">
                  {flower.images[0] ? (
                    <img src={flower.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <Flower2 className="w-8 h-8" style={{ color: 'var(--text-muted)' }} />
                    </div>
                  )}
                  {flower.discountPrice && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md" style={{ backgroundColor: 'var(--danger)', color: '#fff' }}>
                      -{Math.round((1 - flower.price / flower.discountPrice) * 100)}%
                    </span>
                  )}
                </div>
                <div className="p-2.5">
                  <h3 className="text-xs font-medium truncate">{flower.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{formatPrice(flower.price)}</span>
                    {flower.discountPrice && (
                      <span className="text-[10px] line-through" style={{ color: 'var(--text-muted)' }}>{formatPrice(flower.discountPrice)}</span>
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
