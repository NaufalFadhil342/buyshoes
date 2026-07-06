import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy } from "react";

const MainApp = lazy(() => import("./Router/MainApp"));
const ProductDetail = lazy(() => import("./Components/ProductDetail"));
const Shoes = lazy(() => import("./Pages/Shoes"));
const Men = lazy(() => import("./Pages/Men"));
const Women = lazy(() => import("./Pages/Women"));

const createRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/:slug",
        element: <ProductDetail />,
      },
      {
        path: "/shoes",
        element: <Shoes />,
      },
      {
        path: "/men",
        element: <Men />,
      },
      {
        path: "/women",
        element: <Women />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={createRouter} />,
);
