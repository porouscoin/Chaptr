"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/auth-context"

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

