import axios from 'axios';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { LockKeyhole } from 'lucide-react';

const Login: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const initiateLogin = async (): Promise<void> => {
    if (location.state && 'from' in location.state) {
      localStorage.setItem('auth_redirect', location.state.from as string);
    }
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/oauth/authentik/authorize?scopes=fastapi-users%3Aoauth-state`);
    const authUrl = response.data.authorization_url;

    const urlParams = new URLSearchParams(authUrl.split('?')[1]);
    const state = urlParams.get('state');
    if (state) {
      localStorage.setItem('auth_state', state);
    }
    window.location.href = authUrl + '&scope=' + encodeURIComponent('openid profile email');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center space-y-2 pb-2">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to GTD App</CardTitle>
          <CardDescription className="text-base">Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="border-t border-border" />
          <Button 
            onClick={initiateLogin}
            className="w-full font-medium"
            size="lg"
            variant="default"
          >
            Sign in
          </Button>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground text-center flex justify-center">
          <p className="max-w-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;