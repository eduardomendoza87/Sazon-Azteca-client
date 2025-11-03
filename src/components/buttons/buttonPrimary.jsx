import React from "react";

// 1. Nombre con Mayúscula
const ButtonPrimary = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="focus:outline-none 
                 text-white bg-rojoquemado 
                 hover:bg-terracota 
                 focus:ring-4 focus:ring-rojoquemado/50 
                 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      {children} {/* 2. Mostrar el texto de adentro */}
    </button>
  );
};

export default ButtonPrimary;