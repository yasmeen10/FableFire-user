import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function RedirectToHome() {
    const auth = localStorage.getItem('token');
  return (
    <>
    {auth ? <Navigate to = '/' /> : <Outlet/>}
    </>
  )
}
