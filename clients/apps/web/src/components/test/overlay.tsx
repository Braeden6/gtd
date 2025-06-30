import { createRoot } from 'react-dom/client';

const overlayId = 'my-extension-overlay-root';

// Prevent duplicate overlays
if (!document.getElementById(overlayId)) {
  const container = document.createElement('div');
  container.id = overlayId;
  document.body.appendChild(container);

  // Style for fixed bottom-right button
  Object.assign(container.style, {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    zIndex: '999999', // Ensure it's on top
    pointerEvents: 'none' // Allow clicks to pass through except the button
  });

  function OverlayButton() {
    return (
      <button
        style={{
          pointerEvents: 'auto', // Enable click
          background: '#333',
          color: '#fff',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          fontSize: '24px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Overlay button clicked!')}
      >
        +
      </button>
    );
  }

  createRoot(container).render(<OverlayButton />);
}
