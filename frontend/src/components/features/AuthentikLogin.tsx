import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AuthentikLogin: React.FC = () => {
  const location = useLocation();

    const initiateLogin = async (): Promise<void> => {
      if (location.state && 'from' in location.state) {
        localStorage.setItem('auth_redirect', location.state.from as string);
      }
      const response = await axios.get('http://localhost:8000/auth/oauth/authentik/authorize?scopes=fastapi-users%3Aoauth-state');
      const authUrl = response.data.authorization_url;

      const urlParams = new URLSearchParams(authUrl.split('?')[1]);
      const state = urlParams.get('state');
      if (state) {
        localStorage.setItem('auth_state', state);
      }
      window.location.href = authUrl + '&scope=' + encodeURIComponent('openid profile email');  ;

      // https://auth.braeden6.com/application/o/authorize/?redirect_uri=${redirectUri}&scope=${scope}&state=${state}

      // "https://auth.braeden6.com/application/o/authorize/?response_type=code&client_id=gEhaRtn0r3rnNPUth5W5WfouFbwUL9ZBp9Frpvrc&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback&state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJmYXN0YXBpLXVzZXJzOm9hdXRoLXN0YXRlIiwiZXhwIjoxNzQxNTgwMTYyfQ.rgSXeZMX0RRZ2J6xIdWCdoxrEdb6eg6gKIiUZzU9XWE&scope=fastapi-users%3Aoauth-state
    };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full text-center">
        <button onClick={initiateLogin}>Login</button>
      </div>
    </div>
  );
};

export default AuthentikLogin;