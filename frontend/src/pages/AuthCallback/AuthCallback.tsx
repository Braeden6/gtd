import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();
  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        
        const storedState = localStorage.getItem('auth_state');
        
        if (!code) {
          navigate('/login');
          return;
        }
        
        if (state !== storedState) {
          navigate('/login');
          return;
        }
        localStorage.removeItem('auth_state');
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/oauth/google/callback?code=${code}&state=${state}`, 
          { withCredentials: true }
        );
        
        if (response.status === 204) {
          await checkAuthStatus();
          const intendedDestination = localStorage.getItem('auth_redirect') || '/';
          localStorage.removeItem('auth_redirect');
          
          navigate(intendedDestination, { replace: true });
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, checkAuthStatus]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="flex h-14 items-center px-6">
          <div className="font-semibold">GTD App</div>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="p-8 bg-card rounded-lg shadow-md border border-border max-w-md w-full text-foreground">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">
              Please wait while we complete your login process
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;