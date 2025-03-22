"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Bookmark, Star, Filter, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const BookDiscovery = () => {
  const [books, setBooks] = useState({
    trending: [],
    newReleases: [],
    recommended: [],
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // This would be API calls to your backend
    // For now, we'll use mock data
    setBooks({
      trending: [
        {
          id: "1",
          title: "The Midnight Library",
          author: "Matt Haig",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.2,
          genres: ["Fiction", "Fantasy", "Contemporary"],
          publishedDate: "2020-08-13",
        },
        {
          id: "2",
          title: "Project Hail Mary",
          author: "Andy Weir",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.5,
          genres: ["Science Fiction", "Space", "Adventure"],
          publishedDate: "2021-05-04",
        },
        {
          id: "3",
          title: "The Song of Achilles",
          author: "Madeline Miller",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.3,
          genres: ["Historical Fiction", "Fantasy", "LGBT"],
          publishedDate: "2012-03-06",
        },
        {
          id: "4",
          title: "Atomic Habits",
          author: "James Clear",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.4,
          genres: ["Self-Help", "Psychology", "Productivity"],
          publishedDate: "2018-10-16",
        },
        {
          id: "5",
          title: "The Invisible Life of Addie LaRue",
          author: "V.E. Schwab",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.2,
          genres: ["Fantasy", "Historical Fiction", "Romance"],
          publishedDate: "2020-10-06",
        },
        {
          id: "6",
          title: "Klara and the Sun",
          author: "Kazuo Ishiguro",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 3.9,
          genres: ["Science Fiction", "Literary Fiction"],
          publishedDate: "2021-03-02",
        },
      ],
      newReleases: [
        {
          id: "7",
          title: "Tomorrow, and Tomorrow, and Tomorrow",
          author: "Gabrielle Zevin",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.3,
          genres: ["Fiction", "Contemporary"],
          publishedDate: "2022-07-05",
        },
        {
          id: "8",
          title: "Sea of Tranquility",
          author: "Emily St. John Mandel",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.1,
          genres: ["Science Fiction", "Literary Fiction"],
          publishedDate: "2022-04-05",
        },
        {
          id: "9",
          title: "Book Lovers",
          author: "Emily Henry",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.2,
          genres: ["Romance", "Contemporary", "Fiction"],
          publishedDate: "2022-05-03",
        },
        {
          id: "10",
          title: "The Maid",
          author: "Nita Prose",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 3.9,
          genres: ["Mystery", "Fiction", "Thriller"],
          publishedDate: "2022-01-04",
        },
        {
          id: "11",
          title: "Lessons in Chemistry",
          author: "Bonnie Garmus",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.4,
          genres: ["Historical Fiction", "Fiction"],
          publishedDate: "2022-04-05",
        },
        {
          id: "12",
          title: "The Paris Apartment",
          author: "Lucy Foley",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 3.8,
          genres: ["Mystery", "Thriller", "Fiction"],
          publishedDate: "2022-02-22",
        },
      ],
      recommended: [
        {
          id: "13",
          title: "The Seven Husbands of Evelyn Hugo",
          author: "Taylor Jenkins Reid",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.4,
          genres: ["Historical Fiction", "Romance", "LGBT"],
          publishedDate: "2017-06-13",
        },
        {
          id: "14",
          title: "Circe",
          author: "Madeline Miller",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.3,
          genres: ["Fantasy", "Mythology", "Historical Fiction"],
          publishedDate: "2018-04-10",
        },
        {
          id: "15",
          title: "The House in the Cerulean Sea",
          author: "TJ Klune",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.5,
          genres: ["Fantasy", "LGBT", "Fiction"],
          publishedDate: "2020-03-17",
        },
        {
          id: "16",
          title: "A Little Life",
          author: "Hanya Yanagihara",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.3,
          genres: ["Fiction", "Contemporary", "LGBT"],
          publishedDate: "2015-03-10",
        },
        {
          id: "17",
          title: "Normal People",
          author: "Sally Rooney",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 3.9,
          genres: ["Fiction", "Contemporary", "Romance"],
          publishedDate: "2018-08-28",
        },
        {
          id: "18",
          title: "The Night Circus",
          author: "Erin Morgenstern",
          cover: "/placeholder.svg?height=200&width=130",
          rating: 4.0,
          genres: ["Fantasy", "Romance", "Historical Fiction"],
          publishedDate: "2011-09-13",
        },
      ],
    })
  }, [])

  const filterBooks = (bookList) => {
    if (!searchQuery) return bookList

    return bookList.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Discover Books</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Genre</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Fiction</DropdownMenuItem>
              <DropdownMenuItem>Science Fiction</DropdownMenuItem>
              <DropdownMenuItem>Fantasy</DropdownMenuItem>
              <DropdownMenuItem>Mystery</DropdownMenuItem>
              <DropdownMenuItem>Romance</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Rating</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>4+ Stars</DropdownMenuItem>
              <DropdownMenuItem>3+ Stars</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="newReleases">New Releases</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filterBooks(books.trending).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="newReleases" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filterBooks(books.newReleases).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filterBooks(books.recommended).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const BookCard = ({ book }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex h-full">
          <img src={book.cover || "/placeholder.svg"} alt={book.title} className="h-[200px] w-[130px] object-cover" />
          <div className="flex flex-col justify-between p-4 flex-1">
            <div>
              <h3 className="font-semibold line-clamp-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>

              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(book.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                  />
                ))}
                <span className="ml-2 text-sm">{book.rating}</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {book.genres.slice(0, 2).map((genre, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {genre}
                  </Badge>
                ))}
                {book.genres.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{book.genres.length - 2}
                  </Badge>
                )}
              </div>

              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(book.publishedDate).toLocaleDateString()}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/books/${book.id}`}>Details</Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-4 w-4" />
                <span className="sr-only">Add to reading list</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookDiscovery

