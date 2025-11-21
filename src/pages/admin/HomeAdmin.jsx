import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Asegúrate de que Link esté importado

const HomeAdmin = () => {
    
    // (DEV) 1. ¡Estado para las estadísticas!
    const [stats, setStats] = useState({
        reservasHoy: 0,
        reservasProximas: 0,
        platillosActivos: 0,
        articulosPublicados: 0
    });

    // (DEV) Estado para las reservas de hoy
    const [reservasHoy, setReservasHoy] = useState([]);
    
    // (DEV) Estado unificado para errores y carga
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // (DEV) 2. useEffect ahora cargará AMBOS endpoints
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // (DEV) Obtenemos el token del Admin
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No autorizado. Inicia sesión de nuevo.");
                }

                // (DEV) 3. Preparamos las dos llamadas a la API
                const headers = { 'x-access-token': token };

                const [reservasResponse, statsResponse] = await Promise.all([
                    // Llamada 1: Reservas de Hoy
                    fetch('http://localhost:8080/api/reservas?filtro=hoy', { headers }),
                    // Llamada 2: ¡El endpoint de Estadísticas!
                    fetch('http://localhost:8080/api/admin/dashboard-stats', { headers })
                ]);

                if (!reservasResponse.ok) throw new Error('Error al cargar las reservas.');
                if (!statsResponse.ok) throw new Error('Error al cargar las estadísticas.');

                const reservasData = await reservasResponse.json();
                const statsData = await statsResponse.json();

                // (DEV) 4. ¡Guardamos AMBOS datos en el estado!
                setReservasHoy(reservasData);
                setStats(statsData);
                
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false); // (DEV) Dejamos de cargar
            }
        };

        fetchData();
    }, []); // El array vacío [] significa "ejecútate solo una vez al cargar"

    // (DEV) 5. Re-creamos el array de estadísticas basado en el estado
    // para que tu JSX .map() siga funcionando.
    const statistics = [
        { title: "Reservas Hoy", value: stats.reservasHoy, icon: "📅" },
        { title: "Reservas Próximos 7 días", value: stats.reservasProximas, icon: "📅" },
        { title: "Platillos Activos", value: stats.platillosActivos, icon: "🍽️" },
        { title: "Artículos Publicados", value: stats.articulosPublicados, icon: "📰" },
    ];

    return (
        <>
            {/*Seccion 1: Titulo y subtitulo (Sin cambios) */}
            <section className="bg-fondo py-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="font-extrabold font-sans text-6xl text-grisvolcan mb-4">
                        Bienvenido al Panel de Administración
                    </h1>
                    <p className="text-parrafo text-2xl font-cuerpo mb-8 gap-6">
                        Aquí tienes el resumen de Sazón Azteca para hoy.
                    </p>
                </div>
            </section>

            {/*Seccion 2: Estadisticas (¡CONECTADA!) */}
            <section className="p-8 mx-4 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    {/* (DEV) 6. Tu .map() ahora usa el array dinámico */}
                    {statistics.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-2xl transition-transform transform hover:scale-105 text-center"
                        >
                            <div className="text-4xl mt-4">{stat.icon}</div>
                            <h2 className="text-2xl font-bold text-grisvolcan mb-2">
                                {loading ? '...' : stat.value} {/* Muestra '...' mientras carga */}
                            </h2>
                            <p className="text-parrafo text-lg font-cuerpo">{stat.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/*Seccion 3: Tabla de reservas (Tu código anterior, ya conectado) */}
            <section className="p-8 mx-4 mb-8">
                <h2 className="text-3xl font-bold text-grisvolcan text-center mb-6">
                    Reservas Confirmadas Hoy
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-2xl rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">
                                    Nombre de cliente
                                </th>
                                <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">
                                    Fecha
                                </th>
                                <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">
                                    Hora
                                </th>
                                <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">
                                    Personas
                                </th>
                                <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">
                                    Estado
                                </th>
                                <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">
                                    Contacto
                                </th>
                                <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan="7" className="py-4 px-6 text-center text-gray-500">
                                        Cargando datos...
                                    </td>
                                </tr>
                            )}
                            {!loading && reservasHoy.length > 0 ? (
                                reservasHoy.map((reserva) => (
                                    <tr key={reserva.id}>
                                        <td className="py-4 px-6 border-b border-gray-200">
                                            {reserva.nombreCliente}
                                        </td>
                                        <td className="py-4 px-6 border-b border-gray-200">
                                            {new Date(reserva.fechaHora).toLocaleDateString(
                                                "es-MX",
                                                { day: "2-digit", month: "short", year: "numeric" }
                                            )}
                                        </td>
                                        <td className="py-4 px-6 border-b border-gray-200">
                                            {new Date(reserva.fechaHora).toLocaleTimeString(
                                                "es-MX",
                                                { hour: "2-digit", minute: "2-digit" }
                                            )}
                                        </td>
                                        <td className="py-4 px-6 border-b border-gray-200">
                                            {reserva.numPersonas}
                                        </td>
                                        <td className="py-4 px-6 border-b border-gray-200">
                                            <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
                                                {reserva.estado}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 border-b border-gray-200">
                                            {reserva.telefono}
                                        </td>
                                        <td className="py-4 px-6 border-b border-gray-200">
                                            <Link
                                                to="/admin/reservas" // (PM) Enlace a la página principal de reservas
                                                className="text-terracota hover:text-rojoquemado font-semibold"
                                            >
                                                Ver detalles
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                !loading && ( // Solo muestra si NO está cargando
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="py-4 px-6 text-center text-gray-500"
                                        >
                                            No hay reservas confirmadas para hoy.
                                        </td>
                                    </tr>
                                )
                            )}
                            {error && (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="py-4 px-6 text-center text-red-600"
                                    >
                                        Error: {error}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/*Seccion 4: Creacion de contenidos rapidos (Sin cambios) */}
            <section className="p-8 mx-4 mb-8">
                <h2 className="text-3xl font-bold text-grisvolcan text-center mb-6">
                    Crear Nuevo Contenido
                </h2>
                <div className="flex items-center justify-between mb-6 gap-8">
                    <Link
                        to="/admin/crear-platillo" 
                        className="focus:outline-none 
                           text-white bg-rojoquemado 
                           hover:bg-terracota 
                           focus:ring-4 focus:ring-rojoquemado/50 
                           font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                        + Nuevo Platillo
                    </Link>
                    <Link
                        to="/admin/crear-articulo" 
                        className="focus:outline-none 
                           text-white bg-rojoquemado 
                           hover:bg-terracota 
                           focus:ring-4 focus:ring-rojoquemado/50 
                           font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                        + Nuevo Artículo
                    </Link>
                </div>
            </section>
        </>
    );
}

export default HomeAdmin;