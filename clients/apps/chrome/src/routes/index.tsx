import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@gtd/shared/components/ui/button'
import { useUser } from '@/hooks/useUser';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>
  } else if (!user) {
    return <div>Not logged in, redirecting to login...
        <Button onClick={() => {
        window.open(`${import.meta.env.VITE_WEB_URL}/login`, '_blank');
      }}>Login</Button>
    </div>
  }

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <div>
          Welcome {user?.first_name} {user?.last_name}
        </div>
      </header>
    </div>
  )
}
