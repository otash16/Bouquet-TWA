import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Flower2 } from 'lucide-react';
import api from '@/services/api';

interface Shop {
  id: string; slug: string; logo: string | null; coverImage: string | null;
  name: string; description: string | null; flowerCount: number;
}
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
    <div className="page-enter" style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 20px', background: '#212636', borderRadius: '0 0 28px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flower2 style={{ width: 22, height: 22, color: '#8b5cf6' }} />
          </div>
          <span style={{ fontSize: 22, fontWeight: 700 }}>Bouquet</span>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#555' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Gul yoki do'kon qidiring..."
            style={{
              width: '100%', paddingLeft: 42, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
              borderRadius: 14, fontSize: 15, color: '#f5f5f5', background: '#272d3d',
              border: '1px solid #333a4a', outline: 'none', WebkitAppearance: 'none',
            }}
          />
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              flexShrink: 0, padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600,
              border: 'none', cursor: 'pointer',
              background: !activeCategory ? '#8b5cf6' : '#272d3d',
              color: !activeCategory ? '#fff' : '#888',
            }}
          >Hammasi</button>
          {categories.map(cat => (
            <button key={cat.id}
              onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              style={{
                flexShrink: 0, padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                border: 'none', cursor: 'pointer',
                background: activeCategory === cat.id ? '#8b5cf6' : '#272d3d',
                color: activeCategory === cat.id ? '#fff' : '#888',
              }}
            >{cat.name}</button>
          ))}
        </div>
      </div>

      {/* Section title */}
      <div style={{ padding: '0 20px', marginBottom: 14 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Do'konlar</h2>
      </div>

      {/* Shop list */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#555' }}>
            <div style={{ width: 24, height: 24, border: '2px solid #8b5cf6', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 0.8s linear infinite' }} />
            Yuklanmoqda...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Flower2 style={{ width: 48, height: 48, margin: '0 auto 12px', color: '#333' }} />
            <p style={{ color: '#555', fontSize: 15 }}>Do'konlar topilmadi</p>
          </div>
        ) : (
          filtered.map(shop => (
            <div key={shop.id} onClick={() => navigate(`/shop/${shop.slug}`)}
              style={{ borderRadius: 20, overflow: 'hidden', background: '#212636', cursor: 'pointer' }}>
              <div style={{ height: 180, position: 'relative' }}>
                {shop.coverImage || shop.logo ? (
                  <img src={shop.coverImage || shop.logo || ''} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#272d3d' }}>
                    <Flower2 style={{ width: 56, height: 56, color: '#2a2a2a' }} />
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
                <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{shop.name}</h3>
                </div>
              </div>
              <div style={{ padding: '12px 16px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: '#888', maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {shop.description || "Gul do'koni"}
                </span>
                <span style={{ fontSize: 12, color: '#8b5cf6', fontWeight: 600 }}>{shop.flowerCount} gul</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
