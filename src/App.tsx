import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import BottomTabBar from '@/components/BottomTabBar';
import HomePage from '@/screens/home';
import ShopPage from '@/screens/shop';
import FlowerPage from '@/screens/flower';
import CartPage from '@/screens/cart';
import OrdersPage from '@/screens/orders';
import ProfilePage from '@/screens/profile';
import api from '@/services/api';

const tabPaths = ['/home', '/cart', '/orders', '/profile'];

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) { setReady(true); return; }
    api.post('/client/auth')
      .then(r => { localStorage.setItem('token', r.data.data.access.token); })
      .catch(console.error)
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    const bb = window.Telegram?.WebApp?.BackButton;
    if (!bb) return;
    const isTab = tabPaths.some(p => location.pathname === p);
    if (isTab) { bb.hide(); } else {
      bb.show();
      const handler = () => navigate(-1);
      bb.onClick(handler);
      return () => bb.offClick(handler);
    }
  }, [location.pathname, navigate]);

  const hideTabBar = location.pathname.startsWith('/shop/') || location.pathname.startsWith('/flower/');

  if (!ready) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#fff' }}>
      <div style={{ width: 28, height: 28, border: '2px solid #8b5cf6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh' }}>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/shop/:slug" element={<ShopPage />} />
        <Route path="/flower/:id" element={<FlowerPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      {!hideTabBar && <BottomTabBar />}
    </div>
  );
}
