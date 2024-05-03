import { createBrowserRouter } from 'react-router-dom'
import { CreateForm } from './assets/views/CreateForm'
import { UpdateForm } from './assets/views/UpdateForm'
import { Layout } from './assets/components/LayoutComponent'
import { Home } from './assets/views/HomeScreen'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/create',
                element: <CreateForm />
            },
            {
                path: '/update',
                element: <UpdateForm />
            },

        ]
    }
])

export default router