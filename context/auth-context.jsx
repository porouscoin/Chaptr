"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (token && user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])
  const login = async (email, password) => {
    setError("");  // Reset previous errors before login attempt
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.message || "Login failed");  // Set error before throwing
        throw new Error(data.message || "Login failed");
      }
  
      // Dummy user data since backend doesn't return user info
      const userData = { name: "Test User", email };
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setCurrentUser(userData);
    } catch (err) {
      console.error(err);
      throw err;  // Ensure error is still thrown
    }
  };
  
  

  const register = async (name, email, password) => {
    try {
      setError("")
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify({ name, email }))
      setCurrentUser({ name, email })
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    error,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
