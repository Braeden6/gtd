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
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdPartyReact, { signOut } from 'supertokens-auth-react/recipe/thirdparty'
import { Google } from 'supertokens-auth-react/recipe/thirdparty';
import Session from "supertokens-auth-react/recipe/session";
import { canHandleRoute, getRoutingComponent } from 'supertokens-auth-react/ui/index'
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui'

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   const location = useLocation();

//   if (isLoading) {
//     return <LoadingScreen 
//       title="Authenticating" 
//       description="Verifying your credentials..." 
//       showProgress={false}
//     />;
//   }

//   if (!isAuthenticated) {
//     return <Navigate 
//       to="/login" 
//       params={{ from: location.pathname }} 
//       replace 
//     />;
//   }
//   return <>{children}</>;
// };

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


SuperTokens.init({
  appInfo: {
    appName: "GTD",
    apiDomain: "http://localhost:8000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
recipeList: [
    ThirdPartyReact.init({
      signInAndUpFeature: {
        providers: [Google.init()],
      },
    }),
    Session.init()
  ],
  getRedirectionURL: async (context) => {
    if (context.action === "SUCCESS" && context.newSessionCreated) {
        return "/";
    }
},
});



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
    {canHandleRoute([ThirdPartyPreBuiltUI]) ? (
      getRoutingComponent([ThirdPartyPreBuiltUI])
    ) : (
      <SuperTokensWrapper>
        <ThemeProvider>
          {/* <ProtectedRoute> */}
            <TanStackQueryProvider.Provider>
              <RouterProvider router={router} />
            </TanStackQueryProvider.Provider>
          {/* </ProtectedRoute> */}
        </ThemeProvider>
      </SuperTokensWrapper>
    )}
  </StrictMode>)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()