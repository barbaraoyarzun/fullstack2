import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import RutaProtegida from './components/RutaProtegida';
import { describe, test, expect } from 'vitest';

describe('Bipruebas Nivel 2: Integración y Seguridad de Rutas Protegidas', () => {
  test('Bloquea el acceso a /admin a usuarios no administradores', () => {
    const usuarioCliente = { email: 'cliente@gmail.com', rol: 'cliente' };

    render(
      <AuthContext.Provider value={{ usuario: usuarioCliente }}>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/" element={<h1>Inicio Público</h1>} />
            <Route
              path="/admin"
              element={
                <RutaProtegida requiereAdmin={true}>
                  <h1>Panel Admin</h1>
                </RutaProtegida>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.queryByText('Panel Admin')).not.toBeInTheDocument();
    expect(screen.getByText('Inicio Público')).toBeInTheDocument();
  });
});