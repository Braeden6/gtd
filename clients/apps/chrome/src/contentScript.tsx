import { createRoot } from 'react-dom/client';
import './styles.css';
import Overlay from './components/Overlay';
import { initializeApi, useTheme } from '@gtd/shared';

const overlayId = '__gtd_overlay_root';

if (!document.getElementById(overlayId)) {
  const { initializeTheme } = useTheme.getState();
  initializeTheme();
  const div = document.createElement('div');
  div.id = overlayId;
  document.body.appendChild(div);
  initializeApi(import.meta.env.VITE_API_URL);

  const rootContainer = document.querySelector(`#${overlayId}`);
  if (!rootContainer) throw new Error("Can't find GTD overlay root element");
  
  const root = createRoot(rootContainer);
  root.render(<Overlay/>);
  console.log('GTD content script loaded');
} 