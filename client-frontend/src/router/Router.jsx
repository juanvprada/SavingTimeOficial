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
import UnderConstruction from "../pages/UnderConstruction.jsx";
import EditPost from "../pages/EditPost.jsx"; 
import PostDetail from "../pages/PostDetail.jsx"; 
import Profile from "../pages/Profile.jsx";
import AdminPage from "../pages/AdminPage.jsx"; 

const userEmail = 'admin@gmail.com';

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
                path: "nosotros",
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
                path: "construccion",
                element: <UnderConstruction />,
            },
            {
                path: "recuperar-password",
                element: <RecoverPassword />,
            },
            {
                path: "editar/:id", 
                element: <EditPost />, 
            },
            {
                path: "post/:id", 
                element: <PostDetail />, 
            },
            {
                path: "perfil", 
                element: <Profile />, 
            },
            {
                path: "admin",
                element: userEmail === 'admin@gmail.com' ? <AdminPage /> : <Navigate to="/" />
            },
        ]
    }
]);


