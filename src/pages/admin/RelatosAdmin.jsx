import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ArticulosAdmin = () => {
    //  Estado para la lista, carga y errores
    const [articulos, setArticulos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //  Estado para la modal de eliminación
    const [showModal, setShowModal] = useState(false);
    const [selectedArticulo, setSelectedArticulo] = useState(null);

    // (Función para cargar los artículos de la API
    const fetchArticulos = async () => {
        try {
            // (QA/RNF-03) ¡Necesitamos el token para ver la lista!
            // (Nota: Hicimos la API pública, pero el admin la verá protegida.
            // Es mejor protegerla, pero por ahora la dejamos pública
            // como la definimos. ¡Vamos a añadir el token de todos modos!)
            const token = localStorage.getItem('token'); 
            
            const response = await fetch('http://localhost:8080/api/relatos', {
                // (QA) El GET /api/relatos es público, pero si quisiéramos
                // protegerlo, añadiríamos el header aquí.
                // headers: { 'x-access-token': token } 
            });

            if (!response.ok) {
                throw new Error('Error al cargar los artículos.');
            }
            const data = await response.json();
            setArticulos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    //  Cargar los datos cuando el componente se monta
    useEffect(() => {
        fetchArticulos();
    }, []);

    //  Funciones para la modal de eliminación
    const handleDeleteClick = (articulo) => {
        setSelectedArticulo(articulo);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedArticulo) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Acceso denegado");

            //  ¡Llamamos al endpoint DELETE que creamos!
            // ¡Usamos el SLUG, no el ID!
            const response = await fetch(
                `http://localhost:8080/api/relatos/${selectedArticulo.slug}`, 
                {
                    method: 'DELETE',
                    headers: { 'x-access-token': token }
                }
            );

            if (!response.ok) {
                throw new Error('Error al eliminar el artículo.');
            }

            setArticulos(articulos.filter(a => a.slug !== selectedArticulo.slug));
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
                            Gestión de Relatos
                        </h1>
                        <p className="text-parrafo text-lg font-cuerpo mt-2">
                            Gestiona los artículos del blog de Sazón Azteca.
                        </p>
                    </div>
                    {/* (UX/UI) Botón "Crear"  */}
                    <Link
                        to="/admin/crear-articulo" // (PM) Ruta del formulario
                        className="bg-rojoquemado text-white font-semibold py-2 px-5 rounded-lg
                                   hover:bg-terracota transition-colors"
                    >
                        + Escribir Nuevo Relato
                    </Link>
                </div>
            </section>

            {/*Seccion 2: Tabla de artículos*/}
            <section className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Título</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Autor</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Categoría</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Fecha</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr><td colSpan="5" className="py-4 px-6 text-center text-gray-500">Cargando artículos...</td></tr>
                            )}
                            {error && (
                                <tr><td colSpan="5" className="py-4 px-6 text-center text-red-600">{error}</td></tr>
                            )}
                            {!loading && articulos.map((articulo) => (
                                <tr key={articulo.id} className="border-b border-gray-200">
                                    <td className="py-4 px-6 font-semibold text-grisvolcan">{articulo.titulo}</td>
                                    <td className="py-4 px-6 text-parrafo">{articulo.autor}</td>
                                    <td className="py-4 px-6 text-parrafo">{articulo.categoria}</td>
                                    <td className="py-4 px-6 text-parrafo">
                                        {/*  Formateamos la fecha */}
                                        {new Date(articulo.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-4">
                                            {/* Enlace de "Actualizar" dinámico (usa SLUG) */}
                                            <Link
                                                to={`/admin/relatos/editar/${articulo.slug}`}
                                                className="text-white bg-terracota font-semibold py-2 px-4 rounded-lg
                                                           hover:bg-terracota/80 transition-colors text-sm"
                                            >
                                                Editar
                                            </Link> 
                                            
                                            {/*  8. Botón "Eliminar"  */}
                                            <button
                                                onClick={() => handleDeleteClick(articulo)}
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

            {/* (DEV/QA) 9. Modal de Confirmación (de tu Figma Frame 11) */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                        <h2 className="text-2xl font-bold text-grisvolcan mb-4">⚠️ ¿Estás seguro?</h2>
                        <p className="text-parrafo mb-6">
                            Estás a punto de eliminar permanentemente el relato: 
                            <strong className="text-rojoquemado"> {selectedArticulo.titulo}</strong>.
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

export default ArticulosAdmin;