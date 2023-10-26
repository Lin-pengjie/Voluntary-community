import { lazy } from "react"
import { Navigate } from "react-router-dom"

const Layout = lazy(() => import('../views/Home'))
const Home = lazy(() => import('../views/subs/Main'))
const Not = lazy(() => import('../views/Not'))
const ApplyFor = lazy(() => import('../views/subs/ApplyFor'))
const Message = lazy(() => import('../views/Message'))

const Router = [
    {
        path: '/',
        element: <Layout />,
        key: 'layout',
        children: [
            {
                path: 'home',
                element: <Home />,
                key: 'home'
            },
            {
                path:'applyfor',
                element:<ApplyFor />,
                key:'applyfor'
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
        path:"/message",
        element:<Message />,
        key:"message"
    },
    {
        path: '/404',
        element: <Not />,
        key: '404'
    },
    {
        path: '*',
        element: <Navigate to="/404" />,
        key: '404'
    },
]

export default Router;