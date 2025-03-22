"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { BarChart, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"

const ReadingProgress = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [readingData, setReadingData] = useState({
    daily: [],
    weekly: [],
    monthly: [],
    yearly: [],
  })

  useEffect(() => {
    // This would be API calls to your backend
    // For now, we'll use mock data
    setReadingData({
      daily: [
        { date: "2023-06-01", pagesRead: 25, minutesRead: 45, books: ["The Midnight Library"] },
        { date: "2023-06-02", pagesRead: 30, minutesRead: 50, books: ["The Midnight Library"] },
        { date: "2023-06-03", pagesRead: 0, minutesRead: 0, books: [] },
        { date: "2023-06-04", pagesRead: 40, minutesRead: 65, books: ["Project Hail Mary"] },
        { date: "2023-06-05", pagesRead: 35, minutesRead: 55, books: ["Project Hail Mary"] },
        { date: "2023-06-06", pagesRead: 20, minutesRead: 30, books: ["Atomic Habits"] },
        { date: "2023-06-07", pagesRead: 15, minutesRead: 25, books: ["Atomic Habits"] },
      ],
      weekly: [
        { week: "May 28 - Jun 3", pagesRead: 120, minutesRead: 210, books: ["The Midnight Library"] },
        { week: "Jun 4 - Jun 10", pagesRead: 110, minutesRead: 175, books: ["Project Hail Mary", "Atomic Habits"] },
        { week: "Jun 11 - Jun 17", pagesRead: 95, minutesRead: 160, books: ["Atomic Habits"] },
        { week: "Jun 18 - Jun 24", pagesRead: 130, minutesRead: 220, books: ["Atomic Habits", "The Great Gatsby"] },
      ],
      monthly: [
        { month: "January", pagesRead: 450, minutesRead: 750, books: ["Dune", "1984"] },
        { month: "February", pagesRead: 380, minutesRead: 630, books: ["The Great Gatsby", "To Kill a Mockingbird"] },
        { month: "March", pagesRead: 420, minutesRead: 700, books: ["Pride and Prejudice"] },
        { month: "April", pagesRead: 510, minutesRead: 850, books: ["The Hobbit", "The Alchemist"] },
        { month: "May", pagesRead: 470, minutesRead: 780, books: ["The Midnight Library"] },
        { month: "June", pagesRead: 230, minutesRead: 385, books: ["Project Hail Mary", "Atomic Habits"] },
      ],
      yearly: [
        { year: "2020", pagesRead: 4200, minutesRead: 7000, booksCompleted: 12 },
        { year: "2021", pagesRead: 5100, minutesRead: 8500, booksCompleted: 15 },
        { year: "2022", pagesRead: 4800, minutesRead: 8000, booksCompleted: 14 },
        { year: "2023", pagesRead: 2460, minutesRead: 4095, booksCompleted: 7 },
      ],
    })
  }, [])

  const getDailyData = () => {
    const dateStr = selectedDate.toISOString().split("T")[0]
    return readingData.daily.find((day) => day.date === dateStr) || { pagesRead: 0, minutesRead: 0, books: [] }
  }

  const dailyData = getDailyData()

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Reading Progress</h1>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6">
          <div className="grid gap-6 md:grid-cols-7">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select a date to view your reading progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Daily Reading</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const prevDay = new Date(selectedDate)
                        prevDay.setDate(prevDay.getDate() - 1)
                        setSelectedDate(prevDay)
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                      {selectedDate.toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const nextDay = new Date(selectedDate)
                        nextDay.setDate(nextDay.getDate() + 1)
                        setSelectedDate(nextDay)
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <BookOpen className="h-8 w-8 text-primary mb-2" />
                          <div className="text-3xl font-bold">{dailyData.pagesRead}</div>
                          <p className="text-sm text-muted-foreground">Pages Read</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <BarChart className="h-8 w-8 text-primary mb-2" />
                          <div className="text-3xl font-bold">{dailyData.minutesRead}</div>
                          <p className="text-sm text-muted-foreground">Minutes Read</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Books Read</h3>
                    {dailyData.books.length > 0 ? (
                      <ul className="space-y-2">
                        {dailyData.books.map((book, index) => (
                          <li key={index} className="flex items-center gap-2 p-2 border rounded-md">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span>{book}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No reading activity on this day.</p>
                    )}
                  </div>

                  <Button>Update Today's Progress</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Reading Stats</CardTitle>
              <CardDescription>Your reading progress over the past weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {readingData.weekly.map((week, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{week.week}</h3>
                      <span className="text-sm text-muted-foreground">{week.pagesRead} pages</span>
                    </div>
                    <Progress value={(week.pagesRead / 200) * 100} className="h-2" />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {week.books.map((book, bookIndex) => (
                        <span
                          key={bookIndex}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {book}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Reading Stats</CardTitle>
              <CardDescription>Your reading progress over the past months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {readingData.monthly.map((month, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{month.month}</h3>
                      <span className="text-sm text-muted-foreground">{month.pagesRead} pages</span>
                    </div>
                    <Progress value={(month.pagesRead / 600) * 100} className="h-2" />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {month.books.map((book, bookIndex) => (
                        <span
                          key={bookIndex}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {book}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yearly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Reading Stats</CardTitle>
              <CardDescription>Your reading progress over the years</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {readingData.yearly.map((year, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{year.year}</h3>
                      <span className="text-sm text-muted-foreground">{year.booksCompleted} books completed</span>
                    </div>
                    <Progress value={(year.booksCompleted / 20) * 100} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{year.pagesRead} pages</span>
                      <span>{Math.round(year.minutesRead / 60)} hours</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ReadingProgress

