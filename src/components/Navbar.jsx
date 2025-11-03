import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Asumo que tu logo está en esta ruta.
// ¡Asegúrate de que el logo que definimos en RS-1.2 esté en 'src/assets/'!
import Logo_sazon_azteca from "../assets/Logo_FInal_Sazon_Azteca.png"; 

// Iconos para el menú MÓVIL
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { IoSparklesSharp } from "react-icons/io5"; // Un icono mejor para "Filosofía"
import { MdOutlineMenuBook ,MdOutlineAutoStories, MdContactPhone} from 'react-icons/md';

const Navbar = () => {
    // Estado para manejar el menú móvil 
    const [isOpen, setIsOpen] = useState(false);

    //Definición de enlaces (con rutas corregidas)
    const links = [
        { name: "Inicio", path: "/", icon: <FaHome /> },
        { name: "Filosofía" ,path: "/filosofia", icon: <IoSparklesSharp/> },
        { name: "El Menú", path: "/menu", icon: <MdOutlineMenuBook /> },
        { name: "Relatos", path: "/relatos", icon: <MdOutlineAutoStories/> },
        { name: "Contacto", path: "/contacto", icon: <MdContactPhone /> },
    ];

    // Clases de estilo para los NavLinks (para no repetir)
    const navLinkClass = ({ isActive }) =>
      "font-titulo text-lg px-3 py-2 rounded-md " +
      (isActive
        ? "bg-green-700 text-blancohueso" // Estilo activo (fondo verde)
        : "text-blancohueso hover:text-fondo"); // Estilo inactivo (texto hueso, hover beige)

    return (
      <nav className="bg-grisvolcan shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20"> {/* Aumentamos un poco la altura */}

            {/* 1. Logo (Izquierda) */}
            <div className="flex-shrink-0">
              <NavLink to="/">
                <img 
                  src={Logo_sazon_azteca} 
                  alt="Logo Sazón Azteca" 
                  className="h-16 w-auto" // Tamaño ajustado
                />
              </NavLink>
            </div>

            {/* 2. Links (Centro) - Solo Desktop */}
            <div className="hidden md:flex md:justify-center">
              <div className="flex items-baseline space-x-4">
                {links.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={navLinkClass} // Usamos las clases definidas arriba
                  >
                    {/* NO mostramos icono en desktop, solo el nombre */}
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* 3. Botón Reservar (Derecha) y Menú Hamburguesa */}
            <div className="flex items-center">
              
              {/* Botón Reservar (Solo Desktop) */}
              <div className="hidden md:block ml-4">
                <NavLink
                  to="/reservas"
                  // Estilizado como nuestro ButtonSecondary (verde)
                  className="focus:outline-none 
                 text-white bg-green-800
                 hover:bg-green-900
                 focus:ring-4 focus:ring-green-300
                 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Reservar
                </NavLink>
              </div>

              {/* Botón de Hamburguesa (Solo Móvil) */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-blancohueso hover:text-fondo focus:outline-none"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Abrir menú</span>
                  {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Menú Móvil */}
        <div
          className={`${isOpen ? "block" : "hidden"} md:hidden border-t border-terracota`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)} 
                className={({ isActive }) =>
                  "block px-3 py-2 rounded-md text-base font-cuerpo " +
                  (isActive
                    ? "bg-terracota text-blancohueso"
                    : "text-fondo hover:bg-terracota hover:text-blancohueso")
                }
              >
                {/* En móvil SÍ mostramos el icono */}
                <span className="mr-3 inline-block align-middle">
                  {link.icon}
                </span>
                <span className="inline-block align-middle">{link.name}</span>
              </NavLink>
            ))}
            
            {/* Botón Reservar (Móvil) */}
            <NavLink
              to="/reservas"
              onClick={() => setIsOpen(false)}
              className="focus:outline-none 
                 text-white bg-rojoquemado 
                 hover:bg-terracota 
                 focus:ring-4 focus:ring-rojoquemado/50 
                 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Reservar Ahora
            </NavLink>

          </div>
        </div>
      </nav>
    );
};

export default Navbar;
