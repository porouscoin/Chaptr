"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, MessageSquare, Calendar, ChevronLeft, Send } from "lucide-react"

const BookClubDetails = () => {
  const { clubId } = useParams()
  const [bookClub, setBookClub] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    // This would be an API call to your backend
    // For now, we'll use mock data
    setTimeout(() => {
      setBookClub({
        id: clubId,
        name: "Sci-Fi Lovers",
        description:
          "A club for science fiction enthusiasts. We read and discuss the best sci-fi books, from classics to new releases. Join us for thought-provoking conversations about space, technology, and the future of humanity.",
        members: 24,
        currentBook: {
          title: "Project Hail Mary",
          author: "Andy Weir",
          cover: "/placeholder.svg?height=200&width=130",
          progress: 68,
          startDate: "2023-06-01",
          endDate: "2023-06-30",
        },
        previousBooks: [
          {
            title: "Dune",
            author: "Frank Herbert",
            cover: "/placeholder.svg?height=100&width=70",
            completedDate: "2023-05-30",
          },
          {
            title: "The Three-Body Problem",
            author: "Liu Cixin",
            cover: "/placeholder.svg?height=100&width=70",
            completedDate: "2023-04-30",
          },
        ],
        upcomingBooks: [
          {
            title: "Children of Time",
            author: "Adrian Tchaikovsky",
            cover: "/placeholder.svg?height=100&width=70",
            startDate: "2023-07-01",
          },
        ],
        discussions: [
          {
            id: "1",
            user: {
              id: "101",
              name: "Jane Smith",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            message:
              "What do you all think about the scientific concepts in Chapter 5? I found the explanation of the Astrophage fascinating!",
            timestamp: "2023-06-10T14:30:00Z",
            replies: [
              {
                id: "1-1",
                user: {
                  id: "102",
                  name: "Michael Johnson",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
                message:
                  "I agree! The way Weir explains complex scientific concepts while keeping the story engaging is impressive.",
                timestamp: "2023-06-10T15:15:00Z",
              },
            ],
          },
          {
            id: "2",
            user: {
              id: "103",
              name: "Sarah Williams",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            message:
              "I'm loving the character development of Ryland Grace. His journey of self-discovery as his memories return is so well written.",
            timestamp: "2023-06-09T10:45:00Z",
            replies: [],
          },
        ],
        meetings: [
          {
            id: "1",
            title: "June Discussion - Chapters 1-10",
            date: "2023-06-15T19:00:00Z",
            location: "Virtual (Zoom)",
            attendees: 18,
          },
          {
            id: "2",
            title: "June Discussion - Chapters 11-20",
            date: "2023-06-29T19:00:00Z",
            location: "Virtual (Zoom)",
            attendees: 15,
          },
        ],
        genres: ["Science Fiction", "Space", "Adventure"],
        isJoined: true,
      })
      setLoading(false)
    }, 1000)
  }, [clubId])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newDiscussion = {
        id: Date.now().toString(),
        user: {
          id: "current-user",
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        message: newMessage,
        timestamp: new Date().toISOString(),
        replies: [],
      }

      setBookClub((prev) => ({
        ...prev,
        discussions: [newDiscussion, ...prev.discussions],
      }))

      setNewMessage("")
    }
  }

  if (loading) {
    return (
      <div className="container py-6 flex items-center justify-center min-h-[50vh]">
        <p>Loading book club details...</p>
      </div>
    )
  }

  if (!bookClub) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Book club not found</h1>
        <Button asChild>
          <Link to="/book-clubs">Back to Book Clubs</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <Button variant="ghost" className="mb-4" asChild>
        <Link to="/book-clubs">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Book Clubs
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{bookClub.name}</CardTitle>
                <CardDescription>{bookClub.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{bookClub.members} members</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {bookClub.genres.map((genre, index) => (
                    <Badge key={index} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>
                {bookClub.isJoined ? (
                  <Button variant="outline" className="w-full">
                    Leave Club
                  </Button>
                ) : (
                  <Button className="w-full">Join Club</Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Currently Reading</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <img
                    src={bookClub.currentBook.cover || "/placeholder.svg"}
                    alt={bookClub.currentBook.title}
                    className="rounded-md shadow-md w-[130px] h-[200px] object-cover mb-4"
                  />
                  <h3 className="font-semibold text-center">{bookClub.currentBook.title}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">by {bookClub.currentBook.author}</p>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Club Progress</span>
                      <span>{bookClub.currentBook.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${bookClub.currentBook.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="w-full mt-4 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Started:</span>
                      <span>{new Date(bookClub.currentBook.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target End:</span>
                      <span>{new Date(bookClub.currentBook.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="discussions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="discussions" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Discussions
              </TabsTrigger>
              <TabsTrigger value="meetings" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Meetings
              </TabsTrigger>
              <TabsTrigger value="books" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Books
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Join the Conversation</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendMessage}>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Share your thoughts about the current book..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button type="submit" className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Post Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {bookClub.discussions.map((discussion) => (
                  <Card key={discussion.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={discussion.user.avatar} alt={discussion.user.name} />
                          <AvatarFallback>{discussion.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{discussion.user.name}</p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(discussion.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="mt-2">{discussion.message}</p>

                          {discussion.replies.length > 0 && (
                            <div className="mt-4 pl-6 border-l space-y-4">
                              {discussion.replies.map((reply) => (
                                <div key={reply.id} className="flex gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                                    <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm font-medium">{reply.user.name}</p>
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(reply.timestamp).toLocaleString()}
                                      </span>
                                    </div>
                                    <p className="text-sm mt-1">{reply.message}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="mt-4">
                            <Button variant="ghost" size="sm">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="meetings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Meetings</CardTitle>
                  <CardDescription>Join our book discussions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookClub.meetings.map((meeting) => (
                      <Card key={meeting.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{meeting.title}</h3>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground mt-1">
                                <div>
                                  <p>
                                    {new Date(meeting.date).toLocaleDateString()} at{" "}
                                    {new Date(meeting.date).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                  <p>{meeting.location}</p>
                                </div>
                                <div className="flex items-center mt-2 sm:mt-0">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span>{meeting.attendees} attending</span>
                                </div>
                              </div>
                              <div className="mt-4 flex gap-2">
                                <Button size="sm">RSVP</Button>
                                <Button variant="outline" size="sm">
                                  Add to Calendar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Suggest a Meeting
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="books" className="mt-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Previous Books</CardTitle>
                    <CardDescription>Books we've read together</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {bookClub.previousBooks.map((book, index) => (
                        <div key={index} className="flex gap-4 items-start">
                          <img
                            src={book.cover || "/placeholder.svg"}
                            alt={book.title}
                            className="h-[100px] w-[70px] object-cover rounded-md"
                          />
                          <div>
                            <h3 className="font-medium">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">by {book.author}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Completed: {new Date(book.completedDate).toLocaleDateString()}
                            </p>
                            <Button variant="ghost" size="sm" className="mt-2">
                              View Discussions
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Books</CardTitle>
                    <CardDescription>What we're reading next</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {bookClub.upcomingBooks.map((book, index) => (
                        <div key={index} className="flex gap-4 items-start">
                          <img
                            src={book.cover || "/placeholder.svg"}
                            alt={book.title}
                            className="h-[100px] w-[70px] object-cover rounded-md"
                          />
                          <div>
                            <h3 className="font-medium">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">by {book.author}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Starting: {new Date(book.startDate).toLocaleDateString()}
                            </p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Add to Reading List
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Suggest a Book
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default BookClubDetails

