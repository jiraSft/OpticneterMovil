import React from 'react';
import { IonIcon } from '@ionic/react';
import { person } from 'ionicons/icons'; // Importa el ícono de persona
import { useAuth } from '../../contexts/Auth'; // Ajusta la ruta según tu estructura de carpetas

const IconoRedondo: React.FC = () => {
  const {isAuthenticated } = useAuth(); // Obtener el usuario y el estado de autenticación

  return (
    <div className="flex justify items-start"> {/* Contenedor centrado horizontalmente y alineado al inicio */}
      <div className="bg-blue-500 rounded-full p-5 m-3"> {/* Fondo azul y borde redondo */}
        <IonIcon icon={person} className="text-white text-4xl" /> {/* Ícono de persona en blanco */}
      </div>
      <div className='flex flex-col'>
        {isAuthenticated ? ( // Mostrar el nombre del usuario si está autenticado
          <>
            <p className="pt-4">{`Hola`}</p>
            <p className='pt-1'>Podrás ver más detalles y mejorar tu experiencia</p>
          </>
        ) : (
          <>
            <p className="pt-4">Ingresa a tu cuenta</p>
            <p className='pt-1'>Podrás ver más detalles y mejorar tu experiencia</p>
          </>
        )}
      </div>
    </div>
  );
};

export default IconoRedondo;
