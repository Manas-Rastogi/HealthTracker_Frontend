import React from "react";
import { Navigate } from "react-router-dom";

/*
  role prop expects one of: "USER", "NGO", "HOSPITAL"
  (we'll store roles in localStorage exactly like these strings)
*/
export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // No token -> redirect to login
  if (!token) {
    return <Navigate to="/user/login" replace />;
  }

  // Role mismatch -> redirect to home
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
