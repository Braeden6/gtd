import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import Dashboard from '@/pages/Dashboard/index';
import NextActions from '@/pages/NextActions/index';
import Projects from '@/pages/Projects/index';
// import WaitingFor from '@/pages/waiting-for';
// import Someday from '@/pages/someday';
// import Reference from '@/pages/reference';
import NotFound from '@/pages/NotFound/index';
import Inbox from './pages/Indox/inbox';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';
import { PWAInstallPrompt } from '@/components/features/PWAInstallPrompt';
import QuickCapture from './pages/QuickCapture/QuickCapture';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
});

function App() {
  const [shouldShowPWAPrompt, setShouldShowPWAPrompt] = useState(false);

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setShouldShowPWAPrompt(isIOS && !isStandalone);
  }, []);

  if (shouldShowPWAPrompt) {
    return <PWAInstallPrompt />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
        <Route path="capture" element={<QuickCapture />} /> 
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="next-actions" element={<NextActions />} />
            <Route path="projects" element={<Projects />} />
            {/* <Route path="waiting-for" element={<WaitingFor />} /> */}
            {/* <Route path="someday" element={<Someday />} /> */}
            {/* <Route path="reference" element={<Reference />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;