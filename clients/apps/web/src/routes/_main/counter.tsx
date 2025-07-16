import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import { Button } from '@gtd/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@gtd/shared/components/ui/card'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/_main/counter')({
  component: CounterPage,
})

function CounterPage() {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="w-full h-[832px] overflow-hidden relative">
      <div className="transition-all duration-300 ease-in-out">
        <div className="flex flex-col w-full max-w-[1239px] items-center justify-center gap-[38px] absolute top-0 left-5 h-full">
          <div className="flex flex-col items-center gap-[30px]">
            <h2 className="relative self-stretch font-bold text-[26px] text-center">
              Counter
            </h2>

            <Card className="w-full max-w-md rounded-[10px] overflow-hidden shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Number Counter</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6 p-8">
                <div 
                  className={`text-6xl font-bold text-primary transition-all duration-300 ${
                    isAnimating ? 'scale-125 text-blue-600' : 'scale-100'
                  }`}
                >
                  {count}
                </div>
                <Button 
                  onClick={handleIncrement}
                  size="lg"
                  className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
                    isAnimating ? 'bg-blue-600 shadow-lg' : ''
                  }`}
                >
                  <Plus className={`w-5 h-5 transition-transform duration-200 ${
                    isAnimating ? 'rotate-90' : 'rotate-0'
                  }`} />
                  Increment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 