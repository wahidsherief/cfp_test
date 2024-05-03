import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route.jsx'
import { FormProvider } from './assets/contexts/FormProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FormProvider>
      <App />
      <RouterProvider router={router} />
    </FormProvider>
  </React.StrictMode>,
)
