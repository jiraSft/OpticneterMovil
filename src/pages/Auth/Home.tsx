import React from "react";
import { IonContent, IonPage } from '@ionic/react'
import Header from '../../components/UI/header';
import CerrarSesion from "./cerrarSesion";
import ProductosOfertas from "../../components/Shared/productosOfertas";
import ImageCarousel from "../../components/UI/carrucel";

const HomeAuth: React.FC = ()=> {
    return(
        <IonPage>
        <Header />
        <IonContent>
            <ImageCarousel />

            <p >Has Iniciado sesion correctamente :)</p>

            <CerrarSesion />

            <ProductosOfertas />
        </IonContent>
        </IonPage>
    );
}

export default HomeAuth;