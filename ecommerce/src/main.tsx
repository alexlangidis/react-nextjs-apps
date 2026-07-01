import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./App.css";
import Auth from "./pages/Auth.tsx";
import Card from "./pages/Card.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <Auth /> },
      { path: "card", element: <Card /> },
      { path: "products/:id", element: <ProductDetails /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
