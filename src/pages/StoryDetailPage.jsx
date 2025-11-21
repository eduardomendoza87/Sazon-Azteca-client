import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUserEdit, FaTag, FaArrowLeft } from 'react-icons/fa';
import DOMPurify from 'dompurify';

const StoryDetailPage = () => {
    const { slug } = useParams(); 
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //  Llamada a la API REAL
    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:8080/api/relatos/${slug}`);
                
                if (!response.ok) {
                    // Si es 404, lanzamos un error específico
                    if (response.status === 404) throw new Error("Artículo no encontrado");
                    throw new Error("Error al cargar el artículo");
                }

                const data = await response.json();
                setArticle(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);


    // Estados de carga y error
    if (loading) {
        return <div className="min-h-screen flex justify-center items-center text-grisvolcan text-xl">Cargando relato...</div>;
    }

    if (error || !article) {
        return (
            <div className="min-h-screen text-center py-16 flex flex-col items-center justify-center">
                <h1 className="font-serif text-4xl text-grisvolcan mb-4">
                    {error === "Artículo no encontrado" ? "Artículo no encontrado" : "Hubo un error"}
                </h1>
                <p className="text-parrafo mb-6">{error !== "Artículo no encontrado" && error}</p>
                
                <Link 
                    to="/relatos" 
                    className="text-terracota hover:underline inline-flex items-center space-x-2 text-lg font-semibold"
                >
                    <FaArrowLeft /> <span>Volver a todos los relatos</span>
                </Link>
            </div>
        );
    }
    
    const isReceta = article.categoria === 'Receta'; 
    
    let ingredientesHTML = '';
    let preparacionHTML = '';
    
    if (isReceta && article.contenido) {
        const separator = ''; 
        const contentParts = article.contenido.split(separator);
        
        ingredientesHTML = contentParts[0];
        if (contentParts.length > 1) {
            preparacionHTML = contentParts[1];
        } else {
            // Fallback si no hay separador: todo va a ingredientes o preparación según prefieras
            preparacionHTML = article.contenido; 
        }
    }
    
    // (QA) Funciones de saneamiento con DOMPurify
    const renderFullContent = () => ({ 
        __html: DOMPurify.sanitize(article.contenido) 
    });
    
    const renderIngredientes = () => ({ 
        __html: DOMPurify.sanitize(ingredientesHTML) 
    });
    
    const renderPreparacion = () => ({ 
        __html: DOMPurify.sanitize(preparacionHTML) 
    });
    
    const preparacionExiste = isReceta && preparacionHTML && preparacionHTML.trim().length > 0;


    return (
        <section className="bg-blancohueso min-h-screen">
            {/* 1. HERO - IMAGEN Y TÍTULO */}
            <div className="relative h-96 w-full">
                <img 
                    src={article.imagenDestacada.startsWith('http') 
                        ? article.imagenDestacada 
                        : `http://localhost:8080${article.imagenDestacada}`
                    }
                    alt={`Imagen principal de ${article.titulo}`} 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10 bg-blancohueso rounded-t-3xl p-8 shadow-lg">
                
                {/* Título Principal y Metadatos */}
                <h1 className="font-extrabold text-4xl md:text-5xl text-grisvolcan text-center mb-6 leading-tight">
                    {article.titulo}
                </h1>
                
                <div className="flex justify-center flex-wrap gap-6 mb-10 text-parrafo text-sm md:text-base">
                    <p className="flex items-center space-x-2">
                        <FaUserEdit className="text-rojoquemado" />
                        <span>Autor: <span className="font-semibold">{article.autor}</span></span>
                    </p>
                    <p className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-rojoquemado" />
                        <span>Publicado el: <span className="font-semibold">
                            {new Date(article.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span></span>
                    </p>
                    <p className="flex items-center space-x-2">
                        <FaTag className="text-rojoquemado" />
                        <span>Categoría: <span className="font-semibold">{article.categoria}</span></span>
                    </p>
                </div>
                
                {/* --- CONTENIDO CONDICIONAL --- */}

                {isReceta ? (
                    <div className="space-y-10">
                        {/* SECCIÓN 2: INGREDIENTES */}
                        <div className="bg-terracota bg-opacity-10 p-8 rounded-xl border border-terracota/20">
                            <h2 className="font-extrabold text-3xl text-grisvolcan mb-6 text-center border-b border-terracota/20 pb-4">
                                Ingredientes
                            </h2>
                            <div className="font-cuerpo text-parrafo text-lg leading-relaxed" dangerouslySetInnerHTML={renderIngredientes()} />
                        </div>

                        {/* SECCIÓN 3: PREPARACIÓN */}
                        {preparacionExiste && (
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="font-extrabold text-3xl text-grisvolcan mb-6 text-center">
                                    Preparación
                                </h2>
                                <div className="font-cuerpo text-left text-parrafo text-lg leading-relaxed space-y-4" 
                                     dangerouslySetInnerHTML={renderPreparacion()} 
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    /* RENDERIZADO PARA ARTÍCULOS DE INVESTIGACIÓN */
                    <div className="font-cuerpo text-parrafo text-lg leading-relaxed py-4">
                        <div dangerouslySetInnerHTML={renderFullContent()} />
                    </div>
                )}


                {/* CTA Final */}
                <div className="text-center py-16 mt-8 border-t border-gray-200">
                    <h2 className="font-serif text-3xl text-grisvolcan mb-6">
                        ¿Se te antojó?
                    </h2>
                    <Link 
                        to="/reservas"
                        className="bg-rojoquemado text-white px-8 py-4 rounded-full hover:bg-terracota transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Reserva tu mesa ahora
                    </Link>
                </div>

            </div>
        </section>
    );
};
export default StoryDetailPage;