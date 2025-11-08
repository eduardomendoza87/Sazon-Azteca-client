import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUserEdit, FaTag, FaArrowLeft } from 'react-icons/fa'; // Se agrega FaArrowLeft por si la usas

// DATOS DE PRUEBA (MOCK DATA) - Incluye un artículo de Receta y uno de Investigación
const MOCK_ARTICLE_DATA = [
    {
        // --- RECETA (Requiere separación de contenido) ---
        slug: "receta-mole-poblano", 
        titulo: "Receta para el Mole Tradicional", 
        categoria: "Receta", // Nota: Lo ajusté a 'Receta' (singular) para simplificar la lógica
        fecha: "31 de Oct, 2025",
        autor: "Chef Ricardo Muñoz Zurita",
        // CORRECCIÓN: Usar una cadena (URL) en lugar de require() dentro del array
        imagenPrincipal: "https://placehold.co/1200x500/A68A64/3D362D?text=MOLE+TERMINADO", 
        
        // El contenido HTML inyectado, con el separador para el split
        contenidoHTML: `
            <div class="grid md:grid-cols-2 gap-x-10 text-lg">
                <div>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3 mt-4">7 chiles anchos</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">6 chiles mulatos</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">5 chiles pasilla</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">50 gr de pepita de calabaza peladas</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">30 gr de ajonjolí</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">1/2 cebolla o 1 cebolla chica</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">3 dientes de ajo</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">2 jitomates</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">1/4 cucharadita de anís</h3>
                </div>
                <div>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3 mt-4">1 rajita de canela</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">75 gr de almendra pasa</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">100 gr de cacahuate</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">5 gr de pasas</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">3 clavos de olor (o la punta de una cucharita)</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">1/2 plátano macho (maduro)</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">1/2 tortilla de maíz fría</h3>
                    <h3 class="font-extrabold text-lg text-grisvolcan mb-3">Plátano macho</h3>
                </div>
            </div>
            
            <div class="mt-12 text-lg leading-relaxed">
                <p class="mb-4"><span class="font-bold text-terracota">a.</span> Lave y quite la vena de los chiles. Una vez que lo hagas, ponlos sobre el comal para tostarlos, pero cuida no quemarlos porque el mole se amargará.</p>
                <p class="mb-4"><span class="font-bold text-terracota">b.</span> Muela y tuesta todos los chiles secos. Deja que se remojen con agua caliente por 20 minutos para suavizar.</p>
                <p class="mb-4"><span class="font-bold text-terracota">c.</span> Hierve en otra olla jitomate, ajo y cebolla.</p>
                <p class="mb-4"><span class="font-bold text-terracota">d.</span> En un comal tuesta la pepita de calabaza, cacahuate, almendras, la tortilla partida en cuartos y el bolillo rebanado. Muela todo esto junto con los chiles rehidratados y el caldo.</p>
                <p class="mb-4"><span class="font-bold text-terracota">e.</span> Una vez que la consistencia sea líquida, agrega la espesadura y las pasas. Permite que repose por al menos 45 minutos. Sazónala al gusto.</p>
                <p class="mb-4"><span class="font-bold text-terracota">f.</span> La consistencia debe ser espesa. Si está muy líquida, puedes agregar un poco de masa de tortilla para darle cuerpo.</p>
                <p class="mb-4"><span class="font-bold text-terracota">g.</span> Finalmente, tuesta ajonjolí para ponerlo encima del mole, recuerda que el mole debe quedar espeso.</p>
            </div>
        `,
    },
    {
        // --- INVESTIGACIÓN (Requiere contenido simple, sin separación) ---
        slug: "ingredientes-mas-usados",
        titulo: "La Milpa Digital: Ingredientes Top 2025",
        categoria: "Investigación",
        fecha: "15 de Diciembre, 2024",
        autor: "Jorge Ruiz",
        // CORRECCIÓN: Usar una cadena (URL) en lugar de require()
        imagenPrincipal: "https://placehold.co/1200x500/DCD0C0/3D362D?text=INVESTIGACION+GASTRONOMICA", 
        
        contenidoHTML: `
            <p class="text-xl mb-6">Nuestra investigación anual sobre tendencias culinarias mexicanas revela un retorno a los orígenes. El consumidor de 2025 busca autenticidad y trazabilidad. Los ingredientes estrella no son exóticos, sino **antiguos**.</p>
            
            <h2 class="text-3xl font-serif text-grisvolcan mb-4 mt-8">El Top 3 de la Herencia</h2>
            <ol class="list-decimal list-inside space-y-3 mb-6 ml-4 text-lg">
                <li><span class="font-semibold text-verdenopal">Maíz Azul Criollo:</span> Valorizado por su alto contenido nutricional y su profundo color.</li>
                <li><span class="font-semibold text-verdenopal">Epazote:</span> Dejó de ser solo una hierba aromática para convertirse en un sabor de identidad.</li>
                <li><span class="font-semibold text-verdenopal">Chile Habanero (Fermentado):</span> La tendencia es usarlo en procesos de fermentación lenta, suavizando el picor y acentuando el sabor afrutado.</li>
            </ol>
            
            <p class="mb-6 text-lg">En Sazón Azteca, hemos adaptado nuestro menú para destacar estos ingredientes, asegurando que cada platillo refleje esta tendencia de herencia y sostenibilidad.</p>
        `,
    },
];

