import React from "react";
import { Link } from "react-router-dom";


const ArticulosAdmin = () =>{
    return(
       <>
       {/*Seccion 1: Titulo y subtitulo (Sin cambios) */}
        <section className="bg-fondo py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-extrabold font-sans text-6xl text-grisvolcan mb-4">
                          Gestion de articulos
            </h1>
                     {" "}
            <p className="text-parrafo text-2xl font-cuerpo mb-8 gap-6">
              Gestiona los articulos  de la plataforma
            </p>
                   {" "}
          </div>
          </section>

        {/*Seccion 2: Boton para crear nuevo platillo*/}
        <section >
            <div className="flex justify-center-safe mb-2 gap-6 ">
                <Link
                          to="/admin/crear-articulo"
                          className="bg-green-700 text-white hover:text-fondo font-semibold rounded-lg"
                        >
                          Crear nuevo articulo
                        </Link>


            </div>

        </section>


        {/*Seccion 2: Tabla de platillos*/ }
        <section className="p-8 mx-4 mb-8">
            <h2 className="text-2xl font-bold text-grisvolcan text-center mb-6">Tabla de articulos</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-2xl rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">Nombre del articulo</th>
                            <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">Categoria</th>
                            <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">Autor</th>
                            <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">Fecha de publicacion</th>
                            <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">Acciones</th>
                        </tr>
                    </thead>
                    {/* Aquí irían las filas de platillos  */}
                    <tbody>
                        <tr>
                            <td className="py-4 px-6 border-b border-gray-200">Ingredientes mas usados en 2025</td>
                            <td className="py-4 px-6 border-b border-gray-200">Investigacion</td>
                            <td className="py-4 px-6 border-b border-gray-200">Adolfo Lopez</td>
                            <td className="py-4 px-6 border-b border-gray-200">2025-11-01</td>
                             <td className="py-4 px-6 border-b border-gray-200">
                        {/* (PM) Esta ruta debe coincidir con tu sidebar */}
                        <div className="flex items-center  mb-6 gap-6 ">
                        <Link
                          to="/admin/actualizar-platillo"
                          className="bg-green-700 text-white hover:text-fondo font-semibold rounded-lg"
                        >
                          Actualizar
                        </Link> 
                       
                        <Link
                          to="/admin/eliminar-platillo"
                          className="bg-terracota text-white hover:text-fondo font-semibold rounded-lg"
                        >
                          Eliminar
                        </Link>
                        </div>
                      </td>




                
                        </tr>
                    </tbody>
                </table>
            </div>
            
            
            </section>
       
       </>

    );
};
export default ArticulosAdmin;