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

// Tab sahifalar — BackButton ko'rsatilmaydigan
const tabPaths = ['/home', '/cart', '/orders', '/profile'];

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [safeAreaColor, setSafeAreaColor] = useState('#191d2b');

  // Telegram auth
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      api.post('/client/auth')
        .then(r => {
          const { access } = r.data.data;
          localStorage.setItem('token', access.token);
        })
        .catch(console.error)
        .finally(() => setReady(true));
    } else {
      setReady(true);
    }
  }, []);

  // Telegram BackButton boshqaruvi
  useEffect(() => {
    const backButton = window.Telegram?.WebApp?.BackButton;
    if (!backButton) return;

    const isTabPage = tabPaths.some(p => location.pathname === p);

    if (isTabPage) {
      backButton.hide();
    } else {
      backButton.show();
      const handler = () => navigate(-1);
      backButton.onClick(handler);
      return () => backButton.offClick(handler);
    }
  }, [location.pathname, navigate]);

  // Safe area color o'zgartirish
  useEffect(() => {
    const handler = (e: Event) => {
      const color = (e as CustomEvent).detail;
      setSafeAreaColor(color);
    };
    window.addEventListener('safeAreaColor', handler);
    return () => window.removeEventListener('safeAreaColor', handler);
  }, []);

  // Bottom tab bar ko'rsatish
  const hideTabBar = location.pathname.startsWith('/shop/') || location.pathname.startsWith('/flower/');

  if (!ready) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{
          width: 28, height: 28, border: '2px solid #c9a84c', borderTopColor: 'transparent',
          borderRadius: '50%', animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <div className="safe-area-bg" style={{ backgroundColor: safeAreaColor }} />
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
    </>
  );
}
