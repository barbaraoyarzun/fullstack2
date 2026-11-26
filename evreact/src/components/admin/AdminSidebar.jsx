import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function AdminSidebar({ seccionActiva, setSeccionActiva }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const esAdmin = usuario?.rol?.toLowerCase() === 'admin';

  const handleCerrarSesion = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-logo-titulo">Gas El Volcán</h2>
      <p style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '1rem', textAlign: 'center' }}>
        Rol: <strong>{usuario?.rol?.toUpperCase()}</strong>
      </p>

      <ul className="sidebar-menu-lista">
        {esAdmin && (
          <li>
            <button
              type="button"
              className={`btn-sidebar-item ${seccionActiva === 'inicio' ? 'activo' : ''}`}
              onClick={() => setSeccionActiva('inicio')}
            >
              Inicio
            </button>
          </li>
        )}

        <li>
          <button
            type="button"
            className={`btn-sidebar-item ${seccionActiva === 'productos' ? 'activo' : ''}`}
            onClick={() => setSeccionActiva('productos')}
          >
            Productos
          </button>
        </li>

        <li>
          <button
            type="button"
            className={`btn-sidebar-item ${seccionActiva === 'boletas' ? 'activo' : ''}`}
            onClick={() => setSeccionActiva('boletas')}
          >
            Órdenes / Boletas
          </button>
        </li>

        {esAdmin && (
          <li>
            <button
              type="button"
              className={`btn-sidebar-item ${seccionActiva === 'usuarios' ? 'activo' : ''}`}
              onClick={() => setSeccionActiva('usuarios')}
            >
              Usuarios
            </button>
          </li>
        )}

        <li>
          <Link to="/" className="btn-sidebar-item btn-sitio-normal">
            Ver sitio normal
          </Link>
        </li>

        <li>
          <button
            type="button"
            onClick={handleCerrarSesion}
            className="btn-sidebar-item btn-cerrar-sesion-sidebar"
          >
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </aside>
  );
}