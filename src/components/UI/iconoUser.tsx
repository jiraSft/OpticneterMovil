import React from 'react';
import { IonIcon } from '@ionic/react';
import { person } from 'ionicons/icons'; // Importa el ícono de persona

const IconoRedondo: React.FC = () => {
  return (
    <div className="flex justify items-start"> {/* Contenedor centrado horizontalmente y alineado al inicio */}
      <div className="bg-blue-500 rounded-full p-5 m-3"> {/* Fondo azul y borde redondo */}
        <IonIcon icon={person} className="text-white text-4xl" /> {/* Ícono de persona en blanco */}
      </div>
      <div className='flex flex-col'>
        <p className="pt-4">Ingresa atu cuenta</p>
        <p className='pt-1'>Podras ver mas detalles y meorar tu experiencia</p>
      </div>
    </div>
  );
};

export default IconoRedondo;
