import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import App from "./App.jsx";
import { Dashboard, ErrorPage, Home, Login } from "./pages/index.js";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { useAuthContext } from "./hooks/useAuthContext";

import "./index.css";

export const ProtectedRoute = ({ children }) => {
  const { user, token, loading } = useAuthContext();

  // Show a loading indicator while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user or token doesn't exist, redirect to login page
  if (!user || !token) {
    return <Navigate to="/auth/login" />;
  }

  // If user and token exist, render the children (dashboard, etc.)
  return children;
};

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
    ],
  },
]);

// handle routing
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
