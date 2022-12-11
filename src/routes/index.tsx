import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Checkout from "../pages/Checkout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: '/:category/:productId',
        element: <Product />
    },
    {
        path: '/checkout',
        element: <Checkout />
    }
]);

export default router;