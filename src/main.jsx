import { createRoot } from 'react-dom/client'
import './index.css'
import 'swiper/css';

import { RouterProvider } from 'react-router'

import router from './router/router'
import AuthProvider from './context/AuthProveider'
import { ToastContainer } from 'react-toastify'





  createRoot(document.getElementById('root')).render(
  
  

        <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
          <RouterProvider router={router}/> </AuthProvider>
        

  )
