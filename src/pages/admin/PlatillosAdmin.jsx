import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const PlatillosAdmin = () => {
    const [platillos, setPlatillos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlato, setSelectedPlato] = useState(null);
    const navigate = useNavigate();

    const fetchPlatillos = async () => {
        try {
            // (DEV) Llamamos a la API que SÍ incluye el nombre de la categoría
            const response = await fetch('http://localhost:8080/api/platillos');
            if (!response.ok) {
                throw new Error('Error al cargar los platillos.');
            }
            const data = await response.json();
            setPlatillos(data); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlatillos();
    }, []);

    const handleDeleteClick = (platillo) => {
        setSelectedPlato(platillo);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedPlato) return;
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("No autorizado. Inicia sesión.");
                setShowModal(false);
                return;
            }
            const response = await fetch(
                `http://localhost:8080/api/platillos/${selectedPlato.id}`, 
                {
                    method: 'DELETE',
                    headers: { 'x-access-token': token }
                }
            );
            if (!response.ok) {
                throw new Error('Error al eliminar el platillo.');
            }
            setPlatillos(platillos.filter(p => p.id !== selectedPlato.id));
            setShowModal(false); 
        } catch (err) {
            setError(err.message);
            setShowModal(false); 
        }
    };

    return (
        <>
            {/*Seccion 1: Titulo  */}
            <section className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="font-extrabold font-sans text-5xl text-grisvolcan">
                            Gestión de Platillos
                        </h1>
                        <p className="text-parrafo text-lg font-cuerpo mt-2">
                            Gestiona los platillos de Sazón Azteca aquí.
                        </p>
                    </div>
                    {/* (UX) Botón de Crear (Color de marca corregido) */}
                    <Link
                        to="/admin/crear-platillo" // (DEV) Ruta de creación
                        className="bg-rojoquemado text-white font-semibold py-2 px-5 rounded-lg
                                   hover:bg-terracota transition-colors"
                    >
                        + Crear Nuevo Platillo
                    </Link>
                </div>
            </section>

            {/*Seccion 2: Tabla de platillos (Conectada) */}
            <section className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Título</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Categoría</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Precio</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Imagen</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr><td colSpan="5" className="py-4 px-6 text-center text-gray-500">Cargando platillos...</td></tr>
                            )}
                            {error && (
                                <tr><td colSpan="5" className="py-4 px-6 text-center text-red-600">{error}</td></tr>
                            )}
                            {!loading && platillos.map((platillo) => (
                                <tr key={platillo.id} className="border-b border-gray-200">
                                    <td className="py-4 px-6 font-semibold text-grisvolcan">{platillo.titulo}</td>
                                    
                                    {/* *
                                      * ¡AQUÍ ESTÁ LA CORRECCIÓN!
                                      * Cambiamos 'platillo.Categoria' a 'platillo.categoria' (minúscula)
                                      * para que coincida con el alias 'as: "categoria"' del backend.
                                      *
                                    */}
                                    <td className="py-4 px-6 text-parrafo">
                                        {platillo.categoria ? platillo.categoria.nombre : 'Sin Categoría'}
                                    </td>
                                    
                                    <td className="py-4 px-6 text-parrafo">${platillo.precio}</td>
                                    <td className="py-4 px-6">
                                        <img src={platillo.imagenUrl} alt={platillo.titulo} className="h-12 w-12 object-cover rounded-md" />
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-4">
                                            {/* (DEV) Botón de Actualizar (Dinámico) */}
                                            <Link
                                                to={`/admin/platillos/editar/${platillo.id}`}
                                                className="text-white bg-terracota font-semibold py-2 px-4 rounded-lg
                                                           hover:bg-terracota/80 transition-colors text-sm"
                                            >
                                                Editar
                                            </Link> 
                                            
                                            {/* (DEV) Botón de Eliminar (Llama a la modal) */}
                                            <button
                                                onClick={() => handleDeleteClick(platillo)}
                                                className="text-white bg-rojoquemado font-semibold py-2 px-4 rounded-lg
                                                           hover:bg-rojoquemado/80 transition-colors text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>    

            {/* (DEV) Seccion 3: Modal de Confirmación (RF-12) */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                        <h2 className="text-2xl font-bold text-grisvolcan mb-4">⚠️ ¿Estás seguro?</h2>
                        <p className="text-parrafo mb-6">
                            Estás a punto de eliminar permanentemente el platillo: 
                            <strong className="text-rojoquemado"> {selectedPlato.titulo}</strong>. 
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-200 text-grisvolcan font-semibold py-2 px-5 rounded-lg
                                           hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-rojoquemado text-white font-semibold py-2 px-5 rounded-lg
                                           hover:bg-rojoquemado/80 transition-colors"
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PlatillosAdmin;