// Ubicación: src/pages/admin/FormsEditarPlatillo.jsx

import React, { useState, useEffect } from "react";
// (DEV) 1. Importamos useParams para leer el ID de la URL
import { Link, useNavigate, useParams } from "react-router-dom";

const FormsEditarPlatillo = () => {
    // (DEV) 2. Obtenemos el 'id' de la URL (ej. /.../editar/:id)
    const { id } = useParams(); 
    const navigate = useNavigate();

    // (DEV) Estado para el formulario (se llenará con datos de la API)
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

    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);
    // (DEV) Estado de carga mejorado para ambas llamadas
    const [loading, setLoading] = useState({ categorias: true, platillo: true });

    // (DEV) 4. useEffect ¡actualizado!
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("Acceso denegado");
            setLoading({ categorias: false, platillo: false });
            return;
        }

        // --- Función para cargar categorías (igual que antes) ---
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/categorias', {
                    headers: { 'x-access-token': token }
                });
                if (!response.ok) throw new Error("Error al cargar categorías");
                const data = await response.json();
                setCategorias(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(prev => ({ ...prev, categorias: false }));
            }
        };

        // --- (DEV) ¡NUEVO! Función para cargar el platillo existente ---
        const fetchPlatillo = async () => {
            try {
                // (DEV) Usamos el endpoint público GET /api/platillos/:id
                const response = await fetch(`http://localhost:8080/api/platillos/${id}`);
                if (!response.ok) throw new Error("Error al cargar los datos del platillo");
                const data = await response.json();
                
                // (DEV) ¡Pre-llenamos el formulario con los datos!
                setFormData({
                    titulo: data.titulo || "",
                    categoriaId: data.categoriaId || "",
                    precio: data.precio || "",
                    imagenUrl: data.imagenUrl || "",
                    descripcion: data.descripcion || "",
                    historia: data.historia || "",
                    ingredientes: data.ingredientes || "",
                    procedencia: data.procedencia || ""
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(prev => ({ ...prev, platillo: false }));
            }
        };

        fetchCategorias();
        fetchPlatillo(); // ¡Llamamos a ambas funciones!
        
    }, [id]); // (DEV) Se ejecuta de nuevo si el 'id' cambia

    // (DEV) 5. Manejador genérico (sin cambios)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // (DEV) 6. ¡handleSubmit CORREGIDO para 'PUT'!
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Acceso denegado");
            
            // (DEV) ¡Llamamos al endpoint PUT que creamos!
            const response = await fetch(`http://localhost:8080/api/platillos/${id}`, {
                method: 'PUT', // ¡Método PUT!
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Error al actualizar el platillo');
            }

            // (UX) ¡Éxito! Volvemos a la lista de platillos
            navigate('/admin/platillos');

        } catch (err) {
            setError(err.message);
        }
    };

    // (DEV) 7. Manejador de estado de carga
    if (loading.categorias || loading.platillo) {
        return <p>Cargando datos del formulario...</p>;
    }

    return (
        <section className="bg-white shadow-xl rounded-lg p-8 w-full">
            
            {/* (DEV) Título actualizado */}
            <h1 className="text-3xl font-extrabold text-grisvolcan mb-2">
                Editando: {formData.titulo || "Platillo"}
            </h1>
            
            <Link to="/admin/platillos" className="text-terracota hover:text-rojoquemado mb-6 inline-block">
                ← Volver a la lista
            </Link>

            <form onSubmit={handleSubmit}>
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
                            <label htmlFor="categoriaId" className="block text-parrafo font-cuerpo mb-2">Categoría *</label>
                            <select 
                                id="categoriaId" 
                                name="categoriaId"
                                value={formData.categoriaId} // ¡Esto ahora funcionará!
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded bg-white" 
                                required
                            >
                                <option value="">Selecciona una categoría</option>
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

                {/* Mensaje de error */}
                {error && (
                    <p className="text-center text-red-600 font-semibold my-4">
                        Error: {error}
                    </p>
                )}

                {/* Botones */}
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
                        Guardar Cambios {/* (DEV) Texto del botón actualizado */}
                    </button>
                </div>

            </form>
        </section>
    );
}
export default FormsEditarPlatillo;