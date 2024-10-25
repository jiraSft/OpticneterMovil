import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductosVista from '../../components/Shared/productos'; // Asegúrate de que la ruta sea correcta
import { IonToast, IonLoading } from '@ionic/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';

// Mock de los componentes que necesita

// Mock para simular datos de productos
const mockResponse = {
    ok: true,
    headers: { get: () => 'application/json' },
    json: async () => [
        {
            IdProducto: 1,
            vchNombreProducto: 'Producto 1',
            vchNomImagen: 'imagen.jpg',
            vchDescripcion: 'Descripción del Producto 1',
            Existencias: 10,
            Precio: 100,
            IdCategoria: 1,
            IdMarca: 1,
            categoria: { NombreCategoria: 'Categoría 1' },
            marca: { NombreMarca: 'Marca 1' },
        },
    ],
} as unknown as Response;

// Configuración del mock de fetch
global.fetch = vi.fn().mockResolvedValue(mockResponse);

describe('Pruebas del componente ProductosVista', () => {
  test('Renderiza productos y muestra detalles correctamente', async () => {
    render(
      <Router>
        <ProductosVista />
      </Router>
    );

    // Verificar si muestra el mensaje de carga
    expect(screen.getByText('Cargando productos...')).toBeInTheDocument();

    // Esperar a que los productos se carguen
    await waitFor(() => {
      expect(screen.getByTestId('Producto 1')).toBeInTheDocument();
    });

    // Verificar detalles de la tarjeta de producto
    expect(screen.getByTestId('Categoría 1 - Marca 1')).toBeInTheDocument();
    expect(screen.getByTestId('Descripción del Producto 1')).toBeInTheDocument();

    // Simular clic en botón de detalles
    const detallesButton = screen.getByText('Detalles');
    fireEvent.click(detallesButton);

    // Asegurarse que redirección o acción ocurra después del clic (ajustar según la funcionalidad)
  });

  test('Muestra mensaje de error si ocurre un fallo al cargar productos', async () => {
    // Simular un error en fetch
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Error de carga'));

    render(
      <Router>
        <ProductosVista />
      </Router>
    );

    // Esperar a que aparezca el mensaje de error
    await waitFor(() => {
      expect(screen.getByText('Error al cargar los productos')).toBeInTheDocument();
    });
  });
});
