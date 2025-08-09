import React from 'react';
import { createBrowserRouter } from 'react-router';
import Mainlayout from '../layout/Mainlayout';
import Home from '../Component/Home/Home';
import NotFound from '../Error/NoteFound';
import Login from '../page/Login';

import MyProfile from '../page/Myprofail';
import Blog from '../Component/Bolog/Blog';
import BidDetailPage from '../page/BidDetle';
import AllPakej from '../page/AllPakej';
import MyPostedTask from '../page/MyPostedTask';
import UpdateTask from '../page/UpdateTask';
import PrivateRoute from '../page/PrivateRout';
import AddPak from '../page/AddPak';
import TurDeltes from '../page/TurDeltes';
import MyBookings from '../page/MyBookings';
import MyCreate from '../page/MyCreate';
import Update from '../page/Update'
import Register from '../page/Register';
// import Dashbord from '../page/Dashbord';
import Dashboard from '../page/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    errorElement: <NotFound />,
    children: [
        {
        path: '/',
        loader: async () => {
          const res = await fetch('https://tour-backend-five.vercel.app/api/v1/tour-package');
          const result = await res.json();
          return result.data || []; 
        },
        element: <Home />,
      },

      {
        path: 'add-pak',
        element: (
          <PrivateRoute>
            <AddPak />
          </PrivateRoute>
        ),
      },
      {
        path: 'dashbord',
        element: (
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        ),
      },
      {
        path: 'poste',
        element: (
          <PrivateRoute>
            <MyPostedTask />
          </PrivateRoute>
        ),
      },
      {
        path:'mybookings',
        element:(
          <PrivateRoute>
            <MyBookings/>
          </PrivateRoute>
        ),
      },
      
      {
        path: 'update-task/:id',
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
      },
    
      {
        path: 'my-profile',
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path:'myCreate',
        element:<MyCreate/>
      },
      {
        path: 'allpak',
        element: <AllPakej />,
      },
      
     {
    path: '/tour-details/:id',
    element: (
          <PrivateRoute>
            <TurDeltes/>
          </PrivateRoute>
        ),
  },
      {
        path: 'Blog',
        element: <Blog />,
      },
      {
        path: 'update/:id',
        element: <Update/>,
      },
      {
        path: 'bid-detail/:id',
        element: <BidDetailPage />,
      },
      {
        path:'register',
        element:<Register/>
      },
      {
        path: 'login',
        element: <Login />,
      },
     
    ],
  },
]);

export default router;
