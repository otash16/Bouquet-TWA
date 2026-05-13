import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flower2, Phone, Store } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import api from '@/services/api';

interface FlowerDetail {
  id: string;
  name: string;
  description: string | null;
  price: number;
  discountPrice: number | null;
  images: string[];
  shopId: string;
  shopSlug: string;
  shopName: string;
  shopLogo: string | null;
  shopPhone: string | null;
  categoryName: string | null;
}

export default function FlowerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState<FlowerDetail | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/client/flowers/${id}?lang=uz`)
      .then(r => setFlower(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>Yuklanmoqda...</div>;
  if (!flower) return <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>Gul topilmadi</div>;

  return (
    <div className="animate-fade-in pb-24">
      {/* Image gallery */}
      <div className="relative h-72">
        {flower.images.length > 0 ? (
          <img src={flower.images[activeImage]} alt="" className="w-full h-full object-cover" />
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

        {/* Image dots */}
        {flower.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {flower.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="w-2 h-2 rounded-full transition-colors cursor-pointer"
                style={{ backgroundColor: i === activeImage ? 'var(--accent)' : 'rgba(255,255,255,0.4)' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 mb-2">
          {flower.categoryName && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--accent)' }}>
              {flower.categoryName}
            </span>
          )}
        </div>
        <h1 className="text-xl font-bold">{flower.name}</h1>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{formatPrice(flower.price)}</span>
          {flower.discountPrice && (
            <span className="text-sm line-through" style={{ color: 'var(--text-muted)' }}>{formatPrice(flower.discountPrice)}</span>
          )}
        </div>

        {flower.description && (
          <p className="text-sm mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {flower.description}
          </p>
        )}
      </div>

      {/* Shop card */}
      <div
        className="mx-4 p-4 rounded-xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
        style={{ backgroundColor: 'var(--bg-card)' }}
        onClick={() => navigate(`/shop/${flower.shopSlug}`)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            {flower.shopLogo ? (
              <img src={flower.shopLogo} alt="" className="w-full h-full object-cover" />
            ) : (
              <Store className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">{flower.shopName}</p>
            {flower.shopPhone && (
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{flower.shopPhone}</p>
            )}
          </div>
        </div>
        {flower.shopPhone && (
          <a
            href={`tel:${flower.shopPhone}`}
            onClick={e => e.stopPropagation()}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-header)' }}
          >
            <Phone className="w-4 h-4" style={{ color: 'var(--accent)' }} />
          </a>
        )}
      </div>
    </div>
  );
}
