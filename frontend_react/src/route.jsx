import { createBrowserRouter } from 'react-router-dom'
import { CreateForm } from './assets/views/CreateForm'
import { UpdateForm } from './assets/views/UpdateForm'
import { LayoutComponent } from './assets/components/LayoutComponent'
import { HomeScreen } from './assets/views/HomeScreen'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutComponent />,
        children: [
            {
                path: '/',
                element: <HomeScreen />,
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