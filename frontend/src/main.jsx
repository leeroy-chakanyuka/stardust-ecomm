import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ProductList from "./pages/product-list/ProductList.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* will likely use the new data loading feature to grab all products at : */
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/shop",
    element: <ProductList />,
  },
  {
    /* one single link for all of them, will design productList */
    path: "/shop/:category",
    element: <ProductList />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={browserRouter} />
  </StrictMode>,
);
