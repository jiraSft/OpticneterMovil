import { IonPage, IonHeader, IonContent, IonImg, IonMenuButton, IonSearchbar, IonToolbar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonLabel, IonTitle } from "@ionic/react";
import React from "react";
import { useEffect, useState } from "react";
import Header from "../components/UI/header";
import CerrarSesion from "./Auth/cerrarSesion";
import { useCart } from "../hooks/UseCart";


function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}


const Carrito: React.FC = () =>{    
  const { cart, clearCart } = useCart();
  const [detalleCarrito, setDetalleCarrito] = useState<any[]>([]);
  const [userType, setUserType] = useState<string | null>(null);
  const [clienteId, setClienteId] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setUserType(decodedToken.userType);
      setClienteId(decodedToken.clienteId);
    }
  }, []);

  useEffect(() => {
    const fetchDetalleCarrito = async () => {
      if (clienteId) {
        try {
          const response = await fetch(`https://backopt-production.up.railway.app/Carrito/uno?userId=${clienteId}`);
          if (!response.ok) throw new Error("Error al obtener el detalle del carrito");
          const data = await response.json();
          setDetalleCarrito(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchDetalleCarrito();
  }, [clienteId]);

  useEffect(() => {
    const subtotal = detalleCarrito.reduce((total, detalle) => total + detalle.SubTotal, 0);
    setTotal(subtotal);
  }, [detalleCarrito]);

  const handlePayment = async () => {
    // Aquí va tu lógica de manejo de pago...
  };

  const eliminarCarritoDespuesCompra = async () => {
    // Aquí va tu lógica de eliminación del carrito...
  };

  return (
    <IonPage id="main-content">
      <Header />  
      <CerrarSesion />  
      <IonContent className="bg-gray-100">
        <div className="min-h-screen pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Carrito de compras</h1>
          <div className="mx-auto max-w-7xl px-6 md:flex md:space-x-6 xl:px-0">
            <div className="w-full md:w-2/3">
              {detalleCarrito.map((detalle) => (
                <IonCard key={detalle.IdDetalle_Carrito} className="mb-6">
                  <IonCardHeader>
                    <IonCardTitle>{detalle.producto.vchNombreProducto}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="flex items-center justify-between mb-4">
                      <img
                        src={detalle.producto.vchNomImagen}
                        alt={detalle.producto.vchNombreProducto}
                        className="w-20 md:w-40 rounded-lg"
                      />
                      <div className="mx-7">
                        <IonLabel className="text-xs text-gray-700">{detalle.Descripcion}</IonLabel>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <IonInput
                        type="number"
                        value={detalle.Cantidad}
                        min="1"
                        readonly
                        className="h-8 w-8 border bg-white text-center text-xs"
                      />
                      <IonLabel className="text-sm">${detalle.Precio}</IonLabel>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
            <div className="w-full md:w-1/3 mb-8">
              <IonCard className="rounded-lg border bg-white p-6 shadow-md">
                <IonCardHeader>
                  <IonCardTitle>Detalle de tu compra</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <h3 className="text-gray-700 font-semibold mb-2">Productos SubTotal</h3>
                  {detalleCarrito.map((detalle) => (
                    <div key={detalle.IdDetalle_Carrito} className="flex justify-between mb-2">
                      <IonLabel>{detalle.producto.vchNombreProducto}</IonLabel>
                      <IonLabel>${detalle.SubTotal}</IonLabel>
                    </div>
                  ))}
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <IonLabel className="text-lg font-bold">Total</IonLabel>
                    <IonLabel className="mb-1 text-lg font-bold">${total}</IonLabel>
                  </div>
                  <IonButton onClick={handlePayment} expand="full" className="mt-6 mb-8 bg-blue-500">
                    Pagar
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Carrito;