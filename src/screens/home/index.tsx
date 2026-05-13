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
    <div className="animate-fade-in pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4" style={{ backgroundColor: 'var(--bg-header)' }}>
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2">
            <Flower2 className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>Bouquet</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-4" style={{ color: 'var(--text-secondary)' }}>
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Toshkent</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Qidirish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-[var(--text-muted)] outline-none"
            style={{ backgroundColor: 'var(--bg-card)' }}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 pt-4">
        <h2 className="text-base font-semibold mb-3">Do'konlar</h2>
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setActiveCategory(null)}
            className="px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer"
            style={{
              backgroundColor: !activeCategory ? 'var(--accent)' : 'var(--bg-card)',
              color: !activeCategory ? '#000' : 'var(--text-secondary)',
            }}
          >
            Hammasi
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              className="px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer"
              style={{
                backgroundColor: activeCategory === cat.id ? 'var(--accent)' : 'var(--bg-card)',
                color: activeCategory === cat.id ? '#000' : 'var(--text-secondary)',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Shop list */}
      <div className="px-4 space-y-4 mt-2">
        {loading ? (
          <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>Yuklanmoqda...</div>
        ) : filteredShops.length === 0 ? (
          <div className="text-center py-12">
            <Flower2 className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-muted)' }}>Do'konlar topilmadi</p>
          </div>
        ) : (
          filteredShops.map(shop => (
            <div
              key={shop.id}
              onClick={() => navigate(`/shop/${shop.slug}`)}
              className="rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <div className="h-40 relative">
                {shop.coverImage || shop.logo ? (
                  <img
                    src={shop.coverImage || shop.logo || ''}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <Flower2 className="w-12 h-12" style={{ color: 'var(--text-muted)' }} />
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm">{shop.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
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
