import { Link } from 'react-router-dom';
import { obtenerImagen } from '../utils/imagenes';

function ProductoCard({ producto, onAgregar }) {
  const { id, nombre, precio, imagen } = producto;

  return (
    <div className="tarjeta-producto">
      <img
        src={obtenerImagen(imagen)}
        alt={nombre}
        className="imagen-producto"
      />
      <h3>{nombre}</h3>
      <p className="precio">${precio.toLocaleString('es-CL')}</p>

      <div className="acciones-tarjeta">
        <Link to={`/producto/${id}`} className="btn-secundario btn-detalle">
          Ver detalle
        </Link>
        <button
          type="button"
          onClick={() => onAgregar && onAgregar(producto)}
          className="boton-agregar"
        >
          Añadir
        </button>
      </div>
    </div>
  );
}

export default ProductoCard;