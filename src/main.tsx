import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Telegram WebApp SDK init
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  // @ts-expect-error — requestFullscreen mavjud bo'lishi mumkin
  if (tg.requestFullscreen) tg.requestFullscreen();
  // @ts-expect-error — disableVerticalSwipes mavjud bo'lishi mumkin
  if (tg.disableVerticalSwipes) tg.disableVerticalSwipes();

  // Telegram header rangini sozlash
  // @ts-expect-error — setHeaderColor mavjud
  if (tg.setHeaderColor) tg.setHeaderColor('#0f0f0f');
  // @ts-expect-error — setBackgroundColor mavjud
  if (tg.setBackgroundColor) tg.setBackgroundColor('#0f0f0f');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
