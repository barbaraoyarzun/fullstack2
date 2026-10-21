import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaProtegida({ children, requiereAdmin = false }) {
  const { usuario } = useAuth();

  // 1. Si no hay sesión activa, manda al Login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 2. Comprueba si es administrador por rol o por correo
  const esAdmin = 
    usuario.rol === 'admin' || 
    (usuario.email && usuario.email.toLowerCase().includes('admin'));

  if (requiereAdmin && !esAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaProtegida;