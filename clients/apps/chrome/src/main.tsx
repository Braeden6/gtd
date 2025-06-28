import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'
import { routeTree } from './routeTree.gen'
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { ThemeProvider } from './hooks/useTheme.tsx'
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";
import { canHandleRoute, getRoutingComponent } from 'supertokens-auth-react/ui/index'
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import { PasswordlessPreBuiltUI } from 'supertokens-auth-react/recipe/passwordless/prebuiltui';
import { initializeApi } from '@gtd/shared'

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
    websiteDomain: "http://localhost:3001",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
recipeList: [
    Passwordless.init({
      contactMethod: "EMAIL"
    }),
    Session.init()
  ]
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

initializeApi(import.meta.env.VITE_API_URL)

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
    {canHandleRoute([PasswordlessPreBuiltUI]) ? (
      getRoutingComponent([PasswordlessPreBuiltUI])
    ) : (
      <SuperTokensWrapper>
        <ThemeProvider>
            <TanStackQueryProvider.Provider>
              <RouterProvider router={router} />
            </TanStackQueryProvider.Provider>
        </ThemeProvider>
      </SuperTokensWrapper>
    )}
  </StrictMode>)
}

reportWebVitals()