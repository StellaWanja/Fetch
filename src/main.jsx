import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import { ErrorPage, Home } from "./pages/index.js";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {path: "", element: <Home /> }
    ]
  },
]);

// handle routing
createRoot(document.getElementById("root")).render(
  <StrictMode>
<RouterProvider router={router} />
  </StrictMode>
);
