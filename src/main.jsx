import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfilesPage from './pages/ProfilesPage.jsx';
import ProductIndex from './views/products/ProductIndex.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: '/products',
    element: <ProductIndex/>,
  },
  {
    path: '/profiles',
    element: <ProfilesPage/>,
    children: [{
      path: '/profiles/:profileId',
      element: <ProfilePage/>,
    }],
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)