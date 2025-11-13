import React from "react";
import { Link } from "react-router-dom";

const FormsCrearCategoria = () => {
    return(
              <section className="min-h-screen w-full flex items-center justify-center">
                
    
                {/*Seccion del formulario*/}
                <section className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-extrabold text-center text-grisvolcan mb-6">Crear nueva categoría</h1>
                    <p className="text-center mb-6">Crea una nueva categoría para el menú.</p>
                    <h2 className="text-2xl text-center font-extrabold mt-6 mb-4 text-grisvolcan">Rellena el formulario</h2>
    
                    {/*Formulario de creacion de platillo*/}
                    <form className="max-w-2xl grid grid-cols-2 gap-4 mx-auto mb-8 p-6">
                       <h3 className="text-xl font-bold mb-4 col-span-2 text-grisvolcan">Información de la categoría</h3>
                        {/*Campos del formulario*/}
                       
                        {/*Nombre de la categoría*/}
                        <div className="mb-4 col-span-2">
                            <label className="block text-parrafo font-cuerpo mb-2" htmlFor="nombre">Nombre de la nueva categoría:</label>
                            <input className="w-full p-2 border border-gray-300 rounded" type="text" id="nombre" name="nombre" required />
                        </div>
    
                        {/*Boton de crear categoría y cancelar*/}
                        <div className="flex items-center-safe mb-6 gap-6">
                         <Link
                              to="/admin/categorias"
                              className="bg-red-700 text-white hover:text-fondo font-semibold rounded-lg px-4 py-2" 
                            >
                              Cancelar
                            </Link>
    
                        <div className="col-span-2 text-center">
                            <button className="bg-green-700 text-white hover:text-fondo font-semibold rounded-lg px-4 py-2" type="submit">Crear categoría</button>
                        </div>
                        </div>
    
                    </form>
    
                </section>
            </section>
    
        );
    }
export default FormsCrearCategoria;