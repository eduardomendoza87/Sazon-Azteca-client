import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import ButtonPrimary from "../components/buttons/buttonPrimary";
import SectionWall from "../components/textures/SectionWall";

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
  "Desayunos"
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
    categoria: "Desayunos",
    precio: "$95 MXN",
    boton: "Ver historia del platillo",
  },
  { 
    id: 4, 
    titulo: "Pozole (Copia)",
    descripcion: "Un clásico de las fiestas mexicanas...",
    imagen: menu_pozole,
    categoria: "Desayuno",
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

// (DEV) 2. Creamos el estado para la categoría activa
    const [activeCategory, setActiveCategory] = useState("Todos");

    // (DEV) 3. Creamos el array filtrado ANTES del return
    const filteredMenu = menuComidas.filter(item => {
        // Si la categoría activa es "Todos", devolvemos todos los items
        if (activeCategory === "Todos") {
            return true;
        }
        // Si no, solo devolvemos los items que coincidan
        return item.categoria === activeCategory;
    });

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

      {/* === SECCIÓN 3 REFACTORIZADA === */}
            <section className="bg-fondo pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-extrabold text-3xl text-grisvolcan mb-8">
                        Explora Nuestras Categorías
                    </h2>
                    
                    {/* (DEV) 4. Mapeamos el array 'categorias' para crear los botones */}
                    <div className="flex justify-center gap-4 flex-wrap">
                        {categorias.map((categoria) => (
                            <button
                                key={categoria}
                                onClick={() => setActiveCategory(categoria)} // (DEV) 5. Asignamos el onClick
                                
                                // (UX) 6. Asignamos clases dinámicas para el estado activo/inactivo
                                className={`font-cuerpo font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300
                                    ${activeCategory === categoria 
                                        ? 'bg-rojoquemado text-white' // (UX) Estilo activo (Asumiendo 'bg-rojoquemado')
                                        : 'bg-terracota text-grisvolcan hover:bg-rojoquemado/80' // (UX) Estilo inactivo
                                    }
                                `}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

   
            {/* === SECCIÓN DE MENÚ REFACTORIZADA === */}
            <SectionWall title="Lista">
                
               <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        pagination={{ clickable: true }}
        className="pb-16"
        
        /* (DEV) 'style' es un prop. Cierra aquí */
        style={{
            '--swiper-pagination-color': '#3E41', 
            '--swiper-pagination-bullet-inactive-color': '#9A4A3A',
            '--swiper-pagination-bullet-inactive-opacity': '0.5'
        }}
        
        /* (QA/DEV) 'breakpoints' es un prop separado, al mismo nivel */
        breakpoints={{
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }}
    >
                    {/* (DEV) 7. Mapeamos el 'filteredMenu' en lugar de 'menuComidas' */}
                    {filteredMenu.map((item) => (
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
                {/* (QA) Manejo de estado vacío: Si no hay items, muestra un mensaje */}
                {filteredMenu.length === 0 && (
                    <div className="text-center text-grisvolcan text-xl py-16">
                        <p>No hay platillos en esta categoría.</p>
                        <p>Prueba seleccionando "Todos".</p>
                    </div>
                )}
            </SectionWall>
      
      {/*Seccion de boton*/}
      <section>
        <div className="mb-8 gap-10">
          <h3 className="text-grisvolcan text-center text-4xl font-sans font-extrabold mb-8">
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

export default Menu;