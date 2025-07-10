import { createRoot } from 'react-dom/client';
import styles from './index.css?inline';
import Overlay from './components/Overlay';
import { useTheme } from '@gtd/shared/hooks/useTheme';
import { initializeApi } from '@gtd/shared/utils/api';

export default function createShadowRoot(styles: string) {
  const container = document.createElement('div');
  const shadow = container.attachShadow({ mode: 'open' });
  const globalStyleSheet = new CSSStyleSheet();
  globalStyleSheet.replaceSync(styles);
  shadow.adoptedStyleSheets = [globalStyleSheet];
  document.body.appendChild(container);
  return createRoot(shadow);
}

const { initializeTheme } = useTheme.getState();
initializeTheme();
initializeApi(import.meta.env.VITE_API_URL);
const root = createShadowRoot(styles);
root.render(<Overlay/>);