import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import App from "./App.jsx";
import {
  Dashboard,
  ErrorPage,
  Home,
  Login,
  UserProfile,
  AlbumProfile,
  PhotoProfile,
} from "./pages/index.js";
import { useAuthContext } from "./hooks/authHooks/useAuthContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ProfileContextProvider } from "./context/ProfileContext.jsx";

import "./index.css";

export const ProtectedRoute = ({ children }) => {
  const { owner, token, loading } = useAuthContext();

  // Show a loading indicator while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // If owner or token doesn't exist, redirect to login page
  if (!owner || !token) {
    return <Navigate to="/auth/login" />;
  }

  // If owner and token exist, render the children (dashboard, etc.)
  return children;
};

// routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "/auth/login", element: <Login /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/albums",
        element: (
          <ProtectedRoute>
            <AlbumProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/photos",
        element: (
          <ProtectedRoute>
            <PhotoProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// handle routing
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ProfileContextProvider>
        <RouterProvider router={router} />
      </ProfileContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
