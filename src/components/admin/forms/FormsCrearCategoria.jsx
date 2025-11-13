// Ubicación: src/pages/admin/FormsCrearCategoria.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FormsCrearCategoria = () => {
    // (DEV) 1. Estado para el formulario
    const [nombre, setNombre] = useState("");
    
    // (DEV) 2. Estado para errores y navegación
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // (DEV) 3. Manejador para enviar el formulario a la API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // (QA/RNF-03) ¡Necesitamos el token para la ruta POST!
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Acceso denegado. Vuelve a iniciar sesión.");

            // (QA) Validación simple
            if (!nombre) {
                throw new Error("El nombre de la categoría es obligatorio.");
            }

            // (DEV) 4. ¡Llamamos al endpoint POST que creamos!
            const response = await fetch('http://localhost:8080/api/categorias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({ nombre: nombre }) // Enviamos el nombre
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Error al crear la categoría');
            }

            // (UX) ¡Éxito! Volvemos a la lista de categorías
            navigate('/admin/categorias');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        // (UX) 5. ¡Layout Corregido!
        // Esta <section> es una "tarjeta" que vive DENTRO del AdminLayout.
        // Usamos max-w-lg y mx-auto para centrarla en el área de contenido.
        <section className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg mx-auto">
            
            <h1 className="text-3xl font-extrabold text-grisvolcan mb-2">Crear Nueva Categoría</h1>
            
            <Link to="/admin/categorias" className="text-terracota hover:text-rojoquemado mb-6 inline-block">
                ← Volver a la lista
            </Link>

            {/* (DEV) 6. Formulario conectado */}
            <form onSubmit={handleSubmit}>
                
                <h3 className="text-xl font-bold mb-4 col-span-2 text-grisvolcan">Información de la categoría</h3>
                
                {/* Nombre de la categoría */}
                <div className="mb-4 col-span-2">
                    <label className="block text-parrafo font-cuerpo mb-2" htmlFor="nombre">Nombre de la nueva categoría *</label>
                    <input 
                        className="w-full p-2 border border-gray-300 rounded" 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        value={nombre} // (DEV) Controlado
                        onChange={(e) => setNombre(e.target.value)} // (DEV) Controlado
                        required 
                    />
                </div>
                
                {/* (QA) 7. Mensaje de error */}
                {error && (
                    <p className="text-center text-red-600 font-semibold my-4">
                        Error: {error}
                    </p>
                )}

                {/* (UX) 8. Botones con colores de marca */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                    <Link
                        to="/admin/categorias"
                        className="bg-gray-500 text-white font-semibold rounded-lg px-6 py-2
                                   hover:bg-gray-600 transition-colors" 
                    >
                        Cancelar
                    </Link>
                    <button 
                        type="submit" 
                        className="bg-rojoquemado text-white font-semibold rounded-lg px-6 py-2
                                   hover:bg-terracota transition-colors"
                    >
                        Crear Categoría
                    </button>
                </div>

            </form>
        </section>
    );
}
export default FormsCrearCategoria;