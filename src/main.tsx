import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    // @ts-expect-error
    tg.disableVerticalSwipes?.();
    // @ts-expect-error
    tg.requestFullscreen?.();
  }
  // @ts-expect-error
  if (tg.setHeaderColor) tg.setHeaderColor('#F2F2F7');
  // @ts-expect-error
  if (tg.setBackgroundColor) tg.setBackgroundColor('#F2F2F7');
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
