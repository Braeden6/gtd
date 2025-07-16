import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@gtd/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@gtd/shared/components/ui/card'

export const Route = createFileRoute('/_main/completed')({
  component: CompletedPage,
})

function CompletedPage() {
  const handleHiClick = () => {
    alert('Hi there! 👋')
  }

  return (
    <div className="w-full h-[832px] overflow-hidden relative">
      <div className="transition-all duration-300 ease-in-out">
        <div className="flex flex-col w-full max-w-[1239px] items-center justify-center gap-[38px] absolute top-0 left-5 h-full">
          <div className="flex flex-col items-center gap-[30px]">
            <h2 className="relative self-stretch font-bold text-[26px] text-center">
              Completed
            </h2>

            <Card className="w-full max-w-md rounded-[10px] overflow-hidden shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Completed Items</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6 p-8">
                <p className="text-center text-muted-foreground">
                  This is where your completed tasks will appear.
                </p>
                <Button 
                  onClick={handleHiClick}
                  size="lg"
                  className="flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Hi
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 