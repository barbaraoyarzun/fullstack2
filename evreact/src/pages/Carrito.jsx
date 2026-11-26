import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { obtenerImagen } from '../utils/imagenes';

export default function Carrito() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [carrito, setCarrito] = useState(() =>
    JSON.parse(localStorage.getItem('carrito_volcan') || '[]')
  );
  const [procesando, setProcesando] = useState(false);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const actualizarCantidad = (id, delta) => {
    const actualizado = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item
    );
    setCarrito(actualizado);
    localStorage.setItem('carrito_volcan', JSON.stringify(actualizado));
  };

  const eliminarItem = (id) => {
    const actualizado = carrito.filter((item) => item.id !== id);
    setCarrito(actualizado);
    localStorage.setItem('carrito_volcan', JSON.stringify(actualizado));
  };

  const finalizarCompra = async () => {
    if (!usuario) {
      alert('Debes iniciar sesión para confirmar tu pedido.');
      navigate('/login');
      return;
    }

    if (carrito.length === 0) return;

    setProcesando(true);
    try {
      const itemsParaBackend = carrito.map((item) => ({
        productoId: item.id,
        cantidad: item.cantidad,
      }));

      const pedido = await api.crearPedido(usuario.id, itemsParaBackend);

      alert(`¡Pedido #${pedido.id} registrado con éxito! Total: $${pedido.total.toLocaleString('es-CL')}`);
      setCarrito([]);
      localStorage.removeItem('carrito_volcan');
      navigate('/productos');
    } catch (err) {
      alert(`No se pudo completar la compra: ${err.message}`);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <main className="contenedor-principal">
      <h2 className="titulo-destacados">Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="seccion-nosotros" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p className="texto-destacado" style={{ marginBottom: '20px' }}>
            Tu carrito de compras está vacío.
          </p>
          <button type="button" className="btn-primario" onClick={() => navigate('/productos')}>
            Ir al catálogo
          </button>
        </div>
      ) : (
        <>
          <table className="tabla-html-original">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={obtenerImagen(item.imagen)}
                      alt={item.nombre}
                      style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                    />
                    <strong>{item.nombre}</strong>
                  </td>
                  <td>${item.precio.toLocaleString('es-CL')}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        className="btn-secundario"
                        style={{ padding: '2px 10px' }}
                        onClick={() => actualizarCantidad(item.id, -1)}
                      >
                        -
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        type="button"
                        className="btn-secundario"
                        style={{ padding: '2px 10px' }}
                        onClick={() => actualizarCantidad(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>${(item.precio * item.cantidad).toLocaleString('es-CL')}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-red-delete"
                      onClick={() => eliminarItem(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="seccion-nosotros"
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px',
            }}
          >
            <button type="button" className="btn-secundario" onClick={() => navigate('/productos')}>
              Seguir comprando
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span className="precio" style={{ margin: 0, fontSize: '1.4rem' }}>
                Total: ${total.toLocaleString('es-CL')}
              </span>
              <button
                type="button"
                className="btn-primario"
                onClick={finalizarCompra}
                disabled={procesando}
              >
                {procesando ? 'Procesando pedido...' : 'Confirmar Compra'}
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}