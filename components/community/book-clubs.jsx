"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Plus } from "lucide-react"

const BookClubs = () => {
  const [bookClubs, setBookClubs] = useState({
    myClubs: [],
    popular: [],
    new: [],
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // This would be API calls to your backend
    // For now, we'll use mock data
    setBookClubs({
      myClubs: [
        {
          id: "1",
          name: "Sci-Fi Lovers",
          description: "A club for science fiction enthusiasts",
          members: 24,
          currentBook: "Project Hail Mary",
          currentBookAuthor: "Andy Weir",
          coverImage: "/placeholder.svg?height=100&width=70",
          genres: ["Science Fiction", "Space"],
          meetingSchedule: "Every Thursday",
        },
        {
          id: "2",
          name: "Mystery Book Club",
          description: "Unraveling mysteries one book at a time",
          members: 18,
          currentBook: "The Silent Patient",
          currentBookAuthor: "Alex Michaelides",
          coverImage: "/placeholder.svg?height=100&width=70",
          genres: ["Mystery", "Thriller"],
          meetingSchedule: "Every other Tuesday",
        },
      ],
      popular: [
        {
          id: "3",
          name: "Classic Literature",
          description: "Discussing timeless literary works",
          members: 42,
          currentBook: "Pride and Prejudice",
          currentBookAuthor: "Jane Austen",
          coverImage: "/placeholder.svg?height=100&width=70",
          genres: ["Classics", "Literature"],
          meetingSchedule: "Monthly",
        },
        {
          id: "4",
          name: "Fantasy Worlds",
          description: "Exploring magical realms and epic adventures",
          members: 36,
          currentBook: "The Name of the Wind",
          currentBookAuthor: "Patrick Rothfuss",
          coverImage: "/placeholder.svg?height=100&width=70",
          genres: ["Fantasy", "Adventure"],
          meetingSchedule: "Every Sunday",
        },
        {
          id: "5",
          name: "Non-Fiction Explorers",
          description: "Learning about our world through non-fiction",
          members: 29,
          currentBook: "Sapiens",
          currentBookAuthor: "Yuval Noah Harari",
          coverImage: "/placeholder.svg?height=100&width=70",
          genres: ["Non-Fiction", "History", "Science"],
          meetingSchedule: "First Monday of the month",
        },
      ],
      new: [
        {
          id: "6",
          name: "Contemporary Fiction",
          description: "Discussing modern literary works",
          members: 12,
          currentBook: "Normal People",
          currentBookAuthor: "Sally Rooney",
          coverImage: "/placeholder.svg?height=100&width=70",
          genres: ["Contemporary", "Fiction"],
          meetingSchedule: "Every other Wednesday",
        },
        {
          id: "7",
          name: "Historical Fiction",
          description: "Traveling through time with historical fiction",
          members: 8,
          currentBook: "The Nightingale",
          currentBookAuthor: "Kristin Hannah",
          coverImage: "/placeholder.svg?height=100&width=70",
          genres: ["Historical", "Fiction", "War"],
          meetingSchedule: "Every Friday",
        },
        {
          id: "8",
          name: "Poetry Circle",
          description: "Appreciating the beauty of poetry",
          members: 10,
          currentBook: "Milk and Honey",
          currentBookAuthor: "Rupi Kaur",
          coverImage: "/placeholder.svg?height=100&width=70",
          genres: ["Poetry", "Contemporary"],
          meetingSchedule: "Twice a month",
        },
      ],
    })
  }, [])

  const filterBookClubs = (clubs) => {
    if (!searchQuery) return clubs

    return clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.currentBook.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Book Clubs</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search book clubs..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Club
          </Button>
        </div>
      </div>

      <Tabs defaultValue="myClubs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="myClubs" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>My Clubs</span>
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
              {bookClubs.myClubs.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>

        <TabsContent value="myClubs" className="mt-6">
          {filterBookClubs(bookClubs.myClubs).length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "No book clubs match your search." : "You haven't joined any book clubs yet."}
                </p>
                {searchQuery ? (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                ) : (
                  <Button asChild>
                    <Link to="/book-clubs?tab=popular">Discover Book Clubs</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filterBookClubs(bookClubs.myClubs).map((club) => (
                <BookClubCard key={club.id} club={club} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filterBookClubs(bookClubs.popular).map((club) => (
              <BookClubCard key={club.id} club={club} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filterBookClubs(bookClubs.new).map((club) => (
              <BookClubCard key={club.id} club={club} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const BookClubCard = ({ club }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{club.name}</CardTitle>
        <CardDescription>{club.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <img
            src={club.coverImage || "/placeholder.svg"}
            alt={club.currentBook}
            className="h-[100px] w-[70px] object-cover rounded-md"
          />
          <div>
            <h3 className="font-medium">Currently Reading</h3>
            <p className="text-sm">{club.currentBook}</p>
            <p className="text-xs text-muted-foreground">by {club.currentBookAuthor}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {club.genres.map((genre, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{club.members} members</span>
          </div>
          <div>
            <span className="text-muted-foreground">{club.meetingSchedule}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link to={`/book-clubs/${club.id}`}>View Club</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BookClubs

