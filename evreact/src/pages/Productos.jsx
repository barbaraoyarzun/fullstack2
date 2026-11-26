import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductoCard from '../components/ProductoCard';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensajeToast, setMensajeToast] = useState('');

  useEffect(() => {
    api.getProductos()
      .then((data) => setProductos(data))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito_volcan') || '[]');
    const existente = carritoActual.find((item) => item.id === producto.id);

    if (existente) {
      existente.cantidad += 1;
    } else {
      carritoActual.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito_volcan', JSON.stringify(carritoActual));
    setMensajeToast(`✓ ${producto.nombre} añadido al carrito`);
    setTimeout(() => setMensajeToast(''), 2500);
  };

  const productosFiltrados =
    categoriaSeleccionada === 'Todos'
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <main className="contenedor-principal">
      {mensajeToast && <div className="toast-notificacion">{mensajeToast}</div>}

      <h2 className="titulo-destacados">Catálogo de Productos</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '25px' }}>
        {['Todos', 'Cilindros', 'Accesorios'].map((cat) => (
          <button
            key={cat}
            type="button"
            className={categoriaSeleccionada === cat ? 'btn-primario' : 'btn-secundario'}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {cargando && <p style={{ textAlign: 'center' }}>Cargando productos...</p>}
      {error && <p className="mensaje-error mensaje-error-centro">Error: {error}</p>}

      {!cargando && !error && (
        <div className="grilla-productos">
          {productosFiltrados.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onAgregar={agregarAlCarrito}
            />
          ))}
        </div>
      )}
    </main>
  );
}