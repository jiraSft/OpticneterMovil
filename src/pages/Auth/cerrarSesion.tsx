import { IonButton } from '@ionic/react';
import React, { useContext } from 'react'
import { AuthContext } from '../Auth';

const CerrarSesion: React.FC = () => {
    const {logout} = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        window.location.href ='/Home'
    }
    return(
        <IonButton onClick={handleLogout}>Cerrar Sesión</IonButton>
    );
}

export default CerrarSesion;