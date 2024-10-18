import React from 'react';
import { IonContent, IonHeader,IonPage, IonTitle, IonToolbar, IonSplitPane, IonMenuButton, IonSearchbar, IonImg } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Footer from '../components/Footer';
import Header from '../components/UI/header';
import ImageCarousel from '../components/UI/carrucel';
import ProductosOfertas from '../components/Shared/productosOfertas';

const Home: React.FC = () => {
  return (
      <IonPage id="main-content"> 
       
       <Header />

        <IonContent className="">
         
          <ImageCarousel />
          
        <ProductosOfertas />
          
        </IonContent>
        

      </IonPage>
  );
};

export default Home;
