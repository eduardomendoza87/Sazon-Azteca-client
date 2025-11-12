import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Asegúrate de que Link esté importado

const HomeAdmin = () => {
    // (DEV) Array de estadisticas (sigue siendo mock data por ahora)
    const statistics = [
        { title: "Reservas Hoy", value: 25, icon: "📅" },
        { title: "Reservas Próximos 7 días", value: 50, icon: "📅" },
        { title: "Platillos Activos", value: 30, icon: "🍽️" },
        { title: "Artículos Publicados", value: 15, icon: "📰" },
    ];

    // (DEV) Estado para guardar las reservas reales
    const [reservasHoy, setReservasHoy] = useState([]);
    const [error, setError] = useState(null);

    // (DEV) Usamos useEffect para llamar a la API cuando el componente carga
    useEffect(() => {
        const fetchReservasHoy = async () => {
            try {
                // (DEV) Obtenemos el token del Admin que guardamos en el Login
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("No autorizado. Inicia sesión de nuevo.");
                    return; 
                }

                // (DEV) ¡Llamamos al endpoint que construimos!
                const response = await fetch(
                    'http://localhost:8080/api/reservas?filtro=hoy', 
                    {
                        headers: {
                            'x-access-token': token
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('Error al cargar las reservas.');
                }

                const data = await response.json();
                setReservasHoy(data); 
                
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            }
        };

        fetchReservasHoy();
    }, []); 

    return (
      <>
        {/*Seccion 1: Titulo y subtitulo (Sin cambios) */}
        <section className="bg-fondo py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-extrabold font-sans text-6xl text-grisvolcan mb-4">
                          Bienvenido al Panel de Administración          {" "}
            </h1>
                     {" "}
            <p className="text-parrafo text-2xl font-cuerpo mb-8 gap-6">
              Aquí tienes el resumen de Sazón Azteca para hoy.
            </p>
                   {" "}
          </div>
                 
        </section>

        {/*Seccion 2: Estadisticas (Sin cambios... por ahora) */}
        <section className="p-8 mx-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-2xl transition-transform transform hover:scale-105 text-center"
              >
                <div className="text-4xl mt-4">{stat.icon}</div>
                <h2 className="text-2xl font-bold text-grisvolcan mb-2">
                  {stat.value}
                </h2>
                <p className="text-parrafo text-lg font-cuerpo">{stat.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/*Seccion 3: Tabla de reservas */}
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
                {reservasHoy.length > 0 ? (
                  reservasHoy.map((reserva) => (
                    <tr key={reserva.id}>
                      <td className="py-4 px-6 border-b border-gray-200">
                        {reserva.nombreCliente}
                      </td>
                      {/* --- (DEV) COLUMNA DE FECHA RESTAURADA --- */}
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
                      {/* --- (DEV) BOTÓN DE ACCIONES RESTAURADO --- */}
                      <td className="py-4 px-6 border-b border-gray-200">
                        {/* (PM) Esta ruta debe coincidir con tu sidebar */}
                        <Link
                          to="/admin/reservas"
                          className="text-terracota hover:text-rojoquemado font-semibold"
                        >
                          Ver detalles
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-4 px-6 text-center text-gray-500"
                    >
                      No hay reservas confirmadas para hoy.
                    </td>
                  </tr>
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

        {/*Seccion 4: Creacion de contenidos rapidos*/}
        <section className="p-8 mx-4 mb-8">
          <h2 className="text-3xl font-bold text-grisvolcan text-center mb-6">
            Crear Nuevo Contenido
          </h2>
          <div className="flex items-center justify-between mb-6 gap-8">
            <Link
              to="/nuevo-platillo"
              className="focus:outline-none 
                 text-white bg-rojoquemado 
                 hover:bg-terracota 
                 focus:ring-4 focus:ring-rojoquemado/50 
                 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              + Nuevo Platillo
            </Link>
            <Link
              to="/nuevo-articulo"
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