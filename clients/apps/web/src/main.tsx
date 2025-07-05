import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import * as TanStackQueryProvider from './lib/root-provider.tsx'
import { routeTree } from './routeTree.gen'
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { initializeApi } from '@gtd/shared'
import { useTheme } from '@gtd/shared'
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdPartyReact from 'supertokens-auth-react/recipe/thirdparty'
import { Google } from 'supertokens-auth-react/recipe/thirdparty';
import Session from "supertokens-auth-react/recipe/session";
import { canHandleRoute, getRoutingComponent } from 'supertokens-auth-react/ui/index'
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui'

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
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const { initializeTheme } = useTheme.getState();
initializeTheme();

initializeApi(import.meta.env.VITE_API_URL)

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
    {canHandleRoute([ThirdPartyPreBuiltUI]) ? (
      getRoutingComponent([ThirdPartyPreBuiltUI])
    ) : (
      <SuperTokensWrapper>
        <TanStackQueryProvider.Provider>
          <RouterProvider router={router} />
        </TanStackQueryProvider.Provider>
      </SuperTokensWrapper>
    )}
  </StrictMode>)
}

reportWebVitals()