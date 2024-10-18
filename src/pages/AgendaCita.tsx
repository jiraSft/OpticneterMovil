import { IonPage, IonHeader, IonContent, IonImg, IonMenuButton, IonSearchbar, IonToolbar } from "@ionic/react";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/UI/header";
import CerrarSesion from "./Auth/cerrarSesion";

const AgendaCita: React.FC = () =>{
    return(
        <IonPage id="main-content">
        <Header />
        <CerrarSesion />
        <IonContent>

        </IonContent>

        </IonPage>

    );
}

export default AgendaCita;