// Ubicación: src/pages/Menu.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import DishCard from "../components/ui/DishCard";
import ButtonPrimary from "../components/buttons/buttonPrimary";
import SectionWall from "../components/textures/SectionWall";


import hero_menu from "../assets/menu_1.jpg";

const Menu = () => {
    const [platillos, setPlatillos] = useState([]); 
    const [categorias, setCategorias] = useState(["Todos"]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("Todos");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [platillosRes, categoriasRes] = await Promise.all([
                    fetch('http://localhost:8080/api/platillos'),
                    fetch('http://localhost:8080/api/categorias') 
                ]);

                if (!platillosRes.ok) throw new Error('Error al cargar el menú.');
                if (!categoriasRes.ok) throw new Error('Error al cargar las categorías.');

                const platillosData = await platillosRes.json();
                const categoriasData = await categoriasRes.json();

                setPlatillos(platillosData);
                setCategorias(["Todos", ...categoriasData.map(c => c.nombre)]);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    const filteredMenu = platillos.filter(item => {
        if (activeCategory === "Todos") {
            return true;
        }
        return item.categoria && item.categoria.nombre === activeCategory;
    });

    return(
        <>
            <section>
                <img src={hero_menu} alt="Menu mexicano" className="w-full h-auto object-cover" />
            </section>

            <section className="bg-fondo py-16 px-4"> 
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-extrabold text-6xl text-grisvolcan mb-8">Prueba nuestro menu</h1>
                    <p className="font-medium text-2xl text-parrafo mb-8">Platillos con Historia, Hechos con Herencia</p>
                </div>
            </section>

            <section className="bg-fondo pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-extrabold text-3xl text-grisvolcan mb-8">Explora Nuestras Categorías</h2>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {categorias.map((categoria) => (
                            <button
                                key={categoria}
                                onClick={() => setActiveCategory(categoria)}
                                className={`font-cuerpo font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300
                                    ${activeCategory === categoria 
                                        ? 'bg-rojoquemado text-white' 
                                        : 'bg-terracota text-grisvolcan hover:bg-rojoquemado/80'
                                    }
                                `}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <SectionWall title="Lista">
                {loading && (
                    <div className="text-center text-grisvolcan text-xl py-16"><p>Cargando menú...</p></div>
                )}
                {error && (
                    <div className="text-center text-rojoquemado text-xl py-16">
                        <p>Error al cargar el menú. Intenta de nuevo más tarde.</p>
                        <p className="text-sm">({error})</p>
                    </div>
                )}
                
                {!loading && !error && (
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        pagination={{ clickable: true }}
                        className="pb-16"
                        style={{
                            '--swiper-pagination-color': '#3E41', 
                            '--swiper-pagination-bullet-inactive-color': '#9A4A3A',
                            '--swiper-pagination-bullet-inactive-opacity': '0.5'
                        }}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 30 },
                            1024: { slidesPerView: 3, spaceBetween: 30 }
                        }}
                    >
                        {filteredMenu.map((item) => (
                            <SwiperSlide key={item.id}>
                                <DishCard
                                    key={item.id} 
                                    title={item.titulo}
                                    image={`http://localhost:8080${item.imagenUrl}`} 
                                    category={item.categoria ? item.categoria.nombre : 'General'}
                                    description={item.descripcion}
                                    price={`$${item.precio}`} 
                                    buttonText="Ver historia del platillo"
                                    idPlatillo={item.id} 
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                {!loading && !error && filteredMenu.length === 0 && (
                    <div className="text-center text-grisvolcan text-xl py-16">
                        <p>No hay platillos en esta categoría.</p>
                        <p>Prueba seleccionando "Todos".</p>
                    </div>
                )}
            </SectionWall>
            
            <section>
                <div className="mb-8 gap-10">
                    <h3 className="text-grisvolcan text-center text-4xl font-sans font-extrabold mb-8">Prueba nuestra filosofia</h3>
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