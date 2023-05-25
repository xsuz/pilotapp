import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';


import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import './App.css'
import Menu from './component/Menu';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Log from './pages/Log';

import React from 'react';

export default function App() {

  const [url,setURL]=React.useState("/test.json");

  //Menuの項目
  const items = [
    {
      name: 'Home',
      path: '/',
      element: <Home url={url}/>
    },
    {
      name: 'Settings',
      path: '/settings',
      element: <Settings url={url} setURL={setURL} />
    },
    {
      name: 'Log',
      path: '/log',
      element: <Log/>
    },
  ];

  const router = createBrowserRouter([
    {
      path: '',
      element:
        <Box component="main" sx={{ p: 3 }}>
          <Menu children={items}></Menu>
          <Toolbar />
          <Outlet />
        </Box>,
      children: items
    }
  ],{
    basename:"/pilotapp/"
  })

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <RouterProvider router={router} />
    </Box>
  );
}