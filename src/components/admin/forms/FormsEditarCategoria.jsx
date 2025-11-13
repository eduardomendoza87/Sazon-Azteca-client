import React, { useState, useEffect } from "react";
// (DEV) 1. Importamos los hooks necesarios
import { Link, useNavigate, useParams } from "react-router-dom";

const FormsEditarCategoria = () => {
    // (DEV) 2. Obtenemos el 'id' de la URL (ej. /admin/categorias/editar/1)
    const { id } = useParams(); 
    const navigate = useNavigate();

    // (DEV) 3. Estado para el formulario y errores
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // (DEV) 4. Cargar los datos de la categoría existente
    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error("Acceso denegado");

                // (DEV) ¡Llamamos al endpoint GET /:id que creamos!
                const response = await fetch(
                    `http://localhost:8080/api/categorias/${id}`, 
                    {
                        headers: { 'x-access-token': token }
                    }
                );
                
                if (!response.ok) throw new Error("Error al cargar la categoría");
                
                const data = await response.json();
                
                // (DEV) ¡Pre-llenamos el formulario con el nombre actual!
                setNombre(data.nombre); 

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoria();
    }, [id]); // Se ejecuta si el 'id' de la URL cambia

    // (DEV) 5. Manejador para enviar el formulario a la API (¡con PUT!)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Acceso denegado");

            // (DEV) 6. ¡Llamamos al endpoint PUT que creamos!
            const response = await fetch(
                `http://localhost:8080/api/categorias/${id}`, // Usamos el ID de la URL
                {
                    method: 'PUT', // ¡Método PUT!
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                    body: JSON.stringify({ nombre: nombre }) 
                }
            );

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Error al actualizar la categoría');
            }

            // (UX) ¡Éxito! Volvemos a la lista
            navigate('/admin/categorias');

        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Cargando categoría...</p>;

    return (
        // (UX) 7. Layout de "tarjeta" (igual que el de Crear)
        <section className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg mx-auto">
            
            <h1 className="text-3xl font-extrabold text-grisvolcan mb-2">Editando Categoría</h1>
            
            <Link to="/admin/categorias" className="text-terracota hover:text-rojoquemado mb-6 inline-block">
                ← Volver a la lista
            </Link>

            {/* (DEV) 8. Formulario conectado */}
            <form onSubmit={handleSubmit}>
                
                <h3 className="text-xl font-bold mb-4 col-span-2 text-grisvolcan">Información de la categoría</h3>
                
                {/* Nombre de la categoría */}
                <div className="mb-4 col-span-2">
                    <label className="block text-parrafo font-cuerpo mb-2" htmlFor="nombre">Nombre de la categoría *</label>
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
                
                {/* Mensaje de error */}
                {error && (
                    <p className="text-center text-red-600 font-semibold my-4">
                        Error: {error}
                    </p>
                )}

                {/* (UX) 9. Botones con colores de marca */}
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
                        Guardar Cambios
                    </button>
                </div>

            </form>
        </section>
    );
}
export default FormsEditarCategoria;