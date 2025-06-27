import { createFileRoute } from '@tanstack/react-router'
// import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
// import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';;
import { AuthPage } from 'supertokens-auth-react/ui';
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';



export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthPage preBuiltUIList={[
    ThirdPartyPreBuiltUI,
    // EmailPasswordPreBuiltUI
    ]} />
  )
}
