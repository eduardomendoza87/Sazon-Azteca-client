// (DEV) Importamos 'useState' para el estado y 'useNavigate' para la redirección
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SectionWall from "../components/textures/SectionWall";
import ButtonPrimary from "../components/buttons/buttonPrimary";

// (QA/PM) Esta función centraliza todas las reglas de negocio para una reserva.
const validateReservation = (formData) => {
    const errors = {};
    const guestCount = parseInt(formData.guests, 10);
    
    // (PM) Regla de Negocio: Límite de comensales (RF-08)
    if (guestCount < 1) {
        errors.guests = 'Debe ser al menos 1 persona.';
    } else if (guestCount > 8) {
        errors.guests = 'Para más de 8 personas, por favor contáctanos por teléfono.';
    }

    // (QA) Regla de Negocio: Validar fecha y hora
    // Combina fecha y hora en un solo objeto Date
    const reservationDate = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();

    // 1. No se puede reservar en el pasado.
    if (reservationDate < now) {
        errors.date = 'No puedes reservar en una fecha u hora pasada.';
    }

    // 2. (PM) No se puede reservar los domingos.
    const dayOfWeek = reservationDate.getDay();
    if (dayOfWeek === 0) { // 0 = Domingo
        errors.date = 'Lo sentimos, cerramos los domingos.';
    }

    // 3. (PM) Validar contra horarios de apertura.
    const hour = reservationDate.getHours();
    if (dayOfWeek === 6) { // 6 = Sábado
        if (hour < 11 || hour >= 21) { // 11am a 9pm
            errors.time = 'Los sábados abrimos de 11:00 am a 9:00 pm.';
        }
    } else if (dayOfWeek !== 0) { // Lunes a Viernes
        if (hour < 10 || hour >= 20) { // 10am a 8pm
            errors.time = 'Nuestro horario es de 10:00 am a 8:00 pm.';
        }
    }

    return errors;
};


const FormsReservations = () => {
    // (DEV) Hook para navegar a la página de confirmación
    const navigate = useNavigate();

    // (DEV) 1. Convertir a componente controlado usando 'useState'
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "1", // Valor inicial por defecto
    });

    // (QA) Estado para manejar los errores de validación
    const [errors, setErrors] = useState({});

    // (DEV) 2. Un 'handleChange' para actualizar el estado
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // (DEV) 3. Un 'handleSubmit' para la lógica de envío
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // (QA) 4. Validar los datos ANTES de enviar
        const validationErrors = validateReservation(formData);
        setErrors(validationErrors);

        // (DEV) 5. Si no hay errores (un objeto vacío), procedemos.
        if (Object.keys(validationErrors).length === 0) {
            
            // --- INICIO DE LÓGICA DE BACKEND (SAAW-4) ---
            // Aquí es donde llamaremos al endpoint POST /api/reservas
            // y le enviaremos el objeto 'formData'.
            console.log("Formulario válido. Enviando a la API:", formData);
            // fetch('/api/reservas', { method: 'POST', body: JSON.stringify(formData) })
            // .then(response => response.json())
            // .then(data => { ... })
            // --- FIN DE LÓGICA DE BACKEND ---

            // (PM) 6. Redirigir a la página de confirmación (RF-09)
            // (DEV) Enviamos el nombre y email para personalizar la página.
            navigate('/reserva-confirmada', { 
                state: { 
                    name: formData.name, 
                    email: formData.email 
                } 
            });
        } else {
            // (QA) Si hay errores, los mostramos en consola
            console.log("Errores de validación:", validationErrors);
        }
    };

    // (QA) Obtenemos la fecha de "hoy" para poner un 'min' en el input date
    const today = new Date().toISOString().split('T')[0];

    return(
        <section className="min-h-screen w-full flex items-center justify-center">
            <SectionWall title="Reserva tu mesa">
            <p className="text-center">Asegura tu lugar en nuestra mesa. El proceso toma menos de 2 minutos.</p>
            <h2 className="text-2xl text-center font-extrabold mt-6 mb-4 text-grisvolcan">Rellena el formulario</h2>
            
            {/* --- (DEV) Conectamos el 'onSubmit' --- */}
            <form className="max-w-2xl mx-auto mb-8 p-6" onSubmit={handleSubmit}>
                
                {/*Nombre completo*/}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nombre Completo:</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        className="w-full px-3 py-2 border border-grisvolcan rounded-md focus:outline-none focus:ring-2 focus:ring-maiz" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {/* (UX/QA) Mostramos el error si existe */}
                    {errors.name && <p className="text-rojoquemado text-sm mt-1">{errors.name}</p>}
                </div>

                {/*Correo electrónico*/}
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
                    {errors.email && <p className="text-rojoquemado text-sm mt-1">{errors.email}</p>}
                </div>

                {/*Telefono*/}
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Teléfono:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-3 py-2 border border-grisvolcan rounded-md focus:outline-none focus:ring-2 focus:ring-maiz"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <p className="text-rojoquemado text-sm mt-1">{errors.phone}</p>}
                </div>

                <h3 className="text-xl font-extrabold mb-4 text-grisvolcan">Fecha y hora</h3>

                {/*Fecha*/}
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Fecha:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className="w-full px-3 py-2 border border-grisvolcan rounded-md focus:outline-none focus:ring-2 focus:ring-maiz"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        min={today} // (QA) Evita seleccionar fechas pasadas
                    />
                    {errors.date && <p className="text-rojoquemado text-sm mt-1">{errors.date}</p>}
                </div>

                {/*Hora*/}
                <div className="mb-4">
                    <label htmlFor="time" className="block text-gray-700 font-semibold mb-2">Hora:</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        className="w-full px-3 py-2 border border-grisvolcan rounded-md focus:outline-none focus:ring-2 focus:ring-maiz"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        step="900" // (UX) Permite seleccionar en incrementos de 15 min
                    />
                    {errors.time && <p className="text-rojoquemado text-sm mt-1">{errors.time}</p>}
                </div>

                {/*Número de personas*/}
                <div className="mb-6">
                    <label htmlFor="guests" className="block text-gray-700 font-semibold mb-2">Número de personas:</label>
                    <input
                        type="number"
                        id="guests"
                        name="guests"
                        className="w-full px-3 py-2 border border-grisvolcan rounded-md focus:outline-none focus:ring-2 focus:ring-maiz"
                        required
                        value={formData.guests}
                        onChange={handleChange}
                        min="1" // (PM) Regla de negocio en HTML
                        max="8" // (PM) Regla de negocio en HTML
                    />
                    {errors.guests && <p className="text-rojoquemado text-sm mt-1">{errors.guests}</p>}
                </div>

                {/*Comentarios adicionales*/}
                <div className="mb-6">
                    <p className="text-center text-xl text-grisvolcan font-medium">Las reservaciones tienen una tolerancia de 15 minutos. Para grupos mayores a 8 personas, por favor contáctanos directamente por teléfono.</p>
                </div>
                
                {/*Boton de envio*/}
                <div className="flex items-center justify-center mb-8">
                    <Link to="/reserva-confirmada">
                        <ButtonPrimary type="submit">Reservar</ButtonPrimary>
                    </Link>
                </div>
            </form>
            </SectionWall>
        </section>
    );
}

export default FormsReservations;