import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './client/pages/Home/HomePage.jsx';
import NotFoundPage from './client/pages/NotFoundPage.jsx';
import ProfilePage from './client/pages/ProfilePage.jsx';
import ProfilesPage from './client/pages/ProfilesPage.jsx';
// import ProductIndex from './views/products/ProductIndex.jsx';
import ProductIndex from './client/pages/Products/ProductIndex.jsx'

import Contact from './client/components/Contact.jsx';
import About from './client/components/About.jsx';
import Layout from './client/components/Layout.jsx';
import Home from './client/components/Home.jsx';
import MakeProduct from './client/pages/Products/MakeProduct.jsx';

const router = createBrowserRouter([
  {
    path: '/makeproduct',
    element: <MakeProduct/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: '/products',
    element: <ProductIndex/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: '/profiles',
    element: <ProfilesPage/>,
    children: [{
      path: '/profiles/:profileId',
      element: <ProfilePage/>,
    }],
    errorElement: <NotFoundPage/>,
  },
  // {
  //   element: <Layout />,
  //   children: [
  //     {path: '/', element: <Home />},
  //     {path: '/about', element: <About />},
  //     {path: '/contact', element: <Contact />},
  //   ]
  // }
])

function App() {

 return ( 
  <div className="App">
      {/* <RouterProvider router={router}/> */}
      {/* <HomePage/> */}
      
  </div>
)}

export default App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)