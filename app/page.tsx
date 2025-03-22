"use client"
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Login from "@/components/auth/login"
import Register from "@/components/auth/register"
import Dashboard from "@/components/dashboard/dashboard"
import BookDetails from "@/components/books/book-details"
import ReadingList from "@/components/reading/reading-list"
import ReadingProgress from "@/components/reading/reading-progress"
import BookClubs from "@/components/community/book-clubs"
import BookClubDetails from "@/components/community/book-club-details"
import Challenges from "@/components/challenges/challenges"
import BookDiscovery from "@/components/discovery/book-discovery"
import Profile from "@/components/profile/profile"
import ReadingGoals from "@/components/goals/reading-goals"
import { AuthProvider } from "@/context/auth-context"
//import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoute from "@/components/auth/protected-route"

export default function App() {
  return (
    //<ThemeProvider defaultTheme="system" storageKey="bookshelf-theme">
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/books/:bookId"
                  element={
                    <ProtectedRoute>
                      <BookDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reading-list"
                  element={
                    <ProtectedRoute>
                      <ReadingList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reading-progress"
                  element={
                    <ProtectedRoute>
                      <ReadingProgress />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/book-clubs"
                  element={
                    <ProtectedRoute>
                      <BookClubs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/book-clubs/:clubId"
                  element={
                    <ProtectedRoute>
                      <BookClubDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/challenges"
                  element={
                    <ProtectedRoute>
                      <Challenges />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/discover"
                  element={
                    <ProtectedRoute>
                      <BookDiscovery />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile/:userId"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/goals"
                  element={
                    <ProtectedRoute>
                      <ReadingGoals />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
  //  </ThemeProvider>
  )
}

