import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 

const FormsEditarArticulo = () => {
    const { slug } = useParams(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: "",
        slug: "",
        categoria: "",
        autor: "",
        fecha: "",
        imagenDestacada: "",
        descripcion: ""
    });
    
    // El contenido del editor vive en su propio estado
    const [contenido, setContenido] = useState("");
    
    // Estado para errores y carga
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //  Cargar los datos del artículo existente
    useEffect(() => {
        const fetchArticulo = async () => {
            try {
                //  ¡Llamamos al endpoint GET /:slug que creamos!
                // Esta ruta es pública, así que no necesitamos token
                const response = await fetch(`http://localhost:8080/api/relatos/${slug}`);
                if (!response.ok) throw new Error("Error al cargar los datos del artículo");
                
                const data = await response.json();
                
                //  ¡Pre-llenamos el formulario con los datos!
                setFormData({
                    titulo: data.titulo || "",
                    slug: data.slug || "",
                    categoria: data.categoria || "",
                    autor: data.autor || "",
                    fecha: data.fecha ? data.fecha.split('T')[0] : "", // Formatear fecha
                    imagenDestacada: data.imagenDestacada || "",
                    descripcion: data.descripcion || ""
                });
                setContenido(data.contenido || ""); // Pre-llenamos el editor

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticulo();
    }, [slug]); // Se ejecuta si el 'slug' de la URL cambia

    //  Manejador para los inputs simples (sin cambios)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Acceso denegado");
            
            const fullPostData = {
                ...formData,
                contenido: contenido
            };

            //  ¡Llamamos al endpoint PUT que creamos!
            const response = await fetch(
                `http://localhost:8080/api/relatos/${slug}`, // Usamos el slug de la URL
                {
                    method: 'PUT', // ¡Método PUT!
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                    body: JSON.stringify(fullPostData)
                }
            );

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Error al actualizar el artículo');
            }

            //  ¡Éxito! Volvemos a la lista
            navigate('/admin/articulos');

        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Cargando datos del artículo...</p>;

    return (
        <section className="bg-white shadow-xl rounded-lg p-8 w-full">
            
            <h1 className="text-3xl font-extrabold text-grisvolcan mb-2">Editando Relato</h1>
            
            {/*  Corregido el enlace "Cancelar" */}
            <Link to="/admin/articulos" className="text-terracota hover:text-rojoquemado mb-6 inline-block">
                ← Volver a la lista
            </Link>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    
                    {/* --- Columna 1: Información Principal --- */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-grisvolcan border-b pb-2">Información Principal</h3>
                        
                        <div>
                            <label htmlFor="titulo" className="block text-parrafo font-cuerpo mb-2">Título *</label>
                            <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
                        </div>
                        
                        <div>
                            <label htmlFor="slug" className="block text-parrafo font-cuerpo mb-2">Slug * (URL)</label>
                            <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="ej: receta-mole-poblano" required />
                        </div>

                        <div>
                            <label htmlFor="autor" className="block text-parrafo font-cuerpo mb-2">Autor</label>
                            <input type="text" id="autor" name="autor" value={formData.autor} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="categoria" className="block text-parrafo font-cuerpo mb-2">Categoría</label>
                            <input type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Ej: Receta, Investigacion" />
                        </div>
                        
                        <div>
                            <label htmlFor="fecha" className="block text-parrafo font-cuerpo mb-2">Fecha de Publicación</label>
                            <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                        
                        <div>
                            <label htmlFor="imagenDestacada" className="block text-parrafo font-cuerpo mb-2">URL de Imagen Destacada</label>
                            <input type="text" id="imagenDestacada" name="imagenDestacada" value={formData.imagenDestacada} onChange={handleChange} placeholder="/images/mole.jpg" className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                    </div>

                    {/* --- Columna 2: Contenido --- */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-grisvolcan border-b pb-2">Contenido (RF-14)</h3>
                        
                        <div>
                            <label htmlFor="descripcion" className="block text-parrafo font-cuerpo mb-2">Descripción Corta (para la tarjeta)</label>
                            <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} rows="4" className="w-full p-2 border border-gray-300 rounded"></textarea>
                        </div>
                        
                        <div>
                            <label className="block text-parrafo font-cuerpo mb-2">Contenido Completo del Artículo *</label>
                            
                            {/*  ¡El Editor de Texto (SunEditor)! */}
                            <SunEditor
                                // 'setContents' se usa para pre-llenar el editor
                                setContents={contenido} 
                                onChange={setContenido} // Actualiza el estado
                                setDefaultStyle="font-family: Arial; font-size: 16px;"
                                setOptions={{
                                    height: 200,
                                    buttonList: [
                                        ['undo', 'redo'],
                                        ['font', 'fontSize', 'formatBlock'],
                                        ['bold', 'underline', 'italic', 'strike'],
                                        ['removeFormat'], ['align', 'list'],
                                        ['link', 'image'], ['codeView'],
                                    ]
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Mensaje de error */}
                {error && (
                    <p className="text-center text-red-600 font-semibold my-4 pt-4">
                        Error: {error}
                    </p>
                )}

                {/*   Botones  */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                    <Link
                        to="/admin/articulos" 
                        className="bg-gray-500 text-white font-semibold rounded-lg px-6 py-2
                                   hover:bg-gray-600 transition-colors" 
                    >
                        Cancelar
                    </Link>
                    <button 
                        type="submit" 
                        className="bg-rojoquemado text-white font-semibold rounded-lg px-6 py-2
                                   hover:bg-terracota transition-colors"
                    >
                        Guardar Cambios
                    </button>
                </div>

            </form>
        </section>
    );
}
export default FormsEditarArticulo;