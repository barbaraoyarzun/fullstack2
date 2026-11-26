import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from './App';

describe('Bipruebas Nivel 2: Integración de la Aplicación (App)', () => {
  test('Renderiza la estructura principal de la aplicación y la ruta inicial (Home)', () => {
    render(<App />);

    // Verifica la presencia de la barra de navegación principal
    expect(screen.getByText('Gas El Volcán')).toBeInTheDocument();

    // Verifica el título principal del Hero en la página de inicio
    expect(
      screen.getByText(/Bienvenido a Distribuidora de gas/i)
    ).toBeInTheDocument();

    // Verifica el encabezado de productos destacados
    expect(screen.getByText('Productos destacados')).toBeInTheDocument();
  });
});
