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
  const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  // @ts-expect-error
  if (tg.setHeaderColor) tg.setHeaderColor(isMobileDevice ? '#ffffff' : '#000000');
  // @ts-expect-error
  if (tg.setBackgroundColor) tg.setBackgroundColor(isMobileDevice ? '#F2F2F7' : '#000000');
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
