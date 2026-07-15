import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy } from "react";

const MainApp = lazy(() => import("./Router/MainApp"));
const ProductDetail = lazy(() => import("./Components/ProductDetail"));
const ProductListPage = lazy(() => import("./Pages/ProductListPage"));
const WishlistPage = lazy(() => import("./Pages/WishlistPage"));

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
        element: <ProductListPage title="Shoes" />,
      },
      {
        path: "/men",
        element: <ProductListPage gender="men" title="Men" />,
      },
      {
        path: "/women",
        element: <ProductListPage gender="women" title="Women" />,
      },
      {
        path: "/trending",
        element: <ProductListPage title="Trending" />,
      },
      {
        path: "/favorites",
        element: <WishlistPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={createRouter} />,
);
