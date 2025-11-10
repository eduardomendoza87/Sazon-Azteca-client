import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUserEdit, FaTag, FaArrowLeft } from 'react-icons/fa';
import DOMPurify from 'dompurify'; // (QA) 1. IMPORTANTE: Importar DOMPurify

// --- DATOS DE PRUEBA (MOCK DATA) ---
const MOCK_ARTICLE_DATA = [
  {
    // --- RECETA ---
    slug: "receta-mole-poblano",
    titulo: "Receta para el Mole Tradicional",
    categoria: "Receta", 
    fecha: "31 de Oct, 2025",
    autor: "Chef Ricardo Muñoz Zurita",
    imagenPrincipal: "https://placehold.co/1200x500/A68A64/3D362D?text=MOLE+TERMINADO",
    
    // (DEV) 2. CONTENIDO CON EL SEPARADOR
    contenidoHTML: `
            <div class="grid md:grid-cols-2 gap-x-10 text-lg">
                <h3 class="font-extrabold text-lg text-grisvolcan mb-3 mt-4">7 chiles anchos</h3>
                <h3 class="font-extrabold text-lg text-grisvolcan mb-3">6 chiles mulatos</h3>
                </div>
            
            <div class="mt-12 text-lg leading-relaxed">
                <p class="mb-4"><span class="font-bold text-terracota">a.</span> Lave y quite la vena de los chiles...</p>
                </div>
        `,
  },
  {
    // --- INVESTIGACIÓN ---
    slug: "ingredientes-mas-usados",
    titulo: "La Milpa Digital: Ingredientes Top 2025",
    categoria: "Investigación",
    fecha: "15 de Diciembre, 2024",
    autor: "Jorge Ruiz",
    imagenPrincipal: "https://placehold.co/1200x500/DCD0C0/3D362D?text=INVESTIGACION+GASTRONOMICA",
    contenidoHTML: `
            <p class="text-xl mb-6">Nuestra investigación...</p>
            <h2 class="text-3xl font-serif text-grisvolcan mb-4 mt-8">El Top 3 de la Herencia</h2>
            `,
  },
];

// ***************************************************************

const StoryDetailPage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const isReceta = article?.categoria === 'Receta'; 

    // Simulación de llamada a la API (sin cambios)
    useEffect(() => {
        const fetchArticle = () => {
            const data = MOCK_ARTICLE_DATA.find(a => a.slug === slug);
            setArticle(data);
            setLoading(false);
        };
        fetchArticle();
    }, [slug]);


    if (loading) {
        return <div className="min-h-screen flex justify-center items-center text-grisvolcan">Cargando Artículo...</div>;
    }

    if (!article) {
        return (
            <div className="min-h-screen text-center py-16">
                <h1 className="font-serif text-4xl text-grisvolcan">Artículo no encontrado</h1>
                
                {/* (QA) 3. CORRECCIÓN: Se eliminó el <button> anidado */}
                <Link 
                    to="/relatos" 
                    className="inline-block mt-4 text-terracota hover:underline inline-flex items-center space-x-2"
                >
                    <FaArrowLeft /> <span>Volver a todos los relatos</span>
                </Link>
            </div>
        );
    }
    
    // (DEV) 2. Lógica para RECETAS (Corregida)
    let ingredientesHTML = '';
    let preparacionHTML = '';
    
    if (isReceta) {
        const separator = ''; // El separador correcto
        const contentParts = article.contenidoHTML.split(separator);
        
        ingredientesHTML = contentParts[0];
        
        if (contentParts.length > 1) {
            preparacionHTML = contentParts[1];
        }
    }
    
    // (QA) 1. FUNCIONES DE RENDERIZADO SEGURO con DOMPurify
    const renderFullContent = () => ({ 
        __html: DOMPurify.sanitize(article.contenidoHTML) 
    });
    
    const renderIngredientes = () => ({ 
        __html: DOMPurify.sanitize(ingredientesHTML) 
    });
    
    const renderPreparacion = () => ({ 
        __html: DOMPurify.sanitize(preparacionHTML) 
    });
    
    const preparacionExiste = isReceta && preparacionHTML.trim().length > 0;


    return (
        <section className="bg-blancohueso min-h-screen">
            {/* 1. HERO - IMAGEN Y TÍTULO */}
            <div className="relative">
                <img 
                    src={article.imagenPrincipal} 
                    alt={`Imagen principal de ${article.titulo}`} // (QA) ¡Alt text dinámico y perfecto!
                    className="w-full h-96 object-cover" 
                />
            </div>

            <div className="max-w-4xl mx-auto px-4">
                
                {/* Título Principal y Metadatos (sin cambios) */}
                <h1 className="font-extrabold text-5xl text-grisvolcan text-center mt-10 mb-6">
                    {article.titulo}
                </h1>
                
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-10 text-parrafo text-sm">
                    <p className="flex items-center space-x-2">
                        <FaUserEdit className="text-rojoquemado" />
                        <span>Autor: <span className="font-semibold">{article.autor}</span></span>
                    </p>
                    <p className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-rojoquemado" />
                        <span>Publicado el: <span className="font-semibold">{article.fecha}</span></span>
                    </p>
                    <p className="flex items-center space-x-2">
                        <FaTag className="text-rojoquemado" />
                        <span>Categoría: <span className="font-semibold">{article.categoria}</span></span>
                    </p>
                </div>
                
                {/* --- LÓGICA DE CONTENIDO CONDICIONAL --- */}

                {isReceta ? (
                    <>
                        {/* SECCIÓN 2: INGREDIENTES */}
                        <div className="bg-terracota bg-opacity-10 p-8 rounded-lg mb-10 text-center">
                            <h2 className="font-extrabold text-4xl text-grisvolcan mb-6">
                                Ingredientes
                            </h2>
                            {/* (QA) 1. Usando la función SANEADA */}
                            <div className="font-cuerpo text-parrafo" dangerouslySetInnerHTML={renderIngredientes()} />
                        </div>

                        {/* SECCIÓN 3: PREPARACIÓN */}
                        {preparacionExiste && (
                            <div className="bg-terracota bg-opacity-10 p-8 rounded-lg mb-10">
                                <h2 className="font-extrabold text-4xl text-grisvolcan mb-6 text-center">
                                    Preparación
                                </h2>
                                {/* (QA) 1. Usando la función SANEADA */}
                                <div className="font-cuerpo text-left text-parrafo text-lg" 
                                     dangerouslySetInnerHTML={renderPreparacion()} 
                                />
                            </div>
                        )}
                    </>
                ) : (
                    /* RENDERIZADO PARA ARTÍCULOS DE INVESTIGACIÓN (Contenido simple) */
                    <div className="font-cuerpo text-parrafo text-lg py-8">
                        {/* (QA) 1. Usando la función SANEADA */}
                        <div dangerouslySetInnerHTML={renderFullContent()} />
                    </div>
                )}


                {/* CTA Único */}
                <div className="text-center py-8">
                    <h2 className="font-serif text-3xl text-grisvolcan mb-4">
                        Prueba nuestra cocina
                    </h2>
                    
                    
                    <Link 
                        to="/reservas"
                        className="bg-rojoquemado text-white px-8 py-3 rounded-md hover:bg-verdenopal transition-colors duration-300 font-semibold"
                    >
                        Reservar ahora
                    </Link>
                </div>

            </div>
        </section>
    );
};
export default StoryDetailPage;