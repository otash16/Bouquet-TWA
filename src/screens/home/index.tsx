import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Flower2, MapPin } from 'lucide-react';
import api from '@/services/api';

interface Shop {
  id: string;
  slug: string;
  logo: string | null;
  coverImage: string | null;
  name: string;
  description: string | null;
  flowerCount: number;
}

interface Category {
  id: string;
  slug: string;
  name: string;
}

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
    ])
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredShops = shops.filter(s =>
    search ? s.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ padding: '24px 16px 16px', backgroundColor: '#1e3a3a' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Flower2 style={{ width: 24, height: 24, color: '#c9a84c' }} />
            <span style={{ fontSize: 20, fontWeight: 700, color: '#c9a84c' }}>Bouquet</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9ca3b0', marginBottom: 12 }}>
          <MapPin style={{ width: 14, height: 14 }} />
          <span style={{ fontSize: 13 }}>Toshkent</span>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#6b7280' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Qidirish..."
            style={{
              width: '100%',
              paddingLeft: 40,
              paddingRight: 16,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 14,
              fontSize: 14,
              color: '#fff',
              backgroundColor: '#2a3040',
              border: 'none',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Section title + Categories */}
      <div style={{ padding: '16px 16px 0' }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Do'konlar</h2>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, WebkitOverflowScrolling: 'touch' }}>
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              padding: '7px 16px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: !activeCategory ? '#c9a84c' : '#2a3040',
              color: !activeCategory ? '#000' : '#9ca3b0',
            }}
          >
            Hammasi
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              style={{
                padding: '7px 16px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeCategory === cat.id ? '#c9a84c' : '#2a3040',
                color: activeCategory === cat.id ? '#000' : '#9ca3b0',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Shop list */}
      <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>Yuklanmoqda...</div>
        ) : filteredShops.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <Flower2 style={{ width: 48, height: 48, margin: '0 auto 12px', color: '#6b7280' }} />
            <p style={{ color: '#6b7280' }}>Do'konlar topilmadi</p>
          </div>
        ) : (
          filteredShops.map(shop => (
            <div
              key={shop.id}
              onClick={() => navigate(`/shop/${shop.slug}`)}
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                backgroundColor: '#2a3040',
                cursor: 'pointer',
              }}
            >
              <div style={{ height: 160, position: 'relative' }}>
                {shop.coverImage || shop.logo ? (
                  <img
                    src={shop.coverImage || shop.logo || ''}
                    alt={shop.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#232838' }}>
                    <Flower2 style={{ width: 48, height: 48, color: '#6b7280' }} />
                  </div>
                )}
              </div>
              <div style={{ padding: 12 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600 }}>{shop.name}</h3>
                <p style={{ fontSize: 12, color: '#9ca3b0', marginTop: 4 }}>
                  {shop.flowerCount} ta gul · {shop.description || "Gul do'koni"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
