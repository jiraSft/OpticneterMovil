import { IonContent, IonPage} from "@ionic/react";

import React from "react";
import Footer from '../components/Footer';
import Login from "../components/Formulario";
import Header from "../components/UI/header";

const IniciaSesion: React.FC = () =>{
    return(
    <IonPage id="main-content">
        <Header />
         
        <IonContent>
            
            <Login />
           
        </IonContent>

        <Footer />
    </IonPage>
    );
}

export default IniciaSesion;