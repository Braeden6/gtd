import axios from 'axios';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

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
    <div className="flex items-center justify-center min-h-screen bg-[#0a0d16]">
      <div className="p-8 bg-[#111827]/50 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Welcome to GTD App</h1>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <button 
              onClick={initiateLogin}
              className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              <span>Sign in</span>
            </button>
            
            <div className="text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;