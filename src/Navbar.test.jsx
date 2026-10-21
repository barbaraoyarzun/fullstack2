import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { describe, test, expect } from 'vitest';

describe('Bipruebas Nivel 1: Componente Navbar (UI)', () => {
  test('Renderiza los elementos principales del menú de navegación', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthProvider>
    );

    expect(screen.getByText('Gas El Volcán')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText(/Carrito/i)).toBeInTheDocument();
  });
});