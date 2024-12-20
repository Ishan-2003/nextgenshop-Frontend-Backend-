import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import MetaTitle from '../Components/MetaTitle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>
    <MetaTitle title="Home" />
        <Header/>
        <Outlet/>
        <Footer/>
        <ToastContainer/>
    </>
  )
}

export default Layout
