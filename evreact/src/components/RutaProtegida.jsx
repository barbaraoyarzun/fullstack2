import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaProtegida({ children, requiereAdmin = false }) {
  const { usuario } = useAuth();

  // 1. Si no hay sesión activa, redirige al Login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 2. Verifica roles autorizados para el panel de gestión (ADMIN y VENDEDOR)
  const rol = usuario.rol?.toLowerCase();
  const tieneAccesoPanel = rol === 'admin' || rol === 'vendedor';

  if (requiereAdmin && !tieneAccesoPanel) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaProtegida;