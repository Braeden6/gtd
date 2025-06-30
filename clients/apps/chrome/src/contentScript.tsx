import { createRoot } from 'react-dom/client';
import './styles.css';
import Overlay from './components/Overlay';

const overlayId = '__gtd_overlay_root';

if (!document.getElementById(overlayId)) {
  const div = document.createElement('div');
  div.id = overlayId;
  document.body.appendChild(div);

  const rootContainer = document.querySelector(`#${overlayId}`);
  if (!rootContainer) throw new Error("Can't find GTD overlay root element");
  
  const root = createRoot(rootContainer);
  root.render(<Overlay/>);
  console.log('GTD content script loaded');
} 