"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Calendar, Users, MessageSquare, Bookmark, Share2, Star, Plus, ChevronLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const BookDetails = () => {
  const { bookId } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [readingProgress, setReadingProgress] = useState(0)
  const [newProgressValue, setNewProgressValue] = useState("")
  const [newReview, setNewReview] = useState("")

  useEffect(() => {
    // This would be an API call to your backend
    // For now, we'll use mock data
    setTimeout(() => {
      setBook({
        id: bookId,
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "/placeholder.svg?height=300&width=200",
        description:
          "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
        genre: ["Fiction", "Fantasy", "Contemporary"],
        publishedDate: "2020-08-13",
        pages: 304,
        progress: 35,
        status: "currentlyReading",
        rating: 4.2,
        reviews: [
          {
            id: "1",
            user: {
              id: "101",
              name: "Jane Smith",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            rating: 5,
            date: "2023-05-10",
            content:
              "This book completely changed my perspective on life. The concept is brilliant and the execution is flawless. Highly recommend to anyone who's ever wondered 'what if'.",
          },
          {
            id: "2",
            user: {
              id: "102",
              name: "Michael Johnson",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            rating: 4,
            date: "2023-04-22",
            content:
              "A beautiful exploration of regret and second chances. The writing is elegant and the story is both heartbreaking and uplifting.",
          },
        ],
        bookmarks: [
          { page: 42, note: "Beautiful quote about regrets" },
          { page: 78, note: "Important character development" },
        ],
        readingClubs: [{ id: "1", name: "Fiction Fanatics", members: 24 }],
      })
      setReadingProgress(35)
      setLoading(false)
    }, 1000)
  }, [bookId])

  const handleProgressUpdate = (e) => {
    e.preventDefault()
    const newProgress = Number.parseInt(newProgressValue)
    if (newProgress >= 0 && newProgress <= 100) {
      setReadingProgress(newProgress)
      setBook((prev) => ({ ...prev, progress: newProgress }))
      setNewProgressValue("")
    }
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (newReview.trim()) {
      const newReviewObj = {
        id: Date.now().toString(),
        user: {
          id: "current-user",
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        rating: 5, // Default rating
        date: new Date().toISOString().split("T")[0],
        content: newReview,
      }

      setBook((prev) => ({
        ...prev,
        reviews: [newReviewObj, ...prev.reviews],
      }))

      setNewReview("")
    }
  }

  if (loading) {
    return (
      <div className="container py-6 flex items-center justify-center min-h-[50vh]">
        <p>Loading book details...</p>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Book not found</h1>
        <Button asChild>
          <Link to="/reading-list">Back to My Books</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <Button variant="ghost" className="mb-4" asChild>
        <Link to="/reading-list">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to My Books
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="flex flex-col items-center">
              <img
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                className="rounded-md shadow-md w-[200px] h-[300px] object-cover mb-4"
              />

              {book.status === "currentlyReading" && (
                <div className="w-full space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Reading Progress</span>
                    <span>{book.progress}%</span>
                  </div>
                  <Progress value={book.progress} className="h-2" />

                  <form onSubmit={handleProgressUpdate} className="flex gap-2 mt-4">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Update progress"
                      value={newProgressValue}
                      onChange={(e) => setNewProgressValue(e.target.value)}
                      className="w-full"
                    />
                    <Button type="submit" size="sm">
                      Update
                    </Button>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 w-full">
                <Button variant="outline" className="w-full">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Bookmark
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {book.genre.map((genre, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {book.publishedDate}
              </div>
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                {book.pages} pages
              </div>
              <div className="flex items-center">
                <Star className="mr-2 h-4 w-4 text-yellow-400" />
                {book.rating} rating
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{book.description}</p>
            </div>
          </div>

          <Tabs defaultValue="reviews" className="w-full">
            <TabsList>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="bookmarks" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Bookmarks
              </TabsTrigger>
              <TabsTrigger value="clubs" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Book Clubs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                  <CardDescription>Share your thoughts about this book</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="rating">Rating</Label>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-6 w-6 text-yellow-400 cursor-pointer" fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="review">Your Review</Label>
                        <Textarea
                          id="review"
                          placeholder="What did you think about this book?"
                          value={newReview}
                          onChange={(e) => setNewReview(e.target.value)}
                        />
                      </div>
                      <Button type="submit">Submit Review</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {book.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{review.user.name}</p>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                    fill="currentColor"
                                  />
                                ))}
                                <span className="ml-2 text-xs text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{review.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bookmarks" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Bookmarks</CardTitle>
                  <CardDescription>Save important pages and notes</CardDescription>
                </CardHeader>
                <CardContent>
                  {book.bookmarks.length > 0 ? (
                    <div className="space-y-4">
                      {book.bookmarks.map((bookmark, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 border rounded-md">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Bookmark className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Page {bookmark.page}</p>
                            <p className="text-sm text-muted-foreground">{bookmark.note}</p>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Add Bookmark
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">You haven't added any bookmarks yet.</p>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Your First Bookmark
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clubs" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book Clubs Reading This Book</CardTitle>
                  <CardDescription>Join discussions with other readers</CardDescription>
                </CardHeader>
                <CardContent>
                  {book.readingClubs.length > 0 ? (
                    <div className="space-y-4">
                      {book.readingClubs.map((club) => (
                        <div key={club.id} className="flex items-start gap-4 p-4 border rounded-md">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{club.name}</p>
                              <span className="text-xs text-muted-foreground">{club.members} members</span>
                            </div>
                            <Button variant="outline" size="sm" className="mt-2" asChild>
                              <Link to={`/book-clubs/${club.id}`}>View Club</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/book-clubs">Find More Book Clubs</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">No book clubs are currently reading this book.</p>
                      <Button asChild>
                        <Link to="/book-clubs">Browse Book Clubs</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default BookDetails

