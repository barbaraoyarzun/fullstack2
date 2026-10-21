import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { comunasData } from '../data/comunas';

function Carrito() {
  const [items, setItems] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [comuna, setComuna] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorForm, setErrorForm] = useState('');

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setItems(carritoGuardado);
  }, []);

  // Calcula el total sumando (precio * cantidad) de cada item
  const total = items.reduce((acc, item) => acc + item.precio * (item.cantidad || 1), 0);

  const eliminarItem = (index) => {
    const nuevoCarrito = items.filter((_, i) => i !== index);
    setItems(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const vaciarCarrito = () => {
    setItems([]);
    localStorage.removeItem('carrito');
  };

  const handlePago = (e) => {
    e.preventDefault();

    if (!direccion.trim()) {
      setErrorForm('Por favor ingrese una dirección de despacho.');
      return;
    }

    if (!comuna) {
      setErrorForm('Por favor seleccione una comuna.');
      return;
    }

    setErrorForm('');
    setMensajeExito(`¡Pedido confirmado! Se despachará a ${direccion}, ${comuna}.`);
    vaciarCarrito();
  };

  return (
    <main className="contenedor-principal">
      <h2 style={{ backgroundColor: '#2b6cb0', color: 'white', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
        Finalizar Compra
      </h2>

      {mensajeExito && (
        <div className="toast-notificacion toast-inline">
          {mensajeExito}
        </div>
      )}

      {items.length === 0 && !mensajeExito ? (
        <div className="auth-card" style={{ textAlign: 'center', margin: '20px auto' }}>
          <p>Tu carrito de compras está vacío.</p>
          <Link to="/productos" className="btn-primario btn-hero">
            Ver Productos
          </Link>
        </div>
      ) : items.length > 0 && (
        <div className="contenedor-auth" style={{ gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
          {/* Listado de Productos */}
          <div className="auth-card" style={{ flex: '2', minWidth: '300px' }}>
            <h3>Productos en el Carrito</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {items.map((item, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', padding: '12px 0' }}>
                  <div>
                    <strong>{item.nombre}</strong>
                    <p style={{ margin: '4px 0 0 0', color: '#4a5568', fontSize: '0.9rem' }}>
                      Cantidad: {item.cantidad || 1} x ${item.precio.toLocaleString('es-CL')}
                    </p>
                    <p className="precio" style={{ fontSize: '1rem', margin: 0 }}>
                      Subtotal: ${((item.cantidad || 1) * item.precio).toLocaleString('es-CL')}
                    </p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => eliminarItem(index)}
                    className="btn-secundario"
                    style={{ color: '#c0392b', borderColor: '#c0392b', padding: '4px 8px', fontSize: '0.85rem' }}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <button 
              type="button" 
              onClick={vaciarCarrito} 
              className="btn-secundario" 
              style={{ width: '100%', marginTop: '15px' }}
            >
              Vaciar Carrito
            </button>
          </div>

          {/* Formulario con campos idénticos a la captura */}
          <div className="auth-card" style={{ flex: '1', minWidth: '300px' }}>
            <form onSubmit={handlePago}>
              {errorForm && <p className="mensaje-error" style={{ textAlign: 'center' }}>{errorForm}</p>}

              <div className="form-group" style={{ textAlign: 'center' }}>
                <label htmlFor="direccion" style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                  Dirección de Despacho
                </label>
                <input
                  type="text"
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ej: Los Pajaritos 123, Chillán"
                />
              </div>

              <div className="form-group" style={{ textAlign: 'center', marginTop: '15px' }}>
                <label htmlFor="comuna" style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                  Comuna
                </label>
                <select 
                  id="comuna" 
                  value={comuna} 
                  onChange={(e) => setComuna(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }}
                >
                  <option value="">Seleccione una comuna...</option>
                  {comunasData.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', borderTop: '2px solid #e2e8f0', paddingTop: '15px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>TOTAL A PAGAR: $</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#1a365d' }}>
                  {total.toLocaleString('es-CL')}
                </span>
              </div>

              <button type="submit" className="btn-primario btn-block" style={{ marginTop: '20px' }}>
                Confirmar Compra
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Carrito;