import { lazy } from "react"

const Layout = lazy(() => import('../view/Layou'))

const Router = [
    {
        path:'/after',
        element: <Layout />,
        // children:[
        //     {
        //         path:'home',
        //         element:Home
        //     }
        // ]
    },
]

export default Router