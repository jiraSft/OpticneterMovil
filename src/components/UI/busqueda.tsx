import { IonPage, IonSearchbar } from "@ionic/react";
import React from "react";


const Buscar: React.FC = ( ) => {
    return(
        <IonSearchbar
        style={{'--border-radius': '9999px'}as React.CSSProperties}  
        />
    );
}
export default Buscar