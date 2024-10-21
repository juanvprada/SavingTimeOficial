import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import Home from "../pages/Home.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import Blog from "../pages/Blog.jsx";
import GetInTouch from "../pages/GetInTouch.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import RecoverPassword from "../pages/RecoverPassword.jsx";
import { Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                element: <Navigate to="/registro" />, 
            },
            {
                index: true,
                element: <Home />,
            },
            {
                path: "sobre-nosotros",
                element: <AboutUs />,
            },
            {
                path: "blog",
                element: <Blog />,
            },
            {
                path: "contacto",
                element: <GetInTouch />,
            },
            {
                path: "registro",
                element: <Register />,
            },
            {
                path: "acceso",
                element: <Login />,
            },
            {
                path: "recuperar-password",
                element: <RecoverPassword />,
              }
        ]
    }
]);
