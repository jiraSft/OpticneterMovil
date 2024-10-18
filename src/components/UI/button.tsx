import React from 'react';
import { IonButton } from '@ionic/react';

const Boton: React.FC = () => {
  return (
    <div className='justify-center text-center items-center'>
        <IonButton 
        routerLink='/IniciaSesion'
        className='w-4/5' >
        
        Ingresar
    </IonButton>
    </div>
    
  );
};

export default Boton;
