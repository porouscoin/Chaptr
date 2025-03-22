"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, Trophy, Star, Calendar, Settings, ChevronLeft, BarChart } from "lucide-react"

const Profile = () => {
  const { userId } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isCurrentUser, setIsCurrentUser] = useState(false)

  useEffect(() => {
    // This would be an API call to your backend
    // For now, we'll use mock data
    setTimeout(() => {
      const profileData = {
        id: userId,
        name: "John Doe",
        username: "johndoe",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Avid reader and book enthusiast. I love science fiction, fantasy, and historical fiction. Always looking for book recommendations!",
        joinedDate: "2022-03-15",
        stats: {
          booksRead: 42,
          booksReading: 3,
          booksWantToRead: 15,
          reviews: 28,
          followers: 124,
          following: 87,
        },
        favoriteGenres: ["Science Fiction", "Fantasy", "Historical Fiction", "Mystery"],
        recentActivity: [
          {
            type: "read",
            book: {
              id: "1",
              title: "Project Hail Mary",
              author: "Andy Weir",
              cover: "/placeholder.svg?height=60&width=40",
            },
            date: "2023-06-05",
          },
          {
            type: "review",
            book: {
              id: "2",
              title: "The Midnight Library",
              author: "Matt Haig",
              cover: "/placeholder.svg?height=60&width=40",
            },
            rating: 5,
            date: "2023-05-20",
          },
          {
            type: "joined",
            club: {
              id: "1",
              name: "Sci-Fi Lovers",
            },
            date: "2023-05-15",
          },
        ],
        currentlyReading: [
          {
            id: "3",
            title: "The Midnight Library",
            author: "Matt Haig",
            cover: "/placeholder.svg?height=100&width=70",
            progress: 35,
          },
          {
            id: "4",
            title: "Project Hail Mary",
            author: "Andy Weir",
            cover: "/placeholder.svg?height=100&width=70",
            progress: 68,
          },
          {
            id: "5",
            title: "Atomic Habits",
            author: "James Clear",
            cover: "/placeholder.svg?height=100&width=70",
            progress: 12,
          },
        ],
        challenges: [
          {
            id: "1",
            title: "2023 Reading Challenge",
            progress: 12,
            goal: 20,
          },
          {
            id: "2",
            title: "Sci-Fi Explorer",
            progress: 3,
            goal: 5,
          },
        ],
        bookClubs: [
          {
            id: "1",
            name: "Sci-Fi Lovers",
            members: 24,
          },
          {
            id: "2",
            name: "Mystery Book Club",
            members: 18,
          },
        ],
      }

      setProfile(profileData)
      setIsCurrentUser(userId === "1") // Assuming "1" is the current user's ID
      setLoading(false)
    }, 1000)
  }, [userId])

  if (loading) {
    return (
      <div className="container py-6 flex items-center justify-center min-h-[50vh]">
        <p>Loading profile...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
        <Button asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <Button variant="ghost" className="mb-4" asChild>
        <Link to="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-sm text-muted-foreground">@{profile.username}</p>

                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    Joined {new Date(profile.joinedDate).toLocaleDateString()}
                  </div>

                  <p className="mt-4 text-sm">{profile.bio}</p>

                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {profile.favoriteGenres.map((genre, index) => (
                      <Badge key={index} variant="outline">
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  {isCurrentUser ? (
                    <Button className="mt-6 w-full" asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                  ) : (
                    <Button className="mt-6 w-full">Follow</Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reading Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{profile.stats.booksRead}</p>
                    <p className="text-sm text-muted-foreground">Books Read</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{profile.stats.booksReading}</p>
                    <p className="text-sm text-muted-foreground">Reading Now</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{profile.stats.reviews}</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{profile.stats.booksWantToRead}</p>
                    <p className="text-sm text-muted-foreground">Want to Read</p>
                  </div>
                </div>

                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between">
                    <div className="text-center">
                      <p className="text-lg font-bold">{profile.stats.followers}</p>
                      <p className="text-xs text-muted-foreground">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{profile.stats.following}</p>
                      <p className="text-xs text-muted-foreground">Following</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="reading" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="reading" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Reading
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Challenges
              </TabsTrigger>
              <TabsTrigger value="clubs" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Book Clubs
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reading" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Currently Reading</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {profile.currentlyReading.map((book) => (
                      <div key={book.id} className="flex flex-col">
                        <div className="flex gap-4">
                          <img
                            src={book.cover || "/placeholder.svg"}
                            alt={book.title}
                            className="h-[100px] w-[70px] object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium line-clamp-1">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                            <div className="mt-2 space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>{book.progress}%</span>
                              </div>
                              <Progress value={book.progress} className="h-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/reading-list">View All Books</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="challenges" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reading Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profile.challenges.map((challenge) => (
                      <div key={challenge.id} className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{challenge.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {challenge.progress}/{challenge.goal} books
                          </span>
                        </div>
                        <Progress value={(challenge.progress / challenge.goal) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/challenges">View All Challenges</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="clubs" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book Clubs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.bookClubs.map((club) => (
                      <div key={club.id} className="flex items-center gap-4 p-4 border rounded-md">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{club.name}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{club.members} members</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/book-clubs">View All Clubs</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-md">
                        {activity.type === "read" && (
                          <>
                            <div className="bg-green-100 p-2 rounded-full">
                              <BookOpen className="h-4 w-4 text-green-500" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">
                                Read{" "}
                                <Link to={`/book/${activity.book.id}`} className="font-medium hover:underline">
                                  {activity.book.title}
                                </Link>{" "}
                                by {activity.book.author}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(activity.date).toLocaleDateString()}
                              </p>
                            </div>
                          </>
                        )}
                        {activity.type === "review" && (
                          <>
                            <div className="bg-yellow-100 p-2 rounded-full">
                              <Star className="h-4 w-4 text-yellow-500" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">
                                Reviewed{" "}
                                <Link to={`/book/${activity.book.id}`} className="font-medium hover:underline">
                                  {activity.book.title}
                                </Link>{" "}
                                - {activity.rating} stars
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(activity.date).toLocaleDateString()}
                              </p>
                            </div>
                          </>
                        )}
                        {activity.type === "joined" && (
                          <>
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Users className="h-4 w-4 text-blue-500" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">
                                Joined{" "}
                                <Link to={`/club/${activity.club.id}`} className="font-medium hover:underline">
                                  {activity.club.name}
                                </Link>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(activity.date).toLocaleDateString()}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Profile