// ***************************************************************

const StoryDetailPage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const isReceta = article?.categoria === 'Receta'; // Bandera para la lógica condicional

    // Simulación de llamada a la API
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
                <Link to="/relatos" className="inline-block mt-4">
                    <button className="text-terracota hover:underline inline-flex items-center space-x-2">
                        <FaArrowLeft /> Volver a todos los relatos
                    </button>
                </Link>
            </div>
        );
    }
    
    // Lógica para artículos que NO son recetas (renderizado simple)
    const renderFullContent = () => ({ __html: article.contenidoHTML.replace(/text-rojoquemado/g, 'text-terracota') });


    // Lógica para RECETAS (Renderizado dividido)
    let ingredientesHTML = '';
    let preparacionHTML = '';
    
    if (isReceta) {
        const separator = '';
        const contentParts = article.contenidoHTML.split(separator);
        
        ingredientesHTML = contentParts[0];
        
        // La preparación inicia después del separador
        if (contentParts.length > 1) {
            preparacionHTML = contentParts[1];
        }
    }
    
    // Funciones de renderizado para inyección segura
    const renderIngredientes = () => ({ __html: ingredientesHTML.replace(/text-rojoquemado/g, 'text-terracota') });
    const renderPreparacion = () => ({ __html: preparacionHTML.replace(/text-rojoquemado/g, 'text-terracota') });
    
    // Aseguramos que el contenido HTML de recetas no se muestre si no es una receta
    const preparacionExiste = isReceta && preparacionHTML.trim().length > 0;


    return (
        <section className="bg-blancohueso min-h-screen">
            {/* 1. HERO - IMAGEN Y TÍTULO */}
            <div className="relative">
                <img 
                    // CORRECCIÓN: La ruta de imagen ahora es una cadena (URL)
                    src={article.imagenPrincipal} 
                    alt={`Imagen principal de ${article.titulo}`} 
                    className="w-full h-96 object-cover" 
                />
            </div>

            <div className="max-w-4xl mx-auto px-4">
                
                {/* Título Principal y Metadatos */}
                <h1 className="font-extrabold text-5xl text-grisvolcan text-center mt-10 mb-6">
                    {article.titulo}
                </h1>
                
                <div className="flex justify-center space-x-6 mb-10 text-parrafo text-sm">
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
                
                {/* ------------------- LÓGICA DE CONTENIDO CONDICIONAL ------------------- */}

                {isReceta ? (
                    <>
                        {/* SECCIÓN 2: INGREDIENTES (Solo si es Receta) */}
                        <div className="bg-terracota bg-opacity-10 p-8 rounded-lg mb-10 text-center">
                            <h2 className="font-extrabold text-4xl text-grisvolcan mb-6">
                                Ingredientes para hacer mole poblano
                            </h2>
                            <div className="font-cuerpo text-parrafo" dangerouslySetInnerHTML={renderIngredientes()} />
                        </div>

                        {/* SECCIÓN 3: PREPARACIÓN (Solo si es Receta y si hay contenido) */}
                        {preparacionExiste && (
                            <div className="bg-terracota bg-opacity-10 p-8 rounded-lg mb-10 text-center">
                                <h2 className="font-extrabold text-4xl text-grisvolcan mb-6">
                                    Preparación del mole
                                </h2>
                                <div className="font-cuerpo text-left text-parrafo text-lg" 
                                    dangerouslySetInnerHTML={renderPreparacion()} 
                                />
                            </div>
                        )}
                    </>
                ) : (
                    /* RENDERIZADO PARA ARTÍCULOS DE INVESTIGACIÓN/BLOG (Contenido completo sin secciones) */
                    <div className="font-cuerpo text-parrafo text-lg py-8">
                        <div dangerouslySetInnerHTML={renderFullContent()} />
                    </div>
                )}


                {/* PRUEBA NUESTRO MENÚ (Botón) - CTA Único */}
                <div className="text-center py-8">
                    <h2 className="font-serif text-3xl text-grisvolcan mb-4">
                        Prueba nuestra receta en el menú
                    </h2>
                    <Link to="/reservas">
                        <button className="bg-verdenopal text-white px-8 py-3 rounded-md hover:bg-rojoquemado transition-colors duration-300 font-semibold">
                            Reservar ahora
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    );
};
export default StoryDetailPage;