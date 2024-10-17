import React from "react";
import { IonContent, IonPage } from '@ionic/react'
import Header from '../../components/UI/header';
import CerrarSesion from "./cerrarSesion";

const HomeAuth: React.FC = ()=> {
    return(
        <IonPage>
        <Header />
        <IonContent>
            <p>Has Iniciado sesion correctamente :)</p>

            <CerrarSesion />

        </IonContent>
        </IonPage>
    );
}

export default HomeAuth;