import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonContent, IonHeader, IonPage, IonToolbar, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonLoading,
  IonButton, IonBackButton, IonButtons
} from '@ionic/react';
import Header from '../../components/UI/header';
import { addProductToCart } from '../../services/Apis';
import Tratamientos from '../../components/tratamientos';
import GraduationsView from '../../components/graduaciones';

const DetalleProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null);
  const [selectedGraduation, setSelectedGraduation] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false); // Estado para controlar la visibilidad de las características

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`https://backopt-production.up.railway.app/productos/Productos/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        const data = await response.json();
        setProducto(data);
        setTotalPrice(Number(data.Precio)); // Precio base del producto
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  useEffect(() => {
    const basePrice = Number(producto?.Precio) || 0;
    const treatmentPrice = selectedTreatment ? Number(selectedTreatment.Precio) : 0;
    const graduationPrice = selectedGraduation ? Number(selectedGraduation.Precio) : 0;
    setTotalPrice(basePrice + treatmentPrice + graduationPrice);
  }, [producto, selectedTreatment, selectedGraduation]);

  const handleTreatmentChange = (treatment: any) => {
    setSelectedTreatment(treatment);
  };

  const handleGraduationChange = (graduation: any) => {
    setSelectedGraduation(graduation);
  };

  const handleAddToCart = async (product: any) => {
    try {
      await addProductToCart(product.IdProducto);
      setCart((prev) => [...prev, product]);
    } catch (err) {
      setError('Error adding product to cart');
    }
  };

  const toggleDetails = () => {
    setShowDetails((prev) => !prev); // Alternar la visibilidad de las características
  };

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
          <IonCardTitle className='text-center text-bold '>{producto.vchNombreProducto} - {producto.vchDescripcion}</IonCardTitle>
          <IonImg src={producto.vchNomImagen} alt={producto.vchNombreProducto} />
          <IonCardHeader>
            <span>Selecciona el tratamiento: {selectedTreatment ? selectedTreatment.Nombre : "Ninguno seleccionado"} </span>
            <Tratamientos onSelectTreatment={handleTreatmentChange} />
            <span>Selecciona la graduación: {selectedGraduation ? selectedGraduation.ValorGraduacion : "Ninguna seleccionada"}</span>
            <GraduationsView onSelectGraduation={handleGraduationChange} />
            <span className='text-black text-xl font-bold' >Total: ${totalPrice}</span>
          </IonCardHeader>
          <IonCardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-xl text-black">Nombre del lente:</span>
                <span>{producto.vchNombreProducto}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Descripción:</span>
                <span>{producto.vchDescripcion}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Precio:</span>
                <span>${producto.Precio}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Existencias:</span>
                <span>{producto.Existencias}</span>
              </div>
            </div>
        
            <IonButton onClick={toggleDetails} className="mt-4" fill="outline">
              {showDetails ? "Ocultar características" : "Mostrar características"}
            </IonButton>
         
            {showDetails && (
              <div className="mt-4">
                <h3 className="font-semibold">Características:</h3>
                <ul className="list-disc list-inside">
                  <li>Características adicionales 1</li>
                  <li>Características adicionales 2</li>
                  <li>Características adicionales 3</li>
                </ul>
              </div>
            )}
            </IonCardContent>
            <div className="flex flex-col space-y-4 mt-4">
              <IonButton onClick={() => handleAddToCart(producto)} className="bg-transparent" fill="outline">
                Agregar al carrito
              </IonButton>
              <IonButton  routerLink='/pagar'onClick={() => handleAddToCart(producto)} className="bg-transparent border-transparent">
                Comprar
              </IonButton>
            </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DetalleProducto;
