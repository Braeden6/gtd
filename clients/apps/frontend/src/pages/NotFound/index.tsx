import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="text-center space-y-6">
                <h1 className="text-8xl font-bold">404</h1>
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold">Page Not Found</h2>
                    <p className="text-gray-600">
                        Sorry, we couldn't find <span className="font-mono text-red-500">{location.pathname}</span>
                    </p>
                    <p className="text-gray-500">
                        The page you're looking for might have been moved or doesn't exist.
                    </p>
                </div>
                <div className="flex gap-4 justify-center mt-8">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="hover:bg-gray-100"
                    >
                        Go Back
                    </Button>
                    <Button
                        onClick={() => navigate('/')}
                        className="bg-primary hover:bg-primary/90"
                    >
                        Go to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}