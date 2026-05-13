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
    <div className="page-enter pb-20">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#8b5cf6]/15 flex items-center justify-center">
            <Flower2 className="w-5 h-5 text-[#8b5cf6]" />
          </div>
          <span className="text-xl font-bold">Bouquet</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#666]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Gul yoki do'kon qidiring..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl text-[15px] bg-[#1a1a1a] border border-[#2a2a2a] text-white outline-none focus:border-[#8b5cf6] transition-colors"
            style={{ WebkitAppearance: 'none' }}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 px-4 py-[7px] rounded-full text-[13px] font-medium border-none cursor-pointer transition-all ${
              !activeCategory ? 'bg-[#8b5cf6] text-white' : 'bg-[#1a1a1a] text-[#a0a0a0]'
            }`}
          >Hammasi</button>
          {categories.map(cat => (
            <button key={cat.id}
              onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              className={`shrink-0 px-4 py-[7px] rounded-full text-[13px] font-medium border-none cursor-pointer transition-all ${
                activeCategory === cat.id ? 'bg-[#8b5cf6] text-white' : 'bg-[#1a1a1a] text-[#a0a0a0]'
              }`}
            >{cat.name}</button>
          ))}
        </div>
      </div>

      {/* Section title */}
      <div className="px-5 mb-3">
        <h2 className="text-[17px] font-semibold">
          {activeCategory ? categories.find(c => c.id === activeCategory)?.name : "Do'konlar"}
        </h2>
      </div>

      {/* Shop list */}
      <div className="px-5 flex flex-col gap-4">
        {loading ? (
          <div className="text-center py-16 text-[#666]">
            <div className="w-6 h-6 border-2 border-[#8b5cf6] border-t-transparent rounded-full mx-auto mb-3" style={{ animation: 'spin 0.8s linear infinite' }} />
            Yuklanmoqda...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Flower2 className="w-12 h-12 mx-auto mb-3 text-[#333]" />
            <p className="text-[#666] text-[15px]">Do'konlar topilmadi</p>
          </div>
        ) : (
          filtered.map(shop => (
            <div key={shop.id} onClick={() => navigate(`/shop/${shop.slug}`)}
              className="rounded-2xl overflow-hidden bg-[#1a1a1a] cursor-pointer active:scale-[0.98] transition-transform">
              <div className="h-[180px] relative">
                {shop.coverImage || shop.logo ? (
                  <img src={shop.coverImage || shop.logo || ''} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#222]">
                    <Flower2 className="w-14 h-14 text-[#333]" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-[16px] font-semibold text-white drop-shadow-lg">{shop.name}</h3>
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-[13px] text-[#a0a0a0]">{shop.description || "Gul do'koni"}</span>
                <span className="text-[12px] text-[#8b5cf6] font-medium">{shop.flowerCount} gul</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
