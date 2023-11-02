import FRouter from '../Foreground/router/RouteConfig'
import BRouter from '../Backstage/router/RouterConfig'
import { lazy } from "react"

const Global = [...FRouter];
Global.push(...BRouter);

const Login = lazy(() => import('../views/Login'))
const SignIn = lazy(() => import('../views/SignIn'))

const Router = [
    {
        path:"/login",
        element:<Login />,
        key:"login"
    },
    {
        path: '/sign',
        element: <SignIn />,
        key: 'sign'
    },
]

Global.push(...Router)

export default Global