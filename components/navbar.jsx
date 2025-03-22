"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpen, Search, Menu, X, User, LogOut, BookMarked, Users, Trophy, Compass, BarChart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">BookShelf</span>
          </Link>

          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-4">
            <nav className="flex items-center space-x-2">
              <Link to="/reading-list" className="text-sm font-medium transition-colors hover:text-primary">
                My Books
              </Link>
              <Link to="/book-clubs" className="text-sm font-medium transition-colors hover:text-primary">
                Book Clubs
              </Link>
              <Link to="/challenges" className="text-sm font-medium transition-colors hover:text-primary">
                Challenges
              </Link>
              <Link to="/discover" className="text-sm font-medium transition-colors hover:text-primary">
                Discover
              </Link>
            </nav>
          </div>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search books..." className="w-[200px] pl-8 md:w-[250px] lg:w-[300px]" />
          </div>

          <ThemeToggle />

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={currentUser.name} />
                    <AvatarFallback>{currentUser?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/profile/${currentUser.id}`)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/reading-list")}>
                  <BookMarked className="mr-2 h-4 w-4" />
                  <span>My Books</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/goals")}>
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>Reading Goals</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </div>

        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="ml-2" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
              <BookOpen className="h-6 w-6" />
              <span className="font-bold">BookShelf</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={closeMenu}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container grid gap-6 p-6">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search books..." className="w-full pl-8" />
            </div>

            <Link to="/reading-list" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
              <BookMarked className="h-5 w-5" />
              My Books
            </Link>
            <Link to="/book-clubs" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
              <Users className="h-5 w-5" />
              Book Clubs
            </Link>
            <Link to="/challenges" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
              <Trophy className="h-5 w-5" />
              Challenges
            </Link>
            <Link to="/discover" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
              <Compass className="h-5 w-5" />
              Discover
            </Link>

            {currentUser ? (
              <>
                <div className="border-t my-4"></div>
                <Link
                  to={`/profile/${currentUser.id}`}
                  className="flex items-center gap-2 text-lg font-medium"
                  onClick={closeMenu}
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <Link to="/goals" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
                  <BarChart className="h-5 w-5" />
                  Reading Goals
                </Link>
                <button
                  className="flex items-center gap-2 text-lg font-medium text-destructive"
                  onClick={() => {
                    handleLogout()
                    closeMenu()
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  Log out
                </button>
              </>
            ) : (
              <Button
                onClick={() => {
                  navigate("/login")
                  closeMenu()
                }}
                className="mt-4"
              >
                Login
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar

