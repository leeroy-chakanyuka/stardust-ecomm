import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Shop from "./pages/shop/Shop.jsx";
import ProductList from "./pages/product-list/ProductList.jsx";
import Product from "./pages/product/Product.jsx";
import { productLoader } from "./pages/product/productLoader.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/:category",
    element: <ProductList />,
  },
  {
    path: "/product/:id",
    element: <Product />,
    loader: productLoader,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={browserRouter} />
  </StrictMode>,
);
