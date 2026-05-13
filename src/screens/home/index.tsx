import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Flower2 } from 'lucide-react';
import api from '@/services/api';

interface Shop { id: string; slug: string; logo: string | null; coverImage: string | null; name: string; description: string | null; flowerCount: number; }
interface Category { id: string; slug: string; name: string; }

export default function HomePage() {
  const navigate = useNavigate();
  const [shops, setShops] = useState<Shop[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/client/shops?lang=uz').then(r => setShops(r.data.data)),
      api.get('/client/categories?lang=uz').then(r => setCategories(r.data.data)),
    ]).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = shops.filter(s => search ? s.name.toLowerCase().includes(search.toLowerCase()) : true);

  return (
    <div className="page-enter" style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '16px 20px 18px', borderRadius: '0 0 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flower2 style={{ width: 20, height: 20, color: '#8b5cf6' }} />
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#000' }}>Bouquet</span>
        </div>

        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#8E8E93' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Gul yoki do'kon qidiring..."
            style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderRadius: 12, fontSize: 15, color: '#000', background: '#F2F2F7', border: 'none', outline: 'none' }}
          />
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          <button onClick={() => setActiveCategory(null)}
            style={{ flexShrink: 0, padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, border: '1px solid #E5E5EA', cursor: 'pointer', background: !activeCategory ? '#8b5cf6' : '#fff', color: !activeCategory ? '#fff' : '#3C3C43' }}>
            Hammasi
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              style={{ flexShrink: 0, padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, border: '1px solid #E5E5EA', cursor: 'pointer', background: activeCategory === cat.id ? '#8b5cf6' : '#fff', color: activeCategory === cat.id ? '#fff' : '#3C3C43' }}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section */}
      <div style={{ padding: '18px 20px 12px' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#000' }}>Do'konlar</h2>
      </div>

      {/* Shops */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#8E8E93' }}>
            <div style={{ width: 24, height: 24, border: '2px solid #8b5cf6', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 0.8s linear infinite' }} />
            Yuklanmoqda...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#8E8E93' }}>
            <Flower2 style={{ width: 48, height: 48, margin: '0 auto 12px', color: '#C7C7CC' }} />
            <p>Do'konlar topilmadi</p>
          </div>
        ) : (
          filtered.map(shop => (
            <div key={shop.id} onClick={() => navigate(`/shop/${shop.slug}`)}
              style={{ borderRadius: 16, overflow: 'hidden', background: '#fff', border: '1px solid #E5E5EA', cursor: 'pointer' }}>
              <div style={{ height: 160, position: 'relative' }}>
                {shop.coverImage || shop.logo ? (
                  <img src={shop.coverImage || shop.logo || ''} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F2F7' }}>
                    <Flower2 style={{ width: 48, height: 48, color: '#C7C7CC' }} />
                  </div>
                )}
              </div>
              <div style={{ padding: '12px 16px 14px' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#000' }}>{shop.name}</h3>
                <p style={{ fontSize: 13, color: '#8E8E93', marginTop: 4 }}>{shop.flowerCount} ta gul · {shop.description || "Gul do'koni"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
