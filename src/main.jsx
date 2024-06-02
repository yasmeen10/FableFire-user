import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import './index.css';
import Shop from './pages/Shop/Shop';
import ItemDetails from './pages/ItemDetails/ItemDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Shop />,
      },
      {
        path: 'item/:id',
        element: <ItemDetails />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
