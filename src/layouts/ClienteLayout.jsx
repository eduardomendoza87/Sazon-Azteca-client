import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ClienteLayout = () => {
    return(
        <div className="main-layout min-h-screen font-sans">
           <main className="content p-4">
        <Outlet />
      </main>
      <footer className="footer p-4 text-center text-gray-500">
        <p>&copy; 2025 Mi Portafolio</p>
      </footer>
    </div>
  );
};

export default ClienteLayout;