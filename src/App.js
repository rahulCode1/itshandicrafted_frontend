import './App.css';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import EcommerceProvider from './context/EcommerceContext';
import AddProducts from './features/product/AddProducts';
import AddAddress from './features/address/AddAddress';
import Checkout from './pages/order/Checkout';
import NotFound from "./components/NotFound"
import ErrorPage from './pages/ErrorPage';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import LoginWithOtp from './features/user/LoginWithOtp';

const Products = lazy(() => import("./features/product/Products"))
const ProductDetails = lazy(() => import("./features/product/ProductDetails"))
const UpdateAddress = lazy(() => import("./features/address/UpdateAddress"))
const Cart = lazy(() => import("./features/cart/Cart"))
const Wishlist = lazy(() => import("./features/wishlist/Wishlist"))
const UserOrdersPage = lazy(() => import("./pages/order/UserOrdersPage"))
const UserProfile = lazy(() => import("./pages/user/UserProfile"))
const OrderDetailsPage = lazy(() => import('./pages/order/OrderDetailsPage'))
const AllAddress = lazy(() => import("./features/address/AllAddress"))

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "products",
          children: [
            {
              index: true,
              element: <Suspense fallback={<Loading />}><Products /></Suspense>,
              loader: () => import("./features/product/Products").then(module => module.loader())
            },
            {
              path: "add",
              element: <AddProducts />
            },
            {
              path: ":id",
              element: <Suspense fallback={<Loading />}><ProductDetails /></Suspense>,
              loader: (meta) => import("./features/product/ProductDetails").then(module => module.loader(meta))
            },
          ],

        },


        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "wishlist",
          element: <Wishlist />
        },
        {
          path: "address",
          children: [
            {
              index: true,
              element: <AllAddress />
            }
            ,
            {
              path: "addAddress",
              element: <AddAddress />
            },
            {
              path: ":id",
              element: <Suspense
                fallback={<Loading />}><UpdateAddress /></Suspense>,
              loader: (meta) =>
                import("./features/address/UpdateAddress").then(module => module.loader(meta))
            },
          ],
        },

        {
          path: "checkout",
          element: <Checkout />
        },
        {
          path: "orders",
          children: [
            {
              index: true,
              element: <Suspense fallback={<Loading />}> <UserOrdersPage /> </Suspense>,
              loader: () =>
                import("./pages/order/UserOrdersPage").then(module => module.loader())
            },
            {
              path: ":id",
              element: <Suspense fallback={<Loading />}><OrderDetailsPage /> </Suspense>,
              loader: (meta) =>
                import("./pages/order/OrderDetailsPage").then(module => module.loader(meta))
            }
          ],
        },
        {
          path: "user",
          element: <UserProfile />
        },
        {
          path: "login",
          element: <LoginWithOtp/>
        },

        { path: "*", element: <NotFound /> },
      ]
    }
  ])

  return (<EcommerceProvider>

    <RouterProvider router={router} />
  </EcommerceProvider>
  );
}

export default App;
