import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route.jsx'
import { FormProvider } from './assets/contexts/FormProvider.jsx'
import { SnackbarProvider } from './assets/contexts/SnackbarProvider.jsx'
import { AlertProvider } from './assets/contexts/AlertProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider>
      <AlertProvider>
        <FormProvider>
          <App />
          <RouterProvider router={router} />
        </FormProvider>
      </AlertProvider>
    </SnackbarProvider>
  </React.StrictMode>,
)
