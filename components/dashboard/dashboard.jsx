"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, BookMarked, Clock, Trophy, Users, BarChart, ChevronRight } from "lucide-react"

const Dashboard = () => {
  const { currentUser } = useAuth()
  const [currentlyReading, setCurrentlyReading] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [readingStats, setReadingStats] = useState({
    booksRead: 0,
    pagesRead: 0,
    readingStreak: 0,
    goalProgress: 0,
  })

  useEffect(() => {
    // This would be API calls to your backend
    // For now, we'll use mock data
    setCurrentlyReading([
      {
        id: "1",
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "/placeholder.svg?height=150&width=100",
        progress: 35,
      },
      {
        id: "2",
        title: "Project Hail Mary",
        author: "Andy Weir",
        cover: "/placeholder.svg?height=150&width=100",
        progress: 68,
      },
      {
        id: "3",
        title: "Atomic Habits",
        author: "James Clear",
        cover: "/placeholder.svg?height=150&width=100",
        progress: 12,
      },
    ])

    setRecentActivity([
      {
        id: "1",
        type: "progress",
        book: "The Midnight Library",
        details: "Read 25 pages",
        timestamp: "2 hours ago",
      },
      {
        id: "2",
        type: "review",
        book: "Dune",
        details: "Gave 5 stars",
        timestamp: "Yesterday",
      },
      {
        id: "3",
        type: "joined",
        book: null,
        details: "Joined Sci-Fi Lovers book club",
        timestamp: "3 days ago",
      },
    ])

    setReadingStats({
      booksRead: 12,
      pagesRead: 3542,
      readingStreak: 7,
      goalProgress: 65,
    })
  }, [])

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {currentUser.name}!</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Books Read</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readingStats.booksRead}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pages Read</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readingStats.pagesRead}</div>
            <p className="text-xs text-muted-foreground">+342 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readingStats.readingStreak} days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readingStats.goalProgress}%</div>
            <Progress value={readingStats.goalProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4">
          <Tabs defaultValue="reading">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">My Books</h2>
              <TabsList>
                <TabsTrigger value="reading">Currently Reading</TabsTrigger>
                <TabsTrigger value="want">Want to Read</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="reading" className="space-y-4">
              {currentlyReading.map((book) => (
                <Card key={book.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        className="h-[150px] w-[100px] object-cover rounded-md"
                      />
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-semibold text-lg">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{book.progress}%</span>
                          </div>
                          <Progress value={book.progress} className="h-2" />
                          <div className="flex justify-between">
                            <Button variant="outline" size="sm">
                              Update Progress
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/books/${book.id}`}>Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/reading-list">
                  View all books <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </TabsContent>

            <TabsContent value="want">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">You haven't added any books to your "Want to Read" list yet.</p>
                  <Button className="mt-4" asChild>
                    <Link to="/discover">Discover Books</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your reading journey</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-auto">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4 items-start">
                    <div className="rounded-full bg-primary/10 p-2">
                      {activity.type === "progress" && <BookOpen className="h-4 w-4 text-primary" />}
                      {activity.type === "review" && <BookMarked className="h-4 w-4 text-primary" />}
                      {activity.type === "joined" && <Users className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.book ? activity.book : activity.details}</p>
                      {activity.book && <p className="text-xs text-muted-foreground">{activity.details}</p>}
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Reading Challenges
            </CardTitle>
            <CardDescription>Track your reading goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">2023 Reading Challenge</h4>
                  <span className="text-sm text-muted-foreground">12/20 books</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Sci-Fi Explorer</h4>
                  <span className="text-sm text-muted-foreground">3/5 books</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/challenges">View All Challenges</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Book Clubs
            </CardTitle>
            <CardDescription>Connect with other readers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Sci-Fi Lovers</h4>
                  <p className="text-sm text-muted-foreground">Currently reading: "Project Hail Mary"</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Mystery Book Club</h4>
                  <p className="text-sm text-muted-foreground">Currently reading: "The Silent Patient"</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/book-clubs">View All Book Clubs</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

