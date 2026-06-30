import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainApp from "./Router/MainApp.jsx";
import ProductDetail from "./Components/ProductDetail";

const createRouter = createBrowserRouter([
  {
    path: "/",
    Component: MainApp,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "/:slug",
        Component: ProductDetail,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={createRouter} />,
);
