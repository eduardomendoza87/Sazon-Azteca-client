import React from "react";
import { Link } from "react-router-dom"; 
import ButtonPrimary from "../buttons/buttonPrimary";


const DishCard = ({
  title,
  description,
  image,
  buttonText,
  price,
  category,
  idPlatillo,
}) => {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}

      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-center mb-2">
          {/* === SECCIÓN CORREGIDA === */}
          <span className="text-sm font-cuerpo font-semibold text-white bg-green-400 px-3 py-1 rounded-full">
            {category}
          </span>
          {/* === FIN DE LA CORRECCIÓN === */}

          <span className="text-lg font-cuerpo font-bold text-grisvolcan">
            {price}
          </span>
        </div>

        <h2 className="font-bold text-2xl text-grisvolcan mb-3">{title}</h2>

        <p className="font-cuerpo text-parrafo text-base mb-4 grow">
          {description}
        </p>

        {buttonText && (
          <Link to={`/historia_platillo/${idPlatillo}`}>
            <ButtonPrimary>{buttonText}</ButtonPrimary>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DishCard;

