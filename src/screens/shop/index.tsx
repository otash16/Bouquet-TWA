import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flower2, Phone } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import api from '@/services/api';

interface ShopDetail { id: string; slug: string; name: string; description: string | null; logo: string | null; coverImage: string | null; phone: string | null; flowerCount: number; }
interface FlowerItem { id: string; name: string; price: number; discountPrice: number | null; images: string[]; categoryName: string | null; }

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

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><div style={{ width: 24, height: 24, border: '2px solid #8b5cf6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /></div>;
  if (!shop) return <div style={{ textAlign: 'center', padding: '80px 20px', color: '#8E8E93' }}>Do'kon topilmadi</div>;

  return (
    <div className="page-enter" style={{ paddingBottom: 20 }}>
      <div style={{ height: 200, position: 'relative' }}>
        {shop.coverImage || shop.logo ? (
          <img src={shop.coverImage || shop.logo || ''} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E5E5EA' }}>
            <Flower2 style={{ width: 56, height: 56, color: '#C7C7CC' }} />
          </div>
        )}
        <button onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: 12, left: 12, width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: 'none', cursor: 'pointer' }}>
          <ArrowLeft style={{ width: 20, height: 20, color: '#fff' }} />
        </button>
      </div>

      <div style={{ padding: '16px 20px', background: '#fff', borderRadius: '0 0 20px 20px', marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>{shop.name}</h1>
        <p style={{ fontSize: 14, color: '#8E8E93', marginTop: 4 }}>{shop.description || "Gul do'koni"} · {shop.flowerCount} ta gul</p>
        {shop.phone && (
          <a href={`tel:${shop.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 14, color: '#8b5cf6', textDecoration: 'none' }}>
            <Phone style={{ width: 14, height: 14 }} /> {shop.phone}
          </a>
        )}
      </div>

      <div style={{ padding: '0 20px' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>Gullar</h2>
        {flowers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#8E8E93' }}>
            <Flower2 style={{ width: 40, height: 40, margin: '0 auto 8px', color: '#C7C7CC' }} />
            <p style={{ fontSize: 14 }}>Hali gullar qo'shilmagan</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {flowers.map(flower => (
              <div key={flower.id} onClick={() => navigate(`/flower/${flower.id}`)}
                style={{ borderRadius: 14, overflow: 'hidden', background: '#fff', border: '1px solid #E5E5EA', cursor: 'pointer' }}>
                <div style={{ aspectRatio: '1', position: 'relative' }}>
                  {flower.images[0] ? (
                    <img src={flower.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F2F7' }}>
                      <Flower2 style={{ width: 32, height: 32, color: '#C7C7CC' }} />
                    </div>
                  )}
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{flower.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#8b5cf6' }}>{formatPrice(flower.price)}</span>
                    {flower.discountPrice && <span style={{ fontSize: 11, color: '#8E8E93', textDecoration: 'line-through' }}>{formatPrice(flower.discountPrice)}</span>}
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
