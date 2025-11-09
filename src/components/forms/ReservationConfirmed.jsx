// (DEV) Importamos 'useLocation' para leer los datos enviados por 'navigate'
import React from "react";
import { useLocation } from "react-router-dom";
import SectionWall from "../textures/SectionWall";

const ReservationConfirmed = () => {
    // (DEV) 1. Usamos el hook useLocation para acceder al 'state'
    const location = useLocation();

    // (DEV) 2. Extraemos los datos. 
    // Añadimos 'fallbacks' por si el usuario llega a esta URL directamente.
    const name = location.state?.name || "Invitado";
    const email = location.state?.email || "tu correo";

    return (
        <section className="min-h-screen w-full flex items-center justify-center">
            
            {/* (UX/UI) Usamos SectionWall para mantener el fondo texturizado 
                que propusiste en tu diseño.
            */}
            <SectionWall>
                
                {/* --- (QA) REVISIÓN DE ACCESIBILIDAD (RNF-06) ---
                  En lugar de poner texto oscuro sobre la textura naranja (bajo contraste),
                  creamos un "lienzo" interior con un color neutro de la paleta.
                  Usé 'bg-beigemaiz' como suposición, puedes cambiarlo por 'bg-blancohueso'.
                  Esto garantiza un alto contraste y cumple con WCAG AA.
                */}
                <div className="max-w-xl mx-auto p-8 md:p-12 bg-beigemaiz rounded-lg shadow-xl">
                    
                    <h1 className="text-4xl font-extrabold text-grisvolcan text-center mb-4">
                        ¡Reservación Confirmada!
                    </h1>
                    
                    <p className="text-xl text-grisvolcan text-center mb-6">
                        {/* (UX) 3. Personalizamos el mensaje con el nombre */}
                        ¡Gracias, <strong>{name}</strong>! Tu mesa está lista.
                    </p>
                    
                    <p className="text-lg text-gray-700 text-center mb-8">
                        Hemos enviado un correo de confirmación a 
                        {/* (UX) 4. Mostramos el email */}
                        <strong> {email}</strong> con todos los detalles.
                    </p>
                    
                    <h2 className="text-3xl font-bold text-marronterracota text-center">
                        ¡Te esperamos en Sazón Azteca!
                    </h2>
                    
                </div>
            </SectionWall>
        </section>
    );
};

export default ReservationConfirmed;