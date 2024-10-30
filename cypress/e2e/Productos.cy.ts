describe("Productos Ofertas Component", () => {
    beforeEach(() => {
      cy.visit("/ProductosOfertas"); // Cambia esta ruta para que coincida con tu aplicación
    });
  
    it("muestra los productos de oferta", () => {
      // Interceptar la llamada a la API para obtener los productos de ofertas
      cy.intercept("GET", "http://localhost:3000/productos/ProductosOfertas");
  
      // Esperar la llamada a la API y verificar que los datos se muestren correctamente
      cy.wait("@fetchProductos").then(({ response }) => {
        if (response && response.body) {
          const productos = response.body;
  
          // Validar que cada producto se muestre en la lista
          productos.forEach((producto: { IdProducto: number; vchNombreProducto: string; vchNomImagen: string; Precio: number; PrecioOferta: number; }) => {
            cy.contains(producto.vchNombreProducto).should("exist"); // Comprobar que el nombre del producto está presente
            cy.get(`img[alt="${producto.vchNombreProducto}"]`).should("have.attr", "src", producto.vchNomImagen); // Verificar que la imagen es correcta
            cy.contains(`$${producto.Precio}`).should("exist"); // Comprobar el precio original
            cy.contains(`$${producto.PrecioOferta}`).should("exist"); // Comprobar el precio de oferta
          });
  
          // Verificar que el mensaje de envío gratuito esté presente
          cy.contains("Envío gratis en la primera compra").should("exist");
        }
      });
    });
  });
  