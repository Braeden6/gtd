
export function PWAInstallPrompt() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Install GTD Quick Capture
        </h1>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            To use this app, please install it to your home screen:
          </p>
          
          <ol className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="font-bold">1.</span> 
              Tap the share button <span className="inline-block">📤</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold">2.</span> 
              Scroll and select "Add to Home Screen" <span className="inline-block">➕</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold">3.</span> 
              Tap "Add" to install
            </li>
          </ol>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
            After installation, please open the app from your home screen.
          </div>
        </div>
      </div>
    </div>
  );
}