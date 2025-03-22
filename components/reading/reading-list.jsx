"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, CheckCircle, Clock, Plus, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const ReadingList = () => {
  const [books, setBooks] = useState({
    currentlyReading: [],
    wantToRead: [],
    completed: [],
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // This would be API calls to your backend
    // For now, we'll use mock data
    setBooks({
      currentlyReading: [
        {
          id: "1",
          title: "The Midnight Library",
          author: "Matt Haig",
          cover: "/placeholder.svg?height=150&width=100",
          progress: 35,
          startedDate: "2023-05-15",
        },
        {
          id: "2",
          title: "Project Hail Mary",
          author: "Andy Weir",
          cover: "/placeholder.svg?height=150&width=100",
          progress: 68,
          startedDate: "2023-06-02",
        },
        {
          id: "3",
          title: "Atomic Habits",
          author: "James Clear",
          cover: "/placeholder.svg?height=150&width=100",
          progress: 12,
          startedDate: "2023-06-10",
        },
      ],
      wantToRead: [
        {
          id: "4",
          title: "The Song of Achilles",
          author: "Madeline Miller",
          cover: "/placeholder.svg?height=150&width=100",
          addedDate: "2023-05-20",
        },
        {
          id: "5",
          title: "The Invisible Life of Addie LaRue",
          author: "V.E. Schwab",
          cover: "/placeholder.svg?height=150&width=100",
          addedDate: "2023-05-25",
        },
      ],
      completed: [
        {
          id: "6",
          title: "Dune",
          author: "Frank Herbert",
          cover: "/placeholder.svg?height=150&width=100",
          completedDate: "2023-04-10",
          rating: 5,
        },
        {
          id: "7",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          cover: "/placeholder.svg?height=150&width=100",
          completedDate: "2023-03-22",
          rating: 4,
        },
      ],
    })
  }, [])

  const removeFromList = (listName, bookId) => {
    setBooks((prevBooks) => ({
      ...prevBooks,
      [listName]: prevBooks[listName].filter((book) => book.id !== bookId),
    }))
  }

  const moveBook = (fromList, toList, bookId) => {
    const book = books[fromList].find((book) => book.id === bookId)
    if (book) {
      // Remove from current list
      const updatedFromList = books[fromList].filter((b) => b.id !== bookId)

      // Add to new list with any necessary modifications
      const updatedBook = { ...book }
      if (toList === "completed") {
        updatedBook.completedDate = new Date().toISOString().split("T")[0]
        updatedBook.rating = 0
      } else if (toList === "currentlyReading") {
        updatedBook.progress = 0
        updatedBook.startedDate = new Date().toISOString().split("T")[0]
      }

      setBooks((prevBooks) => ({
        ...prevBooks,
        [fromList]: updatedFromList,
        [toList]: [...prevBooks[toList], updatedBook],
      }))
    }
  }

  const filteredBooks = {
    currentlyReading: books.currentlyReading.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    wantToRead: books.wantToRead.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    completed: books.completed.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">My Books</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your books..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Book
          </Button>
        </div>
      </div>

      <Tabs defaultValue="currentlyReading" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="currentlyReading" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Currently Reading</span>
            <span className="sm:hidden">Reading</span>
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
              {books.currentlyReading.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="wantToRead" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Want to Read</span>
            <span className="sm:hidden">Want</span>
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
              {books.wantToRead.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Completed</span>
            <span className="sm:hidden">Done</span>
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
              {books.completed.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="currentlyReading" className="mt-6">
          {filteredBooks.currentlyReading.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You're not currently reading any books that match your search.</p>
                {searchQuery ? (
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                ) : (
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Add a Book
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.currentlyReading.map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex h-full">
                      <img
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        className="h-[200px] w-[130px] object-cover"
                      />
                      <div className="flex flex-col justify-between p-4 flex-1">
                        <div>
                          <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{book.progress}%</span>
                            </div>
                            <Progress value={book.progress} className="h-1" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/books/${book.id}`}>Details</Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => moveBook("currentlyReading", "completed", book.id)}>
                                Mark as completed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => moveBook("currentlyReading", "wantToRead", book.id)}>
                                Move to want to read
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => removeFromList("currentlyReading", book.id)}>
                                Remove from list
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="wantToRead" className="mt-6">
          {filteredBooks.wantToRead.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  You don't have any books in your "Want to Read" list that match your search.
                </p>
                {searchQuery ? (
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                ) : (
                  <Button className="mt-4" asChild>
                    <Link to="/discover">Discover Books</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.wantToRead.map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex h-full">
                      <img
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        className="h-[200px] w-[130px] object-cover"
                      />
                      <div className="flex flex-col justify-between p-4 flex-1">
                        <div>
                          <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Added on {new Date(book.addedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveBook("wantToRead", "currentlyReading", book.id)}
                          >
                            Start Reading
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => moveBook("wantToRead", "currentlyReading", book.id)}>
                                Start reading
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => removeFromList("wantToRead", book.id)}>
                                Remove from list
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {filteredBooks.completed.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You haven't completed any books that match your search yet.</p>
                {searchQuery ? (
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                ) : (
                  <Button className="mt-4" asChild>
                    <Link to="/reading-list?tab=currentlyReading">View Currently Reading</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.completed.map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex h-full">
                      <img
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        className="h-[200px] w-[130px] object-cover"
                      />
                      <div className="flex flex-col justify-between p-4 flex-1">
                        <div>
                          <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                          <div className="mt-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${i < book.rating ? "text-yellow-400" : "text-gray-300"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Completed on {new Date(book.completedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/books/${book.id}`}>Details</Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => moveBook("completed", "currentlyReading", book.id)}>
                                Read again
                              </DropdownMenuItem>
                              <DropdownMenuItem>Write a review</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => removeFromList("completed", book.id)}>
                                Remove from list
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ReadingList

