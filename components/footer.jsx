import { Link } from "react-router-dom"
import { BookOpen, Github, Twitter, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold">BookShelf</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your personal reading companion. Track, discover, and share your reading journey.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/reading-list" className="text-muted-foreground hover:text-foreground">
                  Reading List
                </Link>
              </li>
              <li>
                <Link to="/book-clubs" className="text-muted-foreground hover:text-foreground">
                  Book Clubs
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="text-muted-foreground hover:text-foreground">
                  Reading Challenges
                </Link>
              </li>
              <li>
                <Link to="/discover" className="text-muted-foreground hover:text-foreground">
                  Discover Books
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} BookShelf. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

