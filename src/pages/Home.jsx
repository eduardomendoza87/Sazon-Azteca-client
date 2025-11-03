import React from "react";
// --- COMPONENTES ---
import ButtonPrimary from "../components/buttons/buttonPrimary"; 
import SectionWrapper from "../components/textures/SectionWrapper";

// --- IMÁGENES ---
import gastronomia_raices from "../assets/Gastronomia.jpg";
import imgEnchiladas from "../assets/imagen1.png";
import imgMole from "../assets/imagen2.png";
import imgAguas from "../assets/imagen3.png";
import foto_chef from "../assets/foto_chef.png";


const Home = () => {
  return (
    <>
      {/* === SECCIÓN 1: HERO (LA IMAGEN) === */}
      <section>
        <img
          src={gastronomia_raices}
          alt="Raices mexicanas"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* === SECCIÓN 2: MANIFIESTO (EL TEXTO) === */}
      <section className="bg-fondo py-16 px-4"> 
        
        <div className="max-w-2xl mx-auto text-center">
          
          <h1 className="font-extrabold font-sans text-6xl text-grisvolcan mb-4">
            Sazon Azteca
          </h1>

          <p className="font-cuerpo text-2xl text-parrafo mb-8">
            Rescatando la herencia de la cocina mexicana.
          </p>

          <div className="flex justify-center">
            <ButtonPrimary>Ver el menu</ButtonPrimary>
          </div>
        </div>
      </section>
    
      {/* === SECCIÓN 3: DESCUBRE NUESTRO MENÚ === */}
      <SectionWrapper title="Descubre nuestro menu">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Tarjeta 1: Desayunos */}
          <div className="flex flex-col items-center text-center">
            <img src={imgEnchiladas} alt="Desayunos" className="w-full h-48 object-cover rounded-lg mb-8" />
            <p className="font-bold text-parrafo text-lg mb-8">
              Cada mañana te ofrecemos desayunos recién hechos...
            </p>
            <ButtonPrimary>Ver el menu</ButtonPrimary>
          </div>

          {/* Tarjeta 2: Comidas */}
          <div className="flex flex-col items-center text-center">
            <img src={imgMole} alt="Comidas" className="w-full h-48 object-cover rounded-lg mb-8" />
            <p className="font-bold text-parrafo text-lg mb-8">
              En nuestras cocinas todos los días preparamos...
            </p>
            <ButtonPrimary>Ver el menu</ButtonPrimary>
          </div>

          {/* Tarjeta 3: Bebidas */}
          <div className="flex flex-col items-center text-center">
            <img src={imgAguas} alt="Bebidas" className="w-full h-48 object-cover rounded-lg mb-8" />
            <p className="font-bold text-parrafo text-lg mb-8">
              Aguas frescas hechas con fruta de temporada...
            </p>
            <ButtonPrimary>Ver el menu</ButtonPrimary>
          </div>

        </div>
      </SectionWrapper>

      {/* === SECCIÓN 4: NUESTRO EQUIPO === */}
      <section className="bg-blancohueso py-16 px-4">
        
        {/* Layout de 2 columnas con HTML correcto */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          {/* --- COLUMNA IZQUIERDA: TEXTO --- */}
          <div className="text-center md:text-left">
            <h2 className="font-bold font-sans text-5xl text-grisvolcan mb-8">
              Nuestro equipo
            </h2>
            <p className="font-cuerpo text-2xl font-bold text-grisvolcan mb-2">Chef</p>
            <p className="font-cuerpo text-2xl font-bold text-grisvolcan mb-8">Ricardo Perez Muñoz</p>
            <p className="font-cuerpo text-lg text-parrafo">
Considerado como uno de los 24 top chefs de Latinoamérica por la revista Gato Pardo (en el 2002) y uno de los siete más importantes de México según la  revista Día Siete de México (también en el 2002) así como uno de los 12 mejores chefs de México de acuerdo con la cadena de restaurantes Sanborns.            </p>
          </div>

          {/* --- COLUMNA DERECHA: IMAGEN --- */}
          <div className="flex justify-center md:justify-end">
            <img
              src={foto_chef}
              alt="foto del chef - Perfil"
              className="w-full max-w-sm lg:max-w-md h-auto rounded-lg shadow-xl object-cover"
            />
          </div>

        </div>
      </section>
    </>
  );
};
export default Home;

