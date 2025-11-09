import React from 'react';
// (DEV) 'Link' no se estaba usando en este archivo, así que lo quité.
import { Outlet } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const ClienteLayout = () => {
    return(
        
        <div className="main-layout min-h-screen w-full font-sans">
           <Navbar/>
           <main className="content">
             <Outlet />
           </main>
          <Footer/>
    </div>
  );
};

export default ClienteLayout;