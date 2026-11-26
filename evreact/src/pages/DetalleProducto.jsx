import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { obtenerImagen } from '../utils/imagenes';

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensajeToast, setMensajeToast] = useState('');

  useEffect(() => {
    api.getProductoById(id)
      .then((data) => setProducto(data))
      .catch(() => setError('Producto no encontrado'))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <main className="contenedor-principal">
        <p style={{ textAlign: 'center' }}>Cargando detalle del producto...</p>
      </main>
    );
  }

  if (error || !producto) {
    return (
      <main className="contenedor-principal">
        <p className="mensaje-error mensaje-error-centro">{error}</p>
      </main>
    );
  }

  const handleAgregar = () => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito_volcan') || '[]');
    const existente = carritoActual.find((item) => item.id === producto.id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carritoActual.push({ ...producto, cantidad });
    }

    localStorage.setItem('carrito_volcan', JSON.stringify(carritoActual));
    setMensajeToast(`✓ Se añadieron ${cantidad} unidad(es) de ${producto.nombre} al carrito`);
    setTimeout(() => setMensajeToast(''), 2500);
  };

  return (
    <main className="contenedor-principal">
      {mensajeToast && <div className="toast-notificacion">{mensajeToast}</div>}

      <div className="seccion-nosotros">
        <div className="grilla-nosotros" style={{ alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <img
              src={obtenerImagen(producto.imagen)}
              alt={producto.nombre}
              style={{ maxWidth: '300px', width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <span className="badge-cobertura">{producto.categoria}</span>
            <h2 style={{ fontSize: '1.8rem', color: '#1a365d', marginTop: '12px', marginBottom: '10px' }}>
              {producto.nombre}
            </h2>
            <p className="texto-destacado" style={{ marginBottom: '15px' }}>
              {producto.descripcion}
            </p>
            <p className="precio" style={{ fontSize: '1.6rem' }}>
              ${producto.precio.toLocaleString('es-CL')}
            </p>
            <p style={{ color: '#4a5568', marginBottom: '18px' }}>
              Stock disponible: <strong>{producto.stock} unidades</strong>
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <button
                type="button"
                className="btn-secundario"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                disabled={cantidad <= 1}
              >
                -
              </button>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{cantidad}</span>
              <button
                type="button"
                className="btn-secundario"
                onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))}
                disabled={cantidad >= producto.stock}
              >
                +
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primario"
                onClick={handleAgregar}
                disabled={producto.stock === 0}
              >
                {producto.stock === 0 ? 'Sin Stock' : 'Añadir al carrito'}
              </button>
              <button
                type="button"
                className="btn-secundario"
                onClick={() => navigate('/productos')}
              >
                Volver al catálogo
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 