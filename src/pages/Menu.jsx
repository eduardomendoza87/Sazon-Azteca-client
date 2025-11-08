import React from "react";

// --- 1. IMPORTACIONES DE SWIPER ---

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Importa los estilos de Swiper (esenciales)
import 'swiper/css';
import 'swiper/css/pagination';
// --- FIN DE IMPORTACIONES DE SWIPER ---

//Componentes Rutilizables
import SectionMenu from "../components/textures/SectionMenu"; 
import DishCard from "../components/ui/DishCard";
import ButtonSecondary from "../components/buttons/buttonSecondary";

//Imagenes 
import hero_menu from "../assets/menu_1.jpg";
import menu_pozole from "../assets/menu_pozole.jpg";
import menu_mole from "../assets/menu_mole.jpg";
import menu_chilaquiles from "../assets/menu_chilaquiles_verdes.jpg";

const Menu = () => {

const categorias = [
  "Todos",
  "Entradas",
  "Platos Fuertes",
  "Sopas y Ensaladas",
  "Bebidas",
  "Postres",
];

 const menuComidas = [
  { 
    id: 1,
    titulo: "Pozole",
    descripcion: "Un clásico de las fiestas mexicanas...",
    imagen: menu_pozole,
    categoria: "Platos Fuertes",
    precio: "$120 MXN",
    boton: "Ver historia del platillo",
  },
  { 
    id: 2,
    titulo: "Mole poblano",
    descripcion: "Una joya de la gastronomía mexicana...",
    imagen: menu_mole,
    categoria: "Platos Fuertes",
    precio: "$150 MXN",
    boton: "Ver historia del platillo",
  },
  { 
    id: 3,
    titulo: "Chilaquiles verdes",
    descripcion: "Crujientes totopos bañados en salsa verde...",
    imagen: menu_chilaquiles,
    categoria: "Desayuno",
    precio: "$95 MXN",
    boton: "Ver historia del platillo",
  },
  { 
    id: 4, 
    titulo: "Pozole (Copia)",
    descripcion: "Un clásico de las fiestas mexicanas...",
    imagen: menu_pozole,
    categoria: "Platos Fuertes",
    precio: "$120 MXN",
    boton: "Ver historia del platillo",
  },
  { 
    id: 5, 
    titulo: "Mole poblano (Copia)",
    descripcion: "Una joya de la gastronomía mexicana...",
    imagen: menu_mole,
    categoria: "Platos Fuertes",
    precio: "$150 MXN",
    boton: "Ver historia del platillo",
  },
];


    return(
        <>
        {/*Seccion 1:Hero Imagen*/}
        <section>
            <img 
            src={hero_menu}
            alt="Menu mexicano"
            className="w-full h-auto object-cover"
            />
        </section>

        {/*Seccion 2 Titulo y subtitulo*/}
        <section className="bg-fondo py-16 px-4"> 
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-extrabold text-6xl text-grisvolcan mb-8">
            Prueba nuestro menu
          </h1>
          <p className="font-medium text-2xl text-parrafo mb-8">
           Platillos con Historia, Hechos con Herencia
          </p>
        </div>
      </section>

      {/*Seccion 3 categorias (SIN LÓGICA DE FILTRADO AÚN) */}
      <section className="bg-fondo pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-extrabold text-3xl text-grisvolcan mb-8">
              Explora Nuestras Categorías
            </h2>
            {/*Filtros estáticos */}
            <div className="flex justify-center gap-4 flex-wrap">
              <button className="bg-terracota text-grisvolcan font-cuerpo font-medium rounded-lg text-sm px-5 py-2.5">Todos</button>
              <button className="bg-terracota text-grisvolcan font-cuerpo font-medium rounded-lg text-sm px-5 py-2.5">Desayunos</button>
              <button className="bg-terracota text-grisvolcan font-cuerpo font-medium rounded-lg text-sm px-5 py-2.5">Platos Fuertes</button>
              <button className="bg-terracota text-grisvolcan font-cuerpo font-medium rounded-lg text-sm px-5 py-2.5">Bebidas</button>
              <button className="bg-terracota text-grisvolcan font-cuerpo font-medium rounded-lg text-sm px-5 py-2.5">Postres</button>
            </div>
          </div>
      </section>

      {/* === SECCIÓN DE MENÚ CON PAGINACIÓN === */}
      <SectionMenu title="Lista">
        
        {/* 2. Iniciamos el componente Swiper */}
        <Swiper
          // Le decimos que use el módulo de Paginación
          modules={[Pagination]}
          // Espacio entre cada tarjeta
          spaceBetween={30}
          // Cuántas tarjetas mostrar a la vez (en pantallas grandes)
          slidesPerView={3}
          // Habilitamos los "puntitos" de paginación (como en tu imagen)
          pagination={{ clickable: true }}
          // Añadimos padding abajo para que los puntos no se encimen
          className="pb-16"
          
          // 3. ESTILOS PARA LOS PUNTOS (basado en tu imagen y paleta)
          style={{
            '--swiper-pagination-color': '#3E41', // Tu color 'grisvolcan' (punto activo, negro)
            '--swiper-pagination-bullet-inactive-color': '#9A4A3A', // Tu 'terracota' (puntos inactivos, grises/cafés)
            '--swiper-pagination-bullet-inactive-opacity': '0.5' // Opacidad para inactivos
          }}
        >
          {/* Mapeamos el array 'menuComidas' */}
          {menuComidas.map((item) => (
            
            // 4. Cada tarjeta va envuelta en un <SwiperSlide>
            <SwiperSlide key={item.id}>
              <DishCard
                key={item.id} 
                title={item.titulo}
                image={item.imagen}
                category={item.categoria}
                description={item.descripcion}
                price={item.precio}
                buttonText={item.boton}
                idPlatillo={item.id} 
              />
            </SwiperSlide>
          ))}

        </Swiper>
      </SectionMenu>
      
      {/*Seccion de boton*/}
      <section>
        <div className="mb-8 gap-10">
          <h3 className="text-grisvolcan text-center text-4xl font-sans font-extrabold mb-8">
            Prueba nuestra filosofia
          </h3>
        </div>
        <div className="flex items-center justify-center mb-8 gap-8">
          <ButtonSecondary>Reservar</ButtonSecondary>
        </div>
      </section>
    </>
    );
};

export default Menu;