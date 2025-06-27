import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createRouter, useLocation } from '@tanstack/react-router'
import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'
import { routeTree } from './routeTree.gen'
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { useAuth } from './hooks/useAuth.tsx'
import { LoadingScreen } from './components/Loading.tsx'
import { ThemeProvider } from './context/useTheme.tsx'
import { initializeApi } from './lib/api.ts'

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen 
      title="Authenticating" 
      description="Verifying your credentials..." 
      showProgress={false}
    />;
  }

  if (!isAuthenticated) {
    return <Navigate 
      to="/login" 
      params={{ from: location.pathname }} 
      replace 
    />;
  }
  return <>{children}</>;
};

const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})



declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

initializeApi()

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider>
      {/* <ProtectedRoute> */}
        <TanStackQueryProvider.Provider>
          <RouterProvider router={router} />
        </TanStackQueryProvider.Provider>
      {/* </ProtectedRoute> */}
      </ThemeProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()





/*

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import Dashboard from '@/pages/Dashboard/index';
import NextActions from '@/pages/NextActions/index';
import Projects from '@/pages/Projects/index';
import NotFound from '@/pages/NotFound/index';
import Inbox from '@/pages/Inbox/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Login from '@/pages/Login/Login';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import AuthCallback from '@/pages/AuthCallback/AuthCallback';
import { ThemeProvider } from '@/context/useTheme';
import { LoadingScreen } from './components/Loading';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
});

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen 
      title="Authenticating" 
      description="Verifying your credentials..." 
      showProgress={false}
    />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="next-actions" element={<NextActions />} />
              <Route path="projects" element={<Projects />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;


*/
