import ForgotPassword from "@/components/ForgotPassword";
import { UserProvider } from "@/contexts/UserProvider";
import Lessons from "@/pages/Lessons"
import Layout from "@/layouts/Layout";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Notifications from "@/pages/Notifications";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import Settings from "@/pages/Settings";
import Stories from "@/pages/Stories";
import Story from "@/pages/Story";
import { createBrowserRouter } from "react-router-dom";
import UnderConstruction from "@/pages/UnderConstruction";
import LessonDetailCard from "@/components/LessonDetailCard";
import HtmlStaticPage from "@/static/HtmlStaticPage";
import JavascriptStaticPage from "@/static/JavascriptStaticPage";
import ReactStaticPage from "@/static/ReactStaticPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <UserProvider>
            <Layout />
        </UserProvider>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/stories',
                element: <Stories />,
            },
            {
                path: '/stories/:id',
                element: <Story />
            },
            {
                path: '/lessons',
                element: <Lessons />
            },
            {
                path: '/lessons/:id',
                element: <LessonDetailCard />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/notifications',
                element: <Notifications />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: "/under-construction",
                element: <UnderConstruction />
            },
            //static pages
            {
                path: '/html-css',
                element: <HtmlStaticPage />
            },
            {
                path: '/js',
                element: <JavascriptStaticPage />
            },
            {
                path: '/react',
                element: <ReactStaticPage />
            }
        ],
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    }
])