import { lazy } from "react"
import { Navigate } from "react-router-dom"
import RouterAuth from "@/router/RouterAuth"

const Layout = lazy(() => import('../views/Home'))
const Home = lazy(() => import('../views/subs/Main'))
const ApplyFor = lazy(() => import('../views/subs/ApplyFor'))
const SignUp = lazy(() => import('../views/subs/SignUp'))
const Login = lazy(() => import('@/views/Login'))
const SignIn = lazy(() => import('@/views/SignIn'))
const Not = lazy(() => import('@/views/Not'))

const Router = [
    {
        path: '/',
        element: <RouterAuth><Layout /></RouterAuth>,
        key: 'layout',
        children: [
            {
                path: 'home',
                element: <Home />,
                key: 'home'
            },
            {
                path: 'applyfor',
                element: <ApplyFor />,
                key: 'applyfor'
            },
            {
                path: 'signup',
                element: <SignUp />,
                key: 'signup'
            },
            // 添加重定向路径配置
            {
                path: '/',
                element: <Navigate to="/home" />,
                key: 'redirect-home'
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
        key: "login"
    },
    {
        path: '/sign',
        element: <SignIn />,
        key: 'sign'
    },
    {
        path: '/404',
        element: <Not />,
        key: '404'
    },
    {
        path: '*',
        element: <Navigate to="/404" />,
        key: 'redirect-404'
    },
]

export default Router;