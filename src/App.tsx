import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BottomTabBar from '@/components/BottomTabBar';
import HomePage from '@/screens/home';
import ShopPage from '@/screens/shop';
import FlowerPage from '@/screens/flower';
import CartPage from '@/screens/cart';
import OrdersPage from '@/screens/orders';
import ProfilePage from '@/screens/profile';
import api from '@/services/api';

export default function App() {
  const location = useLocation();

  // Telegram auth — mini app ochilganda token olish
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      api.post('/client/auth')
        .then(r => {
          const { access } = r.data.data;
          localStorage.setItem('token', access.token);
        })
        .catch(console.error);
    }
  }, []);

  // Bottom tab bar ko'rsatish kerak bo'lmagan sahifalar
  const hideTabBar = location.pathname.startsWith('/shop/') || location.pathname.startsWith('/flower/');

  return (
    <>
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
