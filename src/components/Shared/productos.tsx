import React, { useEffect, useState } from "react";
import { IonContent, IonToast, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonLoading, IonButton } from "@ionic/react";

interface Producto {
  IdProducto: number;
  vchNombreProducto: string;
  vchNomImagen: string;
  vchDescripcion: string;
  Existencias: number;
  Precio: number;
  IdCategoria: number;
  IdMarca: number;
  categoria: {
    NombreCategoria: string;
  };
  marca: {
    NombreMarca: string;
  };
}

const ProductosVista: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<{ [key: number]: string }>({});
  const [marcas, setMarcas] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/productos/Productos/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
    
        const data: Producto[] = await response.json();
    
        const categoriasMap: { [key: number]: string } = {};
        const marcasMap: { [key: number]: string } = {};
    
        data.forEach((producto) => {
          categoriasMap[producto.IdCategoria] = producto.categoria.NombreCategoria;
          marcasMap[producto.IdMarca] = producto.marca.NombreMarca;
        });
    
        setCategorias(categoriasMap);
        setMarcas(marcasMap);
        setProductos(data);
      } catch (error) {
        setError("Error al cargar los productos");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchProductos();
  }, []);

  return (
    <IonContent className="p-3">
      {loading && <IonLoading isOpen={loading} message={"Cargando productos..."} />}
      {error && <IonToast isOpen={true} message={error} duration={3000} color="danger" />}

      <h1 className="text-2xl font-bold text-center mb-3">Productos</h1>

      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1">
        {productos.map((producto) => (
          <IonCard key={producto.IdProducto} className="w-auto mx-4 my-2 p-4 items-center justify-center">
            <IonImg className=" mx-auto" src={producto.vchNomImagen} alt={producto.vchNombreProducto} />
            <IonCardHeader className="text-center">
              <IonCardTitle className="font-bold">{producto.vchNombreProducto}</IonCardTitle>
              <IonCardSubtitle>
                {categorias[producto.IdCategoria] || "Sin categoría"} - {marcas[producto.IdMarca] || "Sin marca"}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
            {/**  <p>{producto.vchDescripcion}</p>   */} 
             {/** <p>Existencias: {producto.Existencias}</p>  */} 
           {/**   <p>Precio: {producto.Precio}</p>  */} 
              <div className="flex justify-between mt-4">
                {/* Botones para realizar acciones, ir a detalles, etc. */}
                <IonButton routerLink="/IniciaSesion" className=""> Detalles</IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </div>
    </IonContent>
  );
};

export default ProductosVista;
