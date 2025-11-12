import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//imagen
import LoginImage from "../../assets/Login_Imagen_Sazon_Azteca.jpg";    


const AdminLogin = () => {
    // (DEV) 1. Estado para controlar el formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // (DEV) Estado para mostrar errores de la API (ej. "Contraseña incorrecta")
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    // (DEV) 2. Lógica para manejar el envío
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setError(null); // Limpia errores anteriores

        try {
            // (DEV) 3. Conexión al Backend (¡El enchufe!)
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            // (QA) 4. Manejo de Errores de la API
            if (!response.ok) {
                // Si la respuesta es 401, 404, etc., mostramos el mensaje
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            // (DEV) 5. ¡ÉXITO!
            // Guardamos el "pase de acceso" (token) en el navegador
            localStorage.setItem('token', data.accessToken);
            
            // Redirigimos al admin al dashboard
            navigate('/admin/dashboard');

        } catch (err) {
            // (UX) Mostramos el error al usuario
            console.error(err.message);
            setError(err.message);
        }
    };

    return (
        // (UX) Contenedor principal que centra el formulario en la pantalla
        <div className="flex items-center justify-center min-h-screen bg-fondo">
            
            <div className="relative flex w-full max-w-4xl m-4 bg-white rounded-2xl shadow-xl overflow-hidden">
                
                {/* --- Columna Izquierda (Imagen) --- */}
                <div className="hidden md:block w-1/2">
                    <img 
                       
                        src={LoginImage}
                        alt="Platillos mexicanos" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* --- Columna Derecha (Formulario) --- */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h1 className="text-4xl font-extrabold text-grisvolcan mb-8">
                        Inicia Sesion
                    </h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Campo Correo */}
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Correo
                            </label>
                            <input 
                                type="email" 
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-grisvolcan/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracota"
                                placeholder="tu@email.com"
                                required 
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Contraseña
                            </label>
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-grisvolcan/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracota"
                                placeholder="Tu contraseña"
                                required 
                            />
                        </div>

                        {/* Recordarme y Olvidaste */}
                        <div className="flex items-center justify-between text-sm">
                            <label htmlFor="remember" className="flex items-center space-x-2 text-gray-600">
                                <input type="checkbox" id="remember" className="rounded text-terracota focus:ring-terracota" />
                                <span>Recordarme</span>
                            </label>
                            
                            <a href="#" className="font-medium text-terracota hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {/* Botón de Iniciar Sesión */}
                        <div>
                            <button 
                                type="submit" 
                                className="w-full bg-terracota text-white py-3 rounded-lg font-semibold text-lg hover:bg-rojoquemado transition-colors duration-300"
                            >
                                Inicar sesion
                            </button>
                        </div>
                        
                        {/* (UX) Mensaje de Error */}
                        {error && (
                            <p className="text-center text-red-600 font-semibold">
                                {error}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;