// (DEV) Importamos 'useState' para manejar el formulario y 'Link' para la navegación
import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import SectionWall from "../components/textures/SectionWall";
import ButtonPrimary from "../components/buttons/buttonPrimary";
// (DEV) ButtonSecondary ya no se usa en este componente
// import ButtonSecondary from "../components/buttons/buttonSecondary";


const Contact = () => {
    // --- (DEV) Convertimos el formulario en un "Componente Controlado" ---
    // Esto nos da control total sobre los datos antes de enviarlos.
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    // Manejador genérico para actualizar el estado
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // --- (PM) Lógica de envío a definir ---
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        
        // (PM) Pregunta: ¿A dónde debe ir este formulario? 
        // ¿Creamos un endpoint en SAAW-4 que envíe un email a "contacto@sazonazteca.com"?
        
        console.log("Formulario de contacto enviado:", formData);
        
        // Limpiamos el formulario después de enviar
        setFormData({ name: "", email: "", message: "" });
    };

    return(
        <>
            <section className="min-h-screen w-full ">
                {/*Seccion 1: Titulo y descripcion*/}
                <SectionWall title="Contáctanos">
                    <div className="max-w-3xl mx-auto mb-12 gap-4 ">
                        
                        {/*Horarios*/}
                        <h3 className="text-center text-grisvolcan text-2xl font-extrabold mt-6">Horarios</h3>
                        <p className="text-center text-grisvolcan text-xl font-light">Lunes a Viernes: 10am - 8pm</p>
                        <p className="text-center text-grisvolcan text-xl font-light">Sábado: 11am - 9pm</p>
                        <p className="text-center text-grisvolcan text-xl font-light">Domingo: Cerrado</p>

                        {/*Dirección*/}
                        <h3 className="text-center text-grisvolcan text-2xl font-extrabold mt-6">Dirección</h3>
                        <p className="text-center text-grisvolcan text-xl font-light">Calle Falsa 123, Villahermosa, Tabasco, México</p>

                        {/*Contacto rapido*/}
                        <h3 className="text-center text-grisvolcan text-2xl font-extrabold mt-6">Contacto rapido</h3>
                        <p className="text-center text-grisvolcan text-xl font-light">Telefono: (123) 456-7890</p>
                        <p className="text-center text-grisvolcan text-xl font-light mb-6">Email: contacto@sazonazteca.com</p>
                        
                        
                        <div className="flex justify-center mb-6">
                            <Link to="/reservas">
                                <ButtonPrimary>Reservar ahora</ButtonPrimary>
                            </Link>
                        </div>
                    </div>
                </SectionWall>
                
                
                {/*Seccion 2:Formulario de contacto*/}
                <SectionWall>
                    <form className="max-w-2xl mx-auto mb-8 p-6 " onSubmit={handleSubmit}>
                        <h2 className="text-3xl font-extrabold mb-6 text-center text-grisvolcan">Envíanos un mensaje</h2>
                        <p className="text-center text-grisvolcan text-xl font-medium">Para eventos privados, preguntas generales o comentarios, por favor llena este formulario.</p>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nombre:</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className="w-full px-3 py-2 border border-grisvolcan rounded-md focus:outline-none focus:ring-2 focus:ring-maiz" 
                                required 
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Correo Electrónico:</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                className="w-full px-3 py-2 border border-grisvolcan rounded-md focus:outline-none focus:ring-2 focus:ring-maiz" 
                                required 
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Mensaje:</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows="5" 
                                className="w-full px-3 py-2 border border-grisvolcan rounded-md focus:outline-none focus:ring-2 focus:ring-maiz" 
                                required
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <ButtonPrimary>Enviar</ButtonPrimary>
                        </div>
                    </form>
                </SectionWall>
            </section>
        </>

    );
};

export default Contact;