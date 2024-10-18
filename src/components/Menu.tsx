import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonMenuToggle, IonIcon } from '@ionic/react';
import { home, cart, bag, calendar, person, people, contract, phoneLandscape, call  } from "ionicons/icons";
import IconoRedondo from './UI/iconoUser';
import Boton from './UI/button';

const Menu: React.FC = () => {
  return (
    <IonMenu side="start" contentId="main-content"> 
      <IonHeader>
        <div className="bg-blue-400">
          <IonMenuToggle>
            <IconoRedondo />
            <Boton />
          </IonMenuToggle>
       </div>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
            <IonMenuToggle>
                <IonItem button routerLink="/home">
                <IonIcon icon={home} slot="start" />
                <IonLabel>Inicio</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem button routerLink="/Productos">
                <IonIcon icon={bag} slot="start" />
                <IonLabel>Productos</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem button routerLink="/AgendaCita">
                <IonIcon icon={calendar} slot="start" />
                <IonLabel>Agendar Cita</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem button routerLink="/Carrito">
                <IonIcon icon={cart} slot="start" />
                <IonLabel>Mi carrito</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem button routerLink="/IniciaSesion">
                <IonIcon icon={person} slot="start" />
                <IonLabel>IniciaSesion</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem button routerLink="">
                <IonLabel></IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem button routerLink="/#">
                <IonIcon icon={people} slot="start" />
                <IonLabel>¿Quienes somos?</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem >
                <IonIcon icon={call} slot="start" />
                <IonLabel>Contacto : +52 77#######</IonLabel>
                </IonItem>
            </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
