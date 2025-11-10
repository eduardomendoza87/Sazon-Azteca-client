import React from "react";
import { Link } from "react-router-dom";


//Imagenes
import relatos_imagen from "../assets/relatos.jpg";
import receta_mole from "../assets/menu_mole.jpg";
import receta_chilaquiles_verdes from "../assets/menu_chilaquiles_verdes.jpg";
import investigacion_ingredientes from "../assets/articulos/investigacion_ingredientes.jpg";


//componentes
import SectionWall from "../components/textures/SectionWall";


const Stories = () => {
    
    //Array de datos de articulos (¡Propiedad 'slug' agregada!)
    const articulosBlog =[
        {id:1,
        slug: "receta-mole-poblano", // CLAVE: Agregado para la navegación dinámica
        titulo:"Receta para el mole poblano",
        categoria:"Receta",
        imagen:receta_mole,
        descripcion:"Descubre los secretos del auténtico mole poblano, una joya culinaria de México que combina chiles, especias y chocolate en una salsa rica y compleja. Aprende a preparar esta deliciosa receta tradicional que ha sido transmitida de generación en generación.",     
        autor:"Adolfo Lopez"
        },
        {id:2,
        slug: "ingredientes-mas-usados", // CLAVE: Agregado
        titulo:"Ingredientes mas usados en el año 2025",
        categoria:"Investigacion",
        imagen:investigacion_ingredientes,
        descripcion:"Explora los ingredientes más utilizados en la cocina mexicana en 2025, analizando tendencias y preferencias que han surgido en la gastronomía contemporánea.",
        autor:"Jorge Ruiz"
        },
        {id:3,
        slug: "receta-enchiladas-verdes", // CLAVE: Agregado
        titulo:"Receta para enchiladas verdes",
        categoria:"Receta",
        imagen: receta_chilaquiles_verdes,
        descripcion:"Aprende a preparar enchiladas verdes, un platillo tradicional mexicano hecho con tortillas rellenas de pollo y bañadas en una salsa verde fresca y picante.",
        autor:"Adolfo Lopez"
        }
    ]
    
    
    return (
      <>
        {/*Seccion 1:Hero Imagen*/}
        <section>
          <img
            src={relatos_imagen}
            alt="Menu mexicano"
            className="w-full h-auto object-cover"
          />
        </section>

        {/*Seccion 2 Titulo y subtitulo*/}
        <section className="bg-fondo py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-extrabold text-6xl text-grisvolcan mb-8">
              RELATOS DESDE LA RAÍZ
            </h1>
            <p className="font-medium text-2xl text-parrafo mb-8">
              La historia y la ciencia detrás de cada ingrediente.
            </p>
          </div>
        </section>

        {/*Seccion de cards de articulos */}
        <SectionWall title="Articulos">
          {/*Seccion "Directo de la milpa"*/}
          <section>
            {/* Contenedor principal para padding y ancho */}
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
                {articulosBlog.map((articulo) => (
                  <div
                    key={articulo.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    <h3 className="font-semibold text-xl text-grisvolcan text-center mb-4">
                      {articulo.titulo}
                    </h3>
                    <img
                      src={articulo.imagen}
                      alt={articulo.titulo}
                      className="w-full h-48 object-cover mb-4 rounded"
                    />

                    {/* Badge de categoria */}
                    <div className=" flex items-center justify-center mb-4">
                      <span className="inline-block bg-terracota text-white text-sm px-3 py-1 rounded-full">
                        {articulo.categoria}
                      </span>
                    </div>
                    <p className="font-cuerpo text-parrafo text-center mb-4 ">
                      {articulo.descripcion}
                    </p>
                    <p className="font-cuerpo text-parrafo text-center mb-4 ">
                      Autor: {articulo.autor}
                    </p>
                    {/* SECCIÓN BOTÓN LEER MÁS (NAVEGACIÓN DINÁMICA) */}
                    <div className="mt-auto text-center">
                      <Link
                        to={`/relatos/${articulo.slug}`}
                        className="bg-terracota text-white px-4 py-2 rounded 
               hover:bg-rojoquemado transition-colors duration-300"
                      >
                        Leer más
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionWall>
      </>
    );
};
export default Stories;