// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from "react-router";
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 

// import App from './App.jsx';
// import './index.css';

// import HomePage from './pages/Home/HomePage.jsx';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage/>,
//     errorElement: <div>404 Not Found</div>
//   },
// ])

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//       <App />
//   </BrowserRouter>
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfilesPage from './pages/ProfilesPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: '/profile',
    element: <ProfilePage/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: '/profiles',
    element: <ProfilesPage/>,
    errorElement: <NotFoundPage/>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)