import React from "react";
import { Link } from "react-router-dom"; // Importamos Link para el Mapa del Sitio
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // (Quitamos LinkedIn, podemos añadirlo si quieres)
import Logo from "../assets/Logo_FInal_Sazon_Azteca.png"; // Importamos el Logo

const Footer = () => {
  return (
    <footer className="bg-grisvolcan text-blancohueso font-cuerpo py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* --- Columna 1: LOGO Y MISIÓN --- */}
        <div>
          <img src={Logo} alt="Sazón Azteca Logo" className="h-20 w-auto" />
          <p className="text-sm text-fondo mt-4">
            Rescatando la herencia de la cocina mexicana, un platillo a la vez.
          </p>
        </div>

        {/* --- Columna 2: MAPA DEL SITIO --- */}
        <div>
          <h3 className="font-titulo text-lg text-white mb-4">Mapa del Sitio</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-sm text-fondo hover:text-white">Inicio</Link></li>
            <li><Link to="/filosofia" className="text-sm text-fondo hover:text-white">Nuestra Filosofía</Link></li>
            <li><Link to="/menu" className="text-sm text-fondo hover:text-white">El Menú</Link></li>
            <li><Link to="/relatos" className="text-sm text-fondo hover:text-white">Relatos</Link></li>
            <li><Link to="/contacto" className="text-sm text-fondo hover:text-white">Contacto</Link></li>
            <li><Link to="/reservas" className="text-sm text-fondo hover:text-white">Reservar</Link></li>
          </ul>
        </div>

        {/* Columna 3: CONTACTO */}
        <div>
          <h3 className="font-titulo text-lg text-white mb-4">Horarios y Contacto</h3>
          <div className="space-y-2 text-sm text-fondo">
            <p>
              <strong>Dirección:</strong><br />
              Atasta la sierra, villahermosa,Tabasco
            </p>
            <p>
              <strong>Teléfono:</strong><br />
              +29292922828
            </p>
            <p>
              <strong>Horarios:</strong><br />
              Lunes - Jueves: 7:00 AM - 10:00 PM<br />
              Viernes - Domingo: 8:00 AM - 11:00 PM
            </p>
          </div>
        </div>

        {/* Columna 4: REDES SOCIALES  */}
        <div>
          <h3 className="font-titulo text-lg text-white mb-4">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-blancohueso text-2xl hover:text-fondo" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-blancohueso text-2xl hover:text-fondo" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-blancohueso text-2xl hover:text-fondo" />
            </a>
          </div>
        </div>

      </div>

      {/*BARRA INFERIOR*/}
      <div className="container mx-auto border-t border-terracota/30 mt-8 pt-6 text-center">
        <p className="text-sm text-fondo">
          © 2025 Sazón Azteca. Todos los derechos reservados. | Aviso de Privacidad
        </p>
      </div>

    </footer>
  );
}

export default Footer;
