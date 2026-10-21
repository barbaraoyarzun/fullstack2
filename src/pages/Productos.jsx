import { useState } from 'react';
import { productosData } from '../data/productos';
import ProductoCard from '../components/ProductoCard';

function Productos() {
  const [toastMessage, setToastMessage] = useState('');

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoCarrito = [...carritoActual, producto];
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

    setToastMessage(`¡${producto.nombre} agregado al carrito!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <main className="contenedor-principal">
      <h2>Catálogo de Productos</h2>

      {toastMessage && (
        <div className="toast-notificacion">
          {toastMessage}
        </div>
      )}

      <div className="grilla-productos">
        {productosData.map((prod) => (
          <ProductoCard 
            key={prod.id} 
            producto={prod} 
            onAgregar={agregarAlCarrito} 
          />
        ))}
      </div>
    </main>
  );
}

export default Productos;