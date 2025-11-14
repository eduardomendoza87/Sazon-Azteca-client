// Ubicación: src/pages/admin/PlatilloForm.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const FormsCrearPlatillo = () => {
    // (DEV) 1. Estado para el formulario. ¡Nombres IGUALES al backend!
    const [formData, setFormData] = useState({
        titulo: "",
        categoriaId: "",
        precio: "",
        imagenUrl: "",
        descripcion: "",
        historia: "",
        ingredientes: "",
        procedencia: ""
    });

    // (DEV) 2. Estado para guardar la lista de categorías de la API
    const [categorias, setCategorias] = useState([]);
    
    // (DEV) 3. Estado para errores y navegación
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // (DEV) 4. Cargar categorías de la API cuando el componente se monta
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error("Acceso denegado");

                const response = await fetch('http://localhost:8080/api/categorias', {
                    headers: { 'x-access-token': token }
                });

                if (!response.ok) throw new Error("Error al cargar categorías");

                const data = await response.json();
                setCategorias(data); // Guardamos la lista
                
                // (UX) Asignamos la primera categoría como valor por defecto
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, categoriaId: data[0].id }));
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCategorias();
    }, []); // El [] asegura que solo se ejecute una vez

    // (DEV) 5. Manejador genérico para todos los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // (DEV) 6. Manejador para enviar el formulario a la API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Acceso denegado");
            
            // (DEV) ¡Llamamos al endpoint POST que creamos!
            const response = await fetch('http://localhost:8080/api/platillos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Error al crear el platillo');
            }

            // (UX) ¡Éxito! Volvemos a la lista de platillos
            navigate('/admin/platillos');

        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Cargando categorías...</p>;

    return (
        <section className="bg-white shadow-xl rounded-lg p-8 w-full">
            
            <h1 className="text-3xl font-extrabold text-grisvolcan mb-2">Crear Nuevo Platillo</h1>
            
            <Link to="/admin/platillos" className="text-terracota hover:text-rojoquemado mb-6 inline-block">
                ← Volver a la lista
            </Link>

            {/* (DEV) 7. Formulario conectado */}
            <form onSubmit={handleSubmit}>
                {/* (UX) 8. Layout de 2 columnas (como en Figma) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    
                    {/* --- Columna 1: Información Principal --- */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-grisvolcan border-b pb-2">Información Principal</h3>
                        
                        <div>
                            <label htmlFor="titulo" className="block text-parrafo font-cuerpo mb-2">Título *</label>
                            <input 
                                type="text" 
                                id="titulo" 
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded" 
                                required 
                            />
                        </div>

                        <div>
                            {/* (DEV) 9. ¡El <select> corregido! */}
                            <label htmlFor="categoriaId" className="block text-parrafo font-cuerpo mb-2">Categoría *</label>
                            <select 
                                id="categoriaId" 
                                name="categoriaId"
                                value={formData.categoriaId}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded bg-white" 
                                required
                            >
                                {categorias.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="precio" className="block text-parrafo font-cuerpo mb-2">Precio *</label>
                            <input 
                                type="number" 
                                id="precio" 
                                name="precio"
                                value={formData.precio}
                                onChange={handleChange}
                                step="0.01"
                                placeholder="150.00"
                                className="w-full p-2 border border-gray-300 rounded" 
                                required 
                            />
                        </div>
                        
                        <div>
                            {/* (QA) 10. 'htmlFor' corregido */}
                            <label htmlFor="imagenUrl" className="block text-parrafo font-cuerpo mb-2">URL de Imagen</label>
                            <input 
                                type="text" 
                                id="imagenUrl" 
                                name="imagenUrl"
                                value={formData.imagenUrl}
                                onChange={handleChange}
                                placeholder="/images/mole.jpg"
                                className="w-full p-2 border border-gray-300 rounded" 
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="descripcion" className="block text-parrafo font-cuerpo mb-2">Descripción Corta</label>
                            <textarea 
                                id="descripcion" 
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                rows="4" 
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                    </div>

                    {/* --- Columna 2: Cocina de Herencia --- */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-grisvolcan border-b pb-2">Cocina de Herencia (RF-05)</h3>
                        
                        <div>
                            <label htmlFor="historia" className="block text-parrafo font-cuerpo mb-2">Historia</label>
                            <textarea 
                                id="historia" 
                                name="historia"
                                value={formData.historia}
                                onChange={handleChange}
                                rows="5" 
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                        
                        <div>
                            <label htmlFor="ingredientes" className="block text-parrafo font-cuerpo mb-2">Ingredientes</label>
                            <textarea 
                                id="ingredientes" 
                                name="ingredientes"
                                value={formData.ingredientes}
                                onChange={handleChange}
                                rows="5" 
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                        
                        <div>
                            <label htmlFor="procedencia" className="block text-parrafo font-cuerpo mb-2">Procedencia</label>
                            <textarea 
                                id="procedencia" 
                                name="procedencia"
                                value={formData.procedencia}
                                onChange={handleChange}
                                rows="5" 
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* (QA) 11. Mensaje de error */}
                {error && (
                    <p className="text-center text-red-600 font-semibold my-4">
                        Error: {error}
                    </p>
                )}

                {/* (UX) 12. Botones con colores de marca */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                    <Link
                        to="/admin/platillos"
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
                        Guardar Platillo
                    </button>
                </div>

            </form>
        </section>
    );
}
export default FormsCrearPlatillo;