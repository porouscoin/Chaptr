"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Trophy, Search, Plus, Calendar, Users } from "lucide-react"

const Challenges = () => {
  const [challenges, setChallenges] = useState({
    myChallenges: [],
    popular: [],
    new: [],
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // This would be API calls to your backend
    // For now, we'll use mock data
    setChallenges({
      myChallenges: [
        {
          id: "1",
          title: "2023 Reading Challenge",
          description: "Read 20 books in 2023",
          progress: 12,
          goal: 20,
          deadline: "2023-12-31",
          participants: 1245,
          type: "yearly",
          categories: ["All Books"],
        },
        {
          id: "2",
          title: "Sci-Fi Explorer",
          description: "Read 5 science fiction books",
          progress: 3,
          goal: 5,
          deadline: "2023-08-31",
          participants: 342,
          type: "genre",
          categories: ["Science Fiction"],
        },
        {
          id: "3",
          title: "Summer Reading Sprint",
          description: "Read 5 books during summer",
          progress: 2,
          goal: 5,
          deadline: "2023-09-21",
          participants: 876,
          type: "seasonal",
          categories: ["All Books"],
        },
      ],
      popular: [
        {
          id: "4",
          title: "Classics Challenge",
          description: "Read 10 classic literature books",
          participants: 1876,
          type: "genre",
          categories: ["Classics"],
        },
        {
          id: "5",
          title: "Diverse Authors",
          description: "Read books by authors from 5 different countries",
          participants: 1543,
          type: "diversity",
          categories: ["International"],
        },
        {
          id: "6",
          title: "Non-Fiction November",
          description: "Read 4 non-fiction books in November",
          participants: 1245,
          type: "monthly",
          categories: ["Non-Fiction"],
        },
      ],
      new: [
        {
          id: "7",
          title: "Fantasy Quest",
          description: "Read 6 fantasy novels",
          participants: 342,
          type: "genre",
          categories: ["Fantasy"],
        },
        {
          id: "8",
          title: "Short Story Sprint",
          description: "Read 10 short stories in a month",
          participants: 256,
          type: "format",
          categories: ["Short Stories"],
        },
        {
          id: "9",
          title: "Award Winners",
          description: "Read 5 books that have won major literary awards",
          participants: 421,
          type: "awards",
          categories: ["Award Winners"],
        },
      ],
    })
  }, [])

  const filterChallenges = (challengeList) => {
    if (!searchQuery) return challengeList

    return challengeList.filter(
      (challenge) =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.categories.some((category) => category.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Reading Challenges</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search challenges..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Challenge
          </Button>
        </div>
      </div>

      <Tabs defaultValue="myChallenges" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="myChallenges" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span>My Challenges</span>
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
              {challenges.myChallenges.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>

        <TabsContent value="myChallenges" className="mt-6">
          {filterChallenges(challenges.myChallenges).length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "No challenges match your search." : "You haven't joined any reading challenges yet."}
                </p>
                {searchQuery ? (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                ) : (
                  <Button asChild>
                    <Link to="/challenges?tab=popular">Discover Challenges</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filterChallenges(challenges.myChallenges).map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} joined={true} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filterChallenges(challenges.popular).map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} joined={false} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filterChallenges(challenges.new).map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} joined={false} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const ChallengeCard = ({ challenge, joined }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{challenge.title}</CardTitle>
            <CardDescription>{challenge.description}</CardDescription>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {joined && (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                {challenge.progress}/{challenge.goal}
              </span>
            </div>
            <Progress value={(challenge.progress / challenge.goal) * 100} className="h-2" />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {challenge.categories.map((category, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-sm">
          {challenge.deadline && (
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Deadline: {new Date(challenge.deadline).toLocaleDateString()}</span>
            </div>
          )}
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{challenge.participants} participants</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {joined ? (
          <Button className="w-full" asChild>
            <Link to={`/challenges/${challenge.id}`}>View Progress</Link>
          </Button>
        ) : (
          <Button className="w-full">Join Challenge</Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default Challenges

