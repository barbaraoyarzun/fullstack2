import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productosData } from '../data/productos';

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  const producto = productosData.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <main className="contenedor-principal">
        <h2>Producto no encontrado</h2>
        <p>El producto solicitado no existe en nuestro catálogo.</p>
        <Link to="/productos" className="btn-primario btn-hero">
          Volver al Catálogo
        </Link>
      </main>
    );
  }

  const agregarAlCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Si el producto ya está en el carrito, sumamos las unidades seleccionadas
    const index = carritoActual.findIndex((item) => item.id === producto.id);
    if (index !== -1) {
      carritoActual[index].cantidad = (carritoActual[index].cantidad || 1) + Number(cantidad);
    } else {
      carritoActual.push({ ...producto, cantidad: Number(cantidad) });
    }

    localStorage.setItem('carrito', JSON.stringify(carritoActual));

    setToastMessage(`¡${cantidad} unidad(es) de ${producto.nombre} agregada(s) al carrito!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <main className="contenedor-principal">
      <h2>{producto.nombre}</h2>

      {toastMessage && (
        <div className="toast-notificacion">
          {toastMessage}
        </div>
      )}

      <div className="auth-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <img 
          src={producto.imagen} 
          alt={producto.nombre} 
          className="imagen-producto" 
          style={{ height: '220px' }}
        />
        <p className="precio">${producto.precio.toLocaleString('es-CL')}</p>
        <p>
          Cilindro y equipamiento oficial de <strong>Gas El Volcán</strong> con despacho rápido a domicilio en la Región de Ñuble y alrededores. Cumple con todas las normas de seguridad vigentes.
        </p>

        {/* Selector de Unidades */}
        <div className="form-group" style={{ margin: '15px 0' }}>
          <label htmlFor="cantidad"><strong>Cantidad de unidades:</strong></label>
          <input
            type="number"
            id="cantidad"
            min="1"
            max="10"
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
            style={{ width: '100px', padding: '8px', fontSize: '1rem', marginTop: '5px' }}
          />
        </div>

        <div className="acciones-tarjeta">
          <button 
            type="button" 
            onClick={agregarAlCarrito} 
            className="btn-primario"
          >
            Añadir al Carrito
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/productos')} 
            className="btn-secundario"
          >
            Volver a Productos
          </button>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;