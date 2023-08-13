import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Features from "../pages/Features";
import About from "../pages/About";
import User from "../pages/User";
import PrivateRoute from "./PrivateRoutes";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/features",
                element: <PrivateRoute><Features></Features></PrivateRoute>
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/user",
                element: <User />,
            },

        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    },
]);


export default router;