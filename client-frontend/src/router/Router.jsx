import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import Home from "../pages/Home.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import Blog from "../pages/Blog.jsx";
import GetInTouch from "../pages/GetInTouch.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
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
        ]
    }
]);