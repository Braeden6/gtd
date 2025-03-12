import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

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
          `${import.meta.env.VITE_API_URL}/auth/oauth/authentik/callback?code=${code}&state=${state}`, 
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Authenticating...</h2>
        <div className="animate-pulse">Please wait while we complete your login</div>
      </div>
    </div>
  );
};

export default AuthCallback;