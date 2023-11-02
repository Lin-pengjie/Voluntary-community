import { lazy } from "react"

const Layout = lazy(() => import('../view/Layou'))

const Router = [
    {
        path:'/after',
        element: <Layout />,
        key:'after'
        // children:[
        //     {
        //         path:'home',
        //         element:Home
        //     }
        // ]
    },
]

export default Router