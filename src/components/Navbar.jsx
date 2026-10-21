import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.jpg';

function Navbar() {
  const { usuario, logout } = useAuth();

  const esAdmin = usuario && (usuario.rol === 'admin' || usuario.email === 'admin@gaselvolcan.cl');

  const nombreMostrar = usuario
    ? usuario.nombre || usuario.email.split('@')[0]
    : '';

  return (
    <header className="header-principal">
      <nav className="navbar-container">
        <Link to="/" className="logo-link">
          <img src={logoImg} alt="Logo Gas El Volcán" className="logo-img" />
          <span className="logo-nombre">Gas El Volcán</span>
        </Link>
        
        <ul className="menu-principal">
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/productos">Productos</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
          <li><NavLink to="/carrito">Carrito 🛒</NavLink></li>

          {esAdmin && (
            <li>
              <NavLink to="/admin" className="enlace-admin">
                Admin ⚙️
              </NavLink>
            </li>
          )}

          {usuario ? (
            <li className="usuario-sesion-item">
              <span className="saludo-usuario">Hola, {nombreMostrar}</span>
              <button type="button" onClick={logout} className="btn-cerrar-sesion">
                Cerrar Sesión
              </button>
            </li>
          ) : (
            <>
              <li><NavLink to="/login">Acceso</NavLink></li>
              <li><NavLink to="/registro">Registro</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;