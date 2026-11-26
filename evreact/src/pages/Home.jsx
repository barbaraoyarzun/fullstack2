import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import ProductoCard from '../components/ProductoCard';

export default function Home() {
  const [destacados, setDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeToast, setMensajeToast] = useState('');

  useEffect(() => {
    api.getProductos()
      .then((data) => setDestacados(data.slice(0, 4)))
      .catch((err) => console.error('Error cargando destacados:', err))
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

  return (
    <main className="contenedor-principal">
      {mensajeToast && <div className="toast-notificacion">{mensajeToast}</div>}

      <section className="hero-seccion">
        <h1 className="hero-titulo">Gas El Volcán</h1>
        <p className="hero-subtitulo">
          Energía segura y despacho rápido a domicilio en Chillán y toda la Región de Ñuble.
          Cilindros certificados de 5, 11, 15 y 45 kg.
        </p>
        <Link to="/productos" className="btn-primario">
          Ver Catálogo Completo
        </Link>
      </section>

      <section>
        <h2 className="titulo-destacados">Productos Destacados</h2>

        {cargando ? (
          <p style={{ textAlign: 'center' }}>Cargando productos destacados...</p>
        ) : (
          <div className="grilla-productos">
            {destacados.map((producto) => (
              <ProductoCard
                key={producto.id}
                producto={producto}
                onAgregar={agregarAlCarrito}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}