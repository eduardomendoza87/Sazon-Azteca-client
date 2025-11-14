import React, { useState, useEffect } from "react";
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

const ReservasAdmin = () => {
    // Estado para la lista, carga y errores
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //  Estado para los filtros (basado en tu diseño)
    // 'hoy' es el filtro por defecto que la API espera
    const [filtroActivo, setFiltroActivo] = useState('hoy');

    // Estado para las 3 modales
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    //  Estado para el formulario de edición
    const [estadoEdit, setEstadoEdit] = useState('');

    //  Función para cargar las reservas de la API
    const fetchReservas = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Acceso denegado");

            //  ¡Llamamos al endpoint con el filtro!
            const response = await fetch(
                `http://localhost:8080/api/reservas?filtro=${filtroActivo}`, 
                {
                    headers: { 'x-access-token': token }
                }
            );

            if (!response.ok) {
                throw new Error('Error al cargar las reservas.');
            }
            const data = await response.json();
            setReservas(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    //  useEffect que se vuelve a ejecutar CADA VEZ que 'filtroActivo' cambia
    useEffect(() => {
        fetchReservas();
    }, [filtroActivo]); // ¡Dependencia clave!

    // ---  Manejadores para las acciones de la tabla ---

    const handleVerDetalle = (reserva) => {
        setSelectedReserva(reserva);
        setShowDetailModal(true);
    };

    const handleEditar = (reserva) => {
        setSelectedReserva(reserva);
        setEstadoEdit(reserva.estado); // Pre-llenamos el estado a editar
        setShowEditModal(true);
    };

    const handleEliminar = (reserva) => {
        setSelectedReserva(reserva);
        setShowDeleteModal(true);
    };

    // ---  Funciones de la API para las modales ---

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Acceso denegado");
            
            const response = await fetch(
                `http://localhost:8080/api/reservas/${selectedReserva.id}`, 
                {
                    method: 'DELETE',
                    headers: { 'x-access-token': token }
                }
            );
            if (!response.ok) throw new Error('Error al eliminar');
            
            setShowDeleteModal(false);
            fetchReservas(); // Recargamos la lista
        } catch (err) {
            setError(err.message);
        }
    };

    const confirmUpdateEstado = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Acceso denegado");

            //  ¡Llamamos al endpoint PUT!
            const response = await fetch(
                `http://localhost:8080/api/reservas/${selectedReserva.id}`, 
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                    body: JSON.stringify({ estado: estadoEdit })// Solo enviamos el estado
                }
            );
            if (!response.ok) throw new Error('Error al actualizar');
            
            setShowEditModal(false);
            fetchReservas(); // Recargamos la lista
        } catch (err) {
            setError(err.message);
        }
    };
    
    //  Función para dar color a los estados
    const getEstadoClass = (estado) => {
        switch (estado) {
            case 'Confirmada': return 'bg-green-100 text-green-800';
            case 'Completada': return 'bg-blue-100 text-blue-800';
            case 'Cancelada': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    //  Clases para los botones de filtro
    const baseFiltroClass = "font-semibold py-2 px-6 rounded-lg transition-colors";
    const activeFiltroClass = "bg-terracota text-white";
    const inactiveFiltroClass = "bg-white text-terracota hover:bg-terracota/20";

    return (
        <>
            {/*Seccion 1: Titulo y Filtros */}
            <section className="mb-8">
                <h1 className="font-extrabold font-sans text-5xl text-grisvolcan mb-6">
                    Gestión de Reservas
                </h1>
                
                {/*  Filtros dinámicos  */}
                <div className="flex space-x-4">
                    <button 
                        onClick={() => setFiltroActivo('hoy')}
                        className={`${baseFiltroClass} ${filtroActivo === 'hoy' ? activeFiltroClass : inactiveFiltroClass}`}
                    >
                        Hoy
                    </button>
                    <button 
                        onClick={() => setFiltroActivo('proximas')}
                        className={`${baseFiltroClass} ${filtroActivo === 'proximas' ? activeFiltroClass : inactiveFiltroClass}`}
                    >
                        Próximas (7 días)
                    </button>
                    <button 
                        onClick={() => setFiltroActivo('pasadas')}
                        className={`${baseFiltroClass} ${filtroActivo === 'pasadas' ? activeFiltroClass : inactiveFiltroClass}`}
                    >
                        Pasadas
                    </button>
                    <button 
                        onClick={() => setFiltroActivo('todas')}
                        className={`${baseFiltroClass} ${filtroActivo === 'todas' ? activeFiltroClass : inactiveFiltroClass}`}
                    >
                        Todas
                    </button>
                </div>
            </section>

            {/*Seccion 2: Tabla de reservas  */}
            <section className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Cliente</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Fecha</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Hora</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Personas</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Estado</th>
                                <th className="py-3 px-6 text-left text-parrafo font-cuerpo">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr><td colSpan="6" className="py-4 px-6 text-center text-gray-500">Cargando reservas...</td></tr>
                            )}
                            {error && (
                                <tr><td colSpan="6" className="py-4 px-6 text-center text-red-600">{error}</td></tr>
                            )}
                            {!loading && reservas.length === 0 && (
                                <tr><td colSpan="6" className="py-4 px-6 text-center text-gray-500">No se encontraron reservas para este filtro.</td></tr>
                            )}
                            {!loading && reservas.map((reserva) => (
                                <tr key={reserva.id} className="border-b border-gray-200">
                                    <td className="py-4 px-6 font-semibold text-grisvolcan">{reserva.nombreCliente}</td>
                                    <td className="py-4 px-6 text-parrafo">
                                        {new Date(reserva.fechaHora).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="py-4 px-6 text-parrafo">
                                        {new Date(reserva.fechaHora).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="py-4 px-6 text-parrafo">{reserva.numPersonas}</td>
                                    <td className="py-4 px-6">
                                        <span className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded ${getEstadoClass(reserva.estado)}`}>
                                            {reserva.estado}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        {/*  Botones de acciones con iconos */}
                                        <div className="flex gap-3">
                                            <button onClick={() => handleVerDetalle(reserva)} className="text-blue-600 hover:text-blue-800 text-xl" title="Ver Detalles"><FiEye /></button>
                                            <button onClick={() => handleEditar(reserva)} className="text-terracota hover:text-rojoquemado text-xl" title="Editar Estado"><FiEdit2 /></button>
                                            <button onClick={() => handleEliminar(reserva)} className="text-rojoquemado hover:text-red-800 text-xl" title="Eliminar"><FiTrash2 /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* --- Sección de Modales --- */}

            {/* Modal "Ver Detalles" (Frame 16) */}
            {showDetailModal && selectedReserva && (
                <Modal onClose={() => setShowDetailModal(false)}>
                    <h2 className="text-2xl font-bold text-grisvolcan mb-4">Detalles de Reserva #{selectedReserva.id}</h2>
                    <div className="space-y-2 text-parrafo">
                        <p><strong>Cliente:</strong> {selectedReserva.nombreCliente}</p>
                        <p><strong>Email:</strong> {selectedReserva.email}</p>
                        <p><strong>Teléfono:</strong> {selectedReserva.telefono}</p>
                        <p><strong>Fecha:</strong> {new Date(selectedReserva.fechaHora).toLocaleString('es-MX', { dateStyle: 'full', timeStyle: 'short' })}</p>
                        <p><strong>Personas:</strong> {selectedReserva.numPersonas}</p>
                        <p><strong>Estado:</strong> {selectedReserva.estado}</p>
                    </div>
                </Modal>
            )}

            {/* Modal "Editar Estado"  */}
            {showEditModal && selectedReserva && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <h2 className="text-2xl font-bold text-grisvolcan mb-4">Actualizar Reserva #{selectedReserva.id}</h2>
                    <p className="text-parrafo mb-4"><strong>Cliente:</strong> {selectedReserva.nombreCliente}</p>
                    <div className="mb-4">
                        <label htmlFor="estado" className="block text-parrafo font-cuerpo mb-2">Estado de la Reserva</label>
                        <select 
                            id="estado"
                            value={estadoEdit}
                            onChange={(e) => setEstadoEdit(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white"
                        >
                            <option value="Confirmada">Confirmada</option>
                            <option value="Completada">Completada</option>
                            <option value="Cancelada">Cancelada</option>
                            <option value="No Asistió">No Asistió</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button onClick={() => setShowEditModal(false)} className="bg-gray-200 text-grisvolcan font-semibold py-2 px-5 rounded-lg hover:bg-gray-300">Cancelar</button>
                        <button onClick={confirmUpdateEstado} className="bg-rojoquemado text-white font-semibold py-2 px-5 rounded-lg hover:bg-terracota">Actualizar</button>
                    </div>
                </Modal>
            )}

            {/* Modal "Eliminar"  */}
            {showDeleteModal && selectedReserva && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <h2 className="text-2xl font-bold text-grisvolcan mb-4">⚠️ ¿Estás seguro?</h2>
                    <p className="text-parrafo mb-6">
                        Estás a punto de eliminar la reserva de: 
                        <strong className="text-rojoquemado"> {selectedReserva.nombreCliente}</strong>.
                    </p>
                    <div className="flex justify-end gap-4">
                        <button onClick={() => setShowDeleteModal(false)} className="bg-gray-200 text-grisvolcan font-semibold py-2 px-5 rounded-lg hover:bg-gray-300">Cancelar</button>
                        <button onClick={confirmDelete} className="bg-rojoquemado text-white font-semibold py-2 px-5 rounded-lg hover:bg-rojoquemado/80">Sí, eliminar</button>
                    </div>
                </Modal>
            )}
        </>
    );
};

// (DEV) 11. Componente genérico de Modal
const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ReservasAdmin;