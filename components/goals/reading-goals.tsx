import { CardFooter } from "@/components/ui/card"
;('"use client')

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target } from "lucide-react"

const ReadingGoals = () => {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    // Mock data for reading goals
    setGoals([
      {
        id: "1",
        title: "Read 24 books this year",
        target: 24,
        progress: 10,
        description: "Complete your yearly reading goal.",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      },
      {
        id: "2",
        title: "Read 1 book per month",
        target: 12,
        progress: 5,
        description: "Read at least one book every month.",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      },
    ])
  }, [])

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Reading Goals</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {goal.title}
              </CardTitle>
              <CardDescription>{goal.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {goal.progress} / {goal.target}
                  </span>
                </div>
                <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Start Date:</span>
                  <span>{new Date(goal.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>End Date:</span>
                  <span>{new Date(goal.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Update Progress</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ReadingGoals

