import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 

const FormsCrearArticulo = () => {
    const [formData, setFormData] = useState({
        titulo: "",
        slug: "",
        categoria: "",
        autor: "",
        fecha: "",
        imagenDestacada: "",
        descripcion: ""
    });
    const [contenido, setContenido] = useState("");
    
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
            
            if (!fullPostData.titulo || !fullPostData.slug || !fullPostData.contenido) {
                throw new Error("Título, Slug y Contenido son obligatorios.");
            }

            const response = await fetch('http://localhost:8080/api/relatos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(fullPostData)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Error al crear el artículo');
            }
            
            navigate('/admin/articulos');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="bg-white shadow-xl rounded-lg p-8 w-full">
            
            <h1 className="text-3xl font-extrabold text-grisvolcan mb-2">Escribir Nuevo Relato</h1>
            
            <Link to="/admin/articulos" className="text-terracota hover:text-rojoquemado mb-6 inline-block">
                ← Volver a la lista
            </Link>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    
                    {/* --- Columna 1: Información Principal --- */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-grisvolcan border-b pb-2">Información Principal</h3>
                        
                        <div>
                            <label htmlFor="titulo" className="block text-parrafo font-cuerpo mb-2">Título </label>
                            <input type="text" id="titulo" name="titulo" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
                        </div>
                        
                        <div>
                            <label htmlFor="slug" className="block text-parrafo font-cuerpo mb-2">Slug (URL)</label>
                            <input type="text" id="slug" name="slug" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="ej: receta-mole-poblano" required />
                        </div>

                        <div>
                            <label htmlFor="autor" className="block text-parrafo font-cuerpo mb-2">Autor</label>
                            <input type="text" id="autor" name="autor" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="categoria" className="block text-parrafo font-cuerpo mb-2">Categoría</label>
                            <input type="text" id="categoria" name="categoria" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Ej: Receta, Investigacion" />
                        </div>
                        
                        <div>
                            <label htmlFor="fecha" className="block text-parrafo font-cuerpo mb-2">Fecha de Publicación</label>
                            <input type="date" id="fecha" name="fecha" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                        
                        <div>
                            <label htmlFor="imagenDestacada" className="block text-parrafo font-cuerpo mb-2">URL de Imagen Destacada</label>
                            <input type="text" id="imagenDestacada" name="imagenDestacada" onChange={handleChange} placeholder="/images/mole.jpg" className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                    </div>

                    {/* --- Columna 2: Contenido --- */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-grisvolcan border-b pb-2">Contenido</h3>
                        
                        <div>
                            <label htmlFor="descripcion" className="block text-parrafo font-cuerpo mb-2">Descripción Corta</label>
                            <textarea id="descripcion" name="descripcion" onChange={handleChange} rows="4" className="w-full p-2 border border-gray-300 rounded"></textarea>
                        </div>
                        
                        <div>
                            <label className="block text-parrafo font-cuerpo mb-2">Contenido Completo del Artículo </label>
                            
                            {/*  Editor de Texto! */}
                            <SunEditor 
                                setContents={contenido} // El estado 'contenido'
                                onChange={setContenido} // Actualiza el estado con el HTML
                                setDefaultStyle="font-family: Arial; font-size: 16px;"
                                setOptions={{
                                    height: 200,
                                    buttonList: [
                                        ['undo', 'redo'],
                                        ['font', 'fontSize', 'formatBlock'],
                                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                        ['removeFormat'],
                                        ['fontColor', 'hiliteColor'],
                                        ['outdent', 'indent'],
                                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                                        ['table', 'link', 'image'],
                                        ['fullScreen', 'showBlocks', 'codeView'],
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

                {/* Botones (sin cambios) */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                    <Link
                        to="/admin/relatos"
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
                        Publicar Artículo
                    </button>
                </div>

            </form>
        </section>
    );
}
export default FormsCrearArticulo;