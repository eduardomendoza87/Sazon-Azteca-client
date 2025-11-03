import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const ClienteLayout = () => {
    return(
        <div className="main-layout min-h-screen font-sans">
           <Navbar/>
           <main className="content p-4">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default ClienteLayout;