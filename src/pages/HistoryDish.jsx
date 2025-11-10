import React from "react";
import { useParams } from "react-router-dom";

//Componentes
import SectionWall from "../components/textures/SectionWall"; 

//Imagenes
import menu_chilaquiles from "../assets/menu_chilaquiles_verdes.jpg";
import menu_mole from "../assets/menu_mole.jpg";
import menu_pozole from "../assets/menu_pozole.jpg";
import img_mole_procedencia from "../assets/cocina_mexicana.png"; 

const HistoryDish = () => {
  
  const { id } = useParams();

 // Array de datos para la historia de los platillos
const historyDish = [
  {
    id: 1,
    titulo: "Pozole de Puerco Tradicional",
    historia:
      "El Pozole no es solo un platillo, es un ritual prehispánico. Originalmente, era una ofrenda ceremonial reservada para las élites y utilizado en eventos significativos. En Sazón Azteca, honramos esta herencia cociendo el maíz cacahuazintle durante horas, hasta que florece, un proceso que nuestros ancestros llamaban 'nixtamalización'. Es el alma de nuestra cocina de herencia.",
    imagenHistoria: menu_pozole, // Usarás tu imagen
    ingredientes:
      "Maíz cacahuazintle criollo (descascarado con nixtamal), Cabeza de Puerco de rancho, Chile Guajillo y Ancho para el caldo base, rábano de la milpa, lechuga y orégano seco de montaña. Cada bocado cuenta la historia del campo mexicano.",
    imagenIngredientes: menu_pozole, // Usarás tu imagen
    procedencia:
      "Este platillo tiene sus raíces en el México prehispánico, popularizado en las culturas nahuas del Centro y Occidente. Cada región le da su toque: el blanco de Guerrero, el verde de Jalisco, o el rojo que servimos aquí, típico de Tabasco con influencia sureña. Es la cocina viajera de México.",
    imagenProcedencia: menu_pozole, // Usarás tu imagen
  },
  {
    id: 2,
    titulo: "Mole Negro Oaxaqueño Ceremonial",
    historia:
      "El Mole es la máxima expresión de la complejidad y la fusión. Nuestra receta, custodiada por tres generaciones, lleva más de 30 ingredientes. Es un viaje de sabor que equilibra dulzura, acidez y picor. En Sazón Azteca, el Mole representa la **unión de dos mundos**, usando chiles mulatos tostados a leña y chocolate de metate, tal como se hacía en los conventos de Oaxaca.",
    imagenHistoria: menu_mole, // Usarás tu imagen
    ingredientes:
      "Trilogía de Chiles Secos (Mulato, Pasilla, Ancho), Cacao Criollo de Metate, Plátano Macho, almendras, nueces, ajonjolí, Canela de Ceylán, clavo de olor, y la 'recuperación' del aguardiente de caña. La base es un fondo de ave enriquecido por más de 12 horas de cocción lenta.",
    imagenIngredientes: menu_mole, // Usarás tu imagen
    procedencia:
      "Este platillo es el alma de los Valles Centrales de Oaxaca y el corazón de su cocina ceremonial. Conocido como 'Mole Negro', es una receta de celebración que se prepara para bodas, bautizos y fiestas patronales. Nuestra interpretación rescata el método de molienda tradicional.",
    imagenProcedencia: img_mole_procedencia, // Usarás tu imagen
  },
  {
    id: 3,
    titulo: "Chilaquiles Verdes con Huevo de Rancho",
    historia:
      "Los Chilaquiles (del náhuatl *chīlāquiliztli*: 'chiles y verduras') nacen de la necesidad de transformar las tortillas de maíz nixtamalizado del día anterior en una comida nutritiva. Es el desayuno de los campeones y la quintaesencia de la cocina de 'aprovechamiento'. En nuestra mesa, se sirven con la salsa más fresca y un huevo criollo de rancho.",
    imagenHistoria: menu_chilaquiles, // Usarás tu imagen
    ingredientes:
      "Totopos de Maíz nixtamalizado, Salsa Verde fresca (Tomate verde de cáscara, Chile serrano y Epazote criollo), Queso fresco de Tabasco, Crema agria de leche entera y Cebolla morada de curtido rápido.",
    imagenIngredientes: menu_chilaquiles, // Usarás tu imagen
    procedencia:
      "Un platillo fundamental en toda la República Mexicana. Si bien se considera que tiene un origen en el centro del país, es uno de los platos que mejor ha viajado, adaptándose en cada región (rojos en el norte, verdes en el centro). Nosotros lo presentamos con el sabor inconfundible del Sureste.",
    imagenProcedencia: menu_chilaquiles, // Usarás tu imagen
  },
];

  // 2. Buscamos el platillo. 
  const history = historyDish.find((h) => h.id === parseInt(id));

  // 3. Manejo de error si no se encuentra
  if (!history) {
    return (
      <section className="bg-fondo py-16 px-4 text-center">
        <h1 className="font-titulo text-4xl text-grisvolcan">Error 404</h1>
        <p className="font-cuerpo text-parrafo">
          Platillo no encontrado.
        </p>
      </section>
    );
  }


  return (
    <>
      {/* SECCIÓN 1: TÍTULO */}
      <section className="bg-fondo py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-extrabold text-6xl text-grisvolcan mb-8">
            {history.titulo} 
          </h1>
          <p className="font-bold text-2xl text-parrafo mb-8">
            Historia del platillo
          </p>
        </div>
      </section>

      {/*  SECCIÓN 2: HISTORIA */}
      <SectionWall title="Historia"> 
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <img src={history.imagenHistoria} alt={history.titulo} className="rounded-lg shadow-xl" />
          </div>
          <div className="text-left">
            <p className="font-cuerpo text-lg text-parrafo">{history.historia}</p>
          </div>
        </div>
      </SectionWall>

      {/*  SECCIÓN 3: INGREDIENTES */}
      <section className="bg-blancohueso py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <h2 className="font-extrabold text-4xl text-grisvolcan mb-4">Ingredientes Clave</h2>
            <p className="font-cuerpo text-lg text-parrafo">{history.ingredientes}</p>
          </div>
          <div className="flex justify-center">
            <img src={history.imagenIngredientes} alt={`Ingredientes de ${history.titulo}`} className="rounded-lg shadow-xl" />
          </div>
        </div>
      </section>

      {/*  SECCIÓN 4: PROCEDENCIA  */}
      <SectionWall title="Procedencia">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <img src={history.imagenProcedencia} alt={`Procedencia de ${history.titulo}`} className="rounded-lg shadow-xl" />
          </div>
          <div className="text-left">
            <p className="font-cuerpo text-lg text-parrafo">{history.procedencia}</p>
          </div>
        </div>
      </SectionWall>

      {/*Volver al Menu*/}
      <div className="flex justify-center my-16">
        <a 
          href="/menu" 
          className="font-cuerpo font-medium bg-rojoquemado text-white rounded-lg px-6 py-3 hover:bg-rojoquemado/80 transition-colors duration-300"
        >
          Volver al Menú
        </a>
      </div>
    </>
  );
};
export default HistoryDish;