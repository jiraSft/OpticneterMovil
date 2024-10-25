import React from 'react';
import { useParams } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonLoading, IonButton, IonBackButton, IonButtons } from '@ionic/react';
import Header from '../../components/UI/header';
import { caretBack } from 'ionicons/icons';

const DetalleProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`https://backopt-production.up.railway.app/productos/Productos/${id}`,{
        });
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, []);

  if (loading) {
    return <IonLoading isOpen={loading} message={"Cargando producto..."} />;
  }

  if (!producto) {
    return <div>Error: Producto no encontrado.</div>; 
  }

  return (
    <IonPage>
      <Header />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <p className='text-center  text-2xl font-black p-4'>Detalle del Producto</p>
          <IonImg src={producto.vchNomImagen} alt={producto.vchNombreProducto} />
          <IonCardHeader>
            <IonCardTitle>{producto.vchNombreProducto}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className=''>{producto.vchDescripcion}</p><br />
            <p>Precio: ${producto.Precio}</p><br />
            <p>Existencias: {producto.Existencias}</p>
          </IonCardContent>
          <IonButton>Agregar al carrito</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DetalleProducto;
