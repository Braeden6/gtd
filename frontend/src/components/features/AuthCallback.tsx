import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Parse URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        
        // Verify state matches stored state (CSRF protection)
        const storedState = localStorage.getItem('auth_state');
        
        if (!code) {
          setStatus('Error: No authorization code received');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }
        
        if (state !== storedState) {
          setStatus('Error: State mismatch. Security validation failed.');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }
        
        // Clear stored state
        localStorage.removeItem('auth_state');
        
        // Exchange code for tokens via your backend API
        const response = await axios.get(`http://localhost:8000/auth/oauth/authentik/callback?code=${code}&state=${state}`, 
          // { code },
          { withCredentials: true } // Important for receiving cookies
        );

        
        if (response.status === 204) {
          // Set local authentication state if needed
          localStorage.setItem('isAuthenticated', 'true');
          
          // Redirect to dashboard or previous page
          const intendedDestination = localStorage.getItem('auth_redirect') || '/';
          localStorage.removeItem('auth_redirect');
          
          setStatus('Authentication successful! Redirecting...');
          setTimeout(() => navigate(intendedDestination), 1000);
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setStatus(`Authentication failed: ${error.message}`);
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Authentication</h1>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default AuthCallback;