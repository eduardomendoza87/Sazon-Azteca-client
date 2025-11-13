import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoriasAdmin = () => {
    // (DEV) 1. Estado para la lista, carga y errores
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // (DEV) 2. Estado para la modal de eliminación
    const [showModal, setShowModal] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState(null);

    // (DEV) 3. Función para cargar las categorías de la API
    const fetchCategorias = async () => {
        try {
            // (QA/RNF-03) ¡Necesitamos el token para ver la lista!
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Acceso denegado");

            const response = await fetch('http://localhost:8080/api/categorias', {
                headers: { 'x-access-token': token }
            });

            if (!response.ok) {
                throw new Error('Error al cargar las categorías.');
            }
            const data = await response.json();
            setCategorias(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // (DEV) 4. Cargar los datos cuando el componente se monta
    useEffect(() => {
        fetchCategorias();
    }, []);

    // (DEV) 5. Funciones para la modal de eliminación
    const handleDeleteClick = (categoria) => {
        setSelectedCategoria(categoria);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedCategoria) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Acceso denegado");

            // (DEV) 6. ¡Llamamos al endpoint DELETE que creamos!
            const response = await fetch(
                `http://localhost:8080/api/categorias/${selectedCategoria.id}`, 
                {
                    method: 'DELETE',
                    headers: { 'x-access-token': token }
                }
            );

            if (!response.ok) {
                throw new Error('Error al eliminar la categoría.');
            }

            // (UX) Actualizamos la lista en la UI
            setCategorias(categorias.filter(c => c.id !== selectedCategoria.id));
            setShowModal(false);
        } catch (err) {
            setError(err.message);
            setShowModal(false);
        }
    };

    return (
        <>
            {/*Seccion 1: Titulo y Botón Crear */}
            <section className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="font-extrabold font-sans text-5xl text-grisvolcan">
                            Gestión de Categorías
                        </h1>
                        <p className="text-parrafo text-lg font-cuerpo mt-2">
                            Añade, edita o elimina las categorías.
                        </p>
                    </div>
                    {/* (UX/UI) Botón "Crear" corregido */}
                    <Link
                        to="/admin/crear-categoria" // (PM) Esta será la ruta del formulario
                        className="bg-rojoquemado text-white font-semibold py-2 px-5 rounded-lg
                                   hover:bg-terracota transition-colors"
                    >
                        + Crear Nueva Categoría
                    </Link>
                </div>
            </section>

            {/*Seccion 2: Tabla de categorías (Conectada) */}
            <section className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Nombre de la Categoría</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr><td colSpan="2" className="py-4 px-6 text-center text-gray-500">Cargando categorías...</td></tr>
                            )}
                            {error && (
                                <tr><td colSpan="2" className="py-4 px-6 text-center text-red-600">{error}</td></tr>
                            )}
                            {!loading && categorias.map((categoria) => (
                                <tr key={categoria.id} className="border-b border-gray-200">
                                    <td className="py-4 px-6 font-semibold text-grisvolcan">{categoria.nombre}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-4">
                                            {/* (DEV) 7. Enlace de "Actualizar" dinámico */}
                                            <Link
                                                to={`/admin/categorias/editar/${categoria.id}`}
                                                className="text-white bg-terracota font-semibold py-2 px-4 rounded-lg
                                                           hover:bg-terracota/80 transition-colors text-sm"
                                            >
                                                Editar
                                            </Link> 
                                            
                                            {/* (QA/UX) 8. Botón "Eliminar" (no un Link) */}
                                            <button
                                                onClick={() => handleDeleteClick(categoria)}
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

            {/* (DEV/QA) 9. Modal de Confirmación (de tu Figma Frame 9) */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                        <h2 className="text-2xl font-bold text-grisvolcan mb-4">⚠️ ¿Estás seguro?</h2>
                        <p className="text-parrafo mb-6">
                            Estás a punto de eliminar la categoría: 
                            <strong className="text-rojoquemado"> {selectedCategoria.nombre}</strong>. 
                            (Los platillos asociados no se borrarán, pero se quedarán sin categoría).
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

export default CategoriasAdmin;