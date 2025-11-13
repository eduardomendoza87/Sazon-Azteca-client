import React from "react";
import { Link } from "react-router-dom";


const CategoriasAdmin = () =>{
    return(
       <>
       {/*Seccion 1: Titulo y subtitulo (Sin cambios) */}
        <section className="bg-fondo py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-extrabold font-sans text-6xl text-grisvolcan mb-4">
                          Gestion de categorias
            </h1>
                     {" "}
            <p className="text-parrafo text-2xl font-cuerpo mb-8 gap-6">
              Añade, edita o elimina las categorías que se usarán en los menús de platillos y relatos.
            </p>
                   {" "}
          </div>
          </section>

        {/*Seccion 2: Boton para crear nuevo platillo*/}
        <section >
            <div className="flex justify-center-safe mb-2 gap-6 ">
                <Link
                          to="/admin/crear-categoria"
                          className="bg-green-700 text-white hover:text-fondo font-semibold rounded-lg"
                        >
                          Crear nueva categoría
                        </Link>


            </div>

        </section>


        {/*Seccion 2: Tabla de platillos*/ }
        <section className="p-8 mx-4 mb-8">
            <h2 className="text-2xl font-bold text-grisvolcan text-center mb-6">Tabla de platillos</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-2xl rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">Nombre de la categoría</th>
                            <th className="py-3 px-6 bg-gray-200 text-left text-parrafo font-cuerpo">Acciones</th>
                        </tr>
                    </thead>
                    {/* Aquí irían las filas de platillos  */}
                    <tbody>
                        <tr>
                            <td className="py-4 px-6 border-b border-gray-200">Platos fuertes</td>
                             <td className="py-4 px-6 border-b border-gray-200">
                        {/* (PM) Esta ruta debe coincidir con tu sidebar */}
                        <div className="flex items-center  mb-6 gap-6 ">
                        <Link
                          to="/admin/actualizar-categoria"
                          className="bg-green-700 text-white hover:text-fondo font-semibold rounded-lg"
                        >
                          Actualizar
                        </Link> 
                       
                        <Link
                          to="/admin/eliminar-categoria"
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
export default CategoriasAdmin;