
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    FiGrid, 
    FiPackage, 
    FiTag, 
    FiFileText, 
    FiCalendar, 
    FiLogOut, 
    FiChevronsLeft, 
    FiMenu 
} from 'react-icons/fi'; // ¡Asegúrate de instalar react-icons!
import Logo_Admin from "../../assets/Logo_Final_Sazon_Azteca.png"; // ¡Usa tu logo real aquí!

const AdminSidebar = () => {
    // (DEV) Estado para controlar si la sidebar está abierta o cerrada
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    // (PM) Lista de enlaces para la navegación
    const navLinks = [
        { to: "/admin/dashboard", text: "Inicio", icon: <FiGrid /> },
        { to: "/admin/platillos", text: "Platillos", icon: <FiPackage /> },
        { to: "/admin/categorias", text: "Categorías", icon: <FiTag /> },
        { to: "/admin/articulos", text: "Relatos", icon: <FiFileText /> },
        { to: "/admin/gestion-reservas", text: "Reservas", icon: <FiCalendar /> },
    ];

    // (DEV) Lógica para cerrar sesión
    const handleLogout = () => {
        // 1. Limpiamos el token del storage
        localStorage.removeItem('token'); // O sessionStorage
        
        // 2. Redirigimos al login
        navigate('/admin/login');
    };

    // (UX) Clases base para los enlaces
    const baseLinkClass = "flex items-center space-x-4 p-4 rounded-lg text-lg font-semibold transition-colors duration-200";
    
    // (UX) Clases para el enlace activo (¡tu color terracota!)
    const activeLinkClass = "bg-terracota text-white";
    
    // (UX) Clases para el enlace inactivo
    const inactiveLinkClass = "text-white/70 hover:bg-terracota/30 hover:text-white";

    return (
        <aside 
            className={`
                bg-grisvolcan h-screen flex flex-col p-4 
                transition-all duration-300 ease-in-out
                ${isOpen ? 'w-64' : 'w-24'}
            `}
        >
            {/* --- 1. Encabezado: Logo y Toggle --- */}
            <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} mb-10`}>
                {isOpen && (
                    <img 
                        // (PM) ¡Cambia este src por tu variable 'logoAdmin'!
                        src={Logo_Admin}
                        alt="Sazón Azteca Admin Logo" 
                        className="h-10 w-auto"
                    />
                )}
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="text-white/70 hover:text-white text-2xl"
                >
                    {isOpen ? <FiChevronsLeft /> : <FiMenu />}
                </button>
            </div>

            {/* --- 2. Navegación Principal --- */}
            <nav className="flex-grow">
                <ul className="space-y-2">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <NavLink 
                                to={link.to}
                                // (DEV) ¡Magia! NavLink nos dice si el enlace está 'isActive'
                                // Así aplicamos tu estilo terracota dinámicamente
                                className={({ isActive }) => 
                                    `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass} ${!isOpen ? 'justify-center' : ''}`
                                }
                            >
                                <span className="text-2xl">{link.icon}</span>
                                <span className={`${isOpen ? 'inline-block' : 'hidden'}`}>{link.text}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* --- 3. Botón de Cerrar Sesión (al fondo) --- */}
            <div className="mt-auto">
                <button 
                    onClick={handleLogout}
                    className={`
                        ${baseLinkClass} w-full bg-terracota/50 hover:bg-terracota
                        text-white ${!isOpen ? 'justify-center' : ''}
                    `}
                >
                    <span className="text-2xl"><FiLogOut /></span>
                    <span className={`${isOpen ? 'inline-block' : 'hidden'}`}>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;