import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productosData } from '../data/productos';
import ProductoCard from '../components/ProductoCard';

function Home() {
  const [toastMessage, setToastMessage] = useState('');

  // Seleccionamos los primeros 4 productos como destacados para el inicio
  const productosDestacados = productosData.slice(0, 4);

  const handleAgregar = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carritoActual.findIndex((item) => item.id === producto.id);

    if (index !== -1) {
      carritoActual[index].cantidad = (carritoActual[index].cantidad || 1) + 1;
    } else {
      carritoActual.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carritoActual));

    setToastMessage(`¡${producto.nombre} agregado al carrito!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <main className="contenedor-principal">
      {/* Hero Section */}
      <section className="hero-seccion">
        <h1 className="hero-titulo">Bienvenido a Distribuidora de gas "El Volcán"</h1>
        <p className="hero-subtitulo">
          Cilindros de gas, reguladores, mangueras y accesorios, con despacho a domicilio en Chillán y alrededores.
        </p>
        <Link to="/productos" className="btn-primario">
          Ver productos
        </Link>
      </section>

      {/* Toast Notificación */}
      {toastMessage && (
        <div className="toast-notificacion">
          {toastMessage}
        </div>
      )}

      {/* Sección Productos Destacados */}
      <section>
        <h2 className="titulo-destacados">Productos destacados</h2>
        <div className="grilla-productos">
          {productosDestacados.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onAgregar={handleAgregar}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;