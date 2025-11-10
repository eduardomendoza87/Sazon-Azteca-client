import React from "react";
import { Link } from "react-router-dom";
//Imagenes 
import filosofia_hero2 from "../assets/filosofia_hero2.jpg";
import directomilpa1 from "../assets/directomilpa1.png"
import directomilpa2 from "../assets/directomilpa2.png"
import directomilpa3 from "../assets/directomilpa3.png"
import cocina_mexicana from "../assets/cocina_mexicana.png";

//boton
import ButtonSecondary from "../components/buttons/buttonSecondary";
import ButtonPrimary from "../components/buttons/buttonPrimary";

// textura fondo
import SectionWall from "../components/textures/SectionWall"; 

const OurPhilosophy = () => {

  const directomilpa = [
    { 
      id:1,
      titulo: "Maíz Nixtamalizado",
      imagen: directomilpa1,
      descripcion:"Protegemos el maíz nativo, usando solo nixtamalización tradicional, libre de transgénicos.",
    },
    { 
      id:2,
      titulo: "Quelites y Chiles",
      imagen: directomilpa2,
      descripcion:"Rescatamos ingredientes olvidados como el 'aguacate criollo' y los 'quelites' de productores locales.",
    },
    { 
      id:3,
      titulo: "Comal y Leña",
      imagen: directomilpa3,
      descripcion:"Nuestros sabores nacen del barro, la piedra volcánica y el fuego de la leña, no de la prisa.",
    },
  ];

  return (
    <>
      {/*Seccion 1: Hero Imagen */}
      <section>
        <img
          src={filosofia_hero2}
          alt="Nuestra filosofia"
          className="w-full h-auto object-cover"
        />
      </section>

      {/*Seccion de titulo y subtitulo*/}
      <section className="bg-fondo py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-extrabold text-6xl text-grisvolcan mb-4">
            Nuestra Filosofía
          </h1>
          <p className="font-cuerpo text-2xl text-parrafo mb-8">
            Más que un restaurante, somos una expresión cultural que honra la
            tradición.
          </p>
        </div>
      </section>

      {/*Seccion "El rescate de la herencia"*/}
      <SectionWall title="El rescate de la herencia">
        {/* Layout de 2 columnas */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Columna 1: Texto */}
          <div className="text-center md:text-left">
            <p className="font-cuerpo text-lg text-parrafo">
              En Sazon azteca, nuestra misión es más que servir comida; es
              revalorizar una herencia. Creemos que cada platillo es una
              expresión cultural, por eso honramos las técnicas ancestrales: la
              nixtamalización diaria de nuestro maíz criollo, la paciencia del
              comal de barro y el sabor inconfundible de la leña.
            </p>
          </div>

          {/* Columna 2: Imagen */}
          <div className="flex justify-center">
            <img
              src={cocina_mexicana}
              alt="Cocina mexicana"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </SectionWall>

      {/*Seccion "Directo de la milpa"*/}
      <section className="bg-fondo py-16 px-4">
        {/* Contenedor principal para padding y ancho */}
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <h2 className="font-extrabold text-5xl text-grisvolcan text-center mb-16">
            Directo de la Milpa
          </h2>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
            {directomilpa.map((datos) => (
              <div
                key={datos.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <h3 className="font-semibold text-xl text-grisvolcan text-center mb-4">
                  {datos.titulo}
                </h3>
                <img
                  src={datos.imagen}
                  alt={datos.titulo}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <p className="font-cuerpo text-parrafo text-center mb-4 ">
                  {datos.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*Seccion de boton*/}
      <section>
        <div className="mb-8 gap-10">
          <h3 className="text-grisvolcan text-center text-4xl font-sans font-extrabold">
            Prueba nuestra filosofia
          </h3>
        </div>
        <div className="flex items-center justify-center mb-8 gap-8">
          <Link to="/reservas">
          <ButtonPrimary>Reservar</ButtonPrimary>
          </Link>
        </div>
      </section>
    </>
  );
};

export default OurPhilosophy;

