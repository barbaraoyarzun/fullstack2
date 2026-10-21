import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductoCard from './ProductoCard';
import { describe, test, expect, vi } from 'vitest';

describe('Bipruebas Nivel 1: Componente ProductoCard', () => {
  const productoMock = {
    id: 1,
    nombre: 'Cilindro GLP 11 kg',
    precio: 12000,
    categoria: 'Cilindros',
    descripcion: 'Cilindro tradicional de 11 kg'
  };

  test('Renderiza la información del producto y ejecuta la función onAgregar al hacer clic', () => {
    const handleAgregarMock = vi.fn();

    render(
      <BrowserRouter>
        <ProductoCard producto={productoMock} onAgregar={handleAgregarMock} />
      </BrowserRouter>
    );

    // Verificación de datos renderizados
    expect(screen.getByText('Cilindro GLP 11 kg')).toBeInTheDocument();

    // Simular evento de clic en el botón Añadir
    const botonAgregar = screen.getByRole('button', { name: /añadir|agregar/i });
    fireEvent.click(botonAgregar);

    // Verificar que la función fue llamada correctamente
    expect(handleAgregarMock).toHaveBeenCalledTimes(1);
    expect(handleAgregarMock).toHaveBeenCalledWith(productoMock);
  });
});