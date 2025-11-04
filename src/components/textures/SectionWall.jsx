import React from 'react';

/**
 * Un componente contenedor reutilizable para las secciones de la página.
 * Aplica el padding estándar, el ancho máximo y un fondo opcional.
 *
 * @param {object} props
 * @param {string} [props.title] - El título H2 opcional para la sección.
 * @param {string} [props.className] - Clases de Tailwind adicionales (ej. 'bg-maiz', 'bg-hueso').
 * @param {React.ReactNode} props.children - El contenido que irá dentro de la sección.
 */
const SectionWall = ({ children, title, className }) => {
  
  // --- ¡AQUÍ ESTÁ LA LÓGICA! ---
  // 1. Definimos nuestro fondo de textura "directamente" usando valores arbitrarios.
  //    (Asegúrate de que la ruta a tu textura sea correcta)
  const defaultBgClass = "bg-madera bg-[url('/src/assets/textura_pared2.jpg')]";

  // 2. Si pasaste una 'className' (como 'bg-maiz'), la usamos.
  //    Si no, usamos nuestro 'defaultBgClass'.
  const backgroundClass = className ? className : defaultBgClass;
  // --- FIN DE LA LÓGICA ---

  return (
    // 1. El <section> principal con el fondo y el padding
    // Ahora 'backgroundClass' tiene el estilo correcto.
    <section className={`${backgroundClass} py-16 px-4`}>
      
      {/* 2. El contenedor de ancho máximo y centrado */}
      <div className="max-w-6xl mx-auto">
        
        {/* 3. Renderizado Condicional del Título */}
        {title && (
          <h2 className="font-extrabold text-5xl text-center text-grisvolcan mb-12">
            {title}
          </h2>
        )}
        
        {/* 4. El contenido (children) */}
        {children}
        
      </div>
    </section>
  );
};

export default SectionWall;

