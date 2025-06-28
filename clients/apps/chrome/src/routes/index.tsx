import { createFileRoute } from '@tanstack/react-router'
import { Test } from '@gtd/shared'
import { useUser } from '@/hooks/useUser';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { user } = useUser();

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <div>
          {user?.first_name} {user?.last_name}
        </div>
        <Test />
      </header>
    </div>
  )
}
