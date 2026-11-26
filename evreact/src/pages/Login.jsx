import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const user = await login(correo, password);
      if (user.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/productos');
      }
    } catch (err) {
      setError(err.message || 'Correo o contraseña incorrectos');
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="contenedor-principal">
      <div className="contenedor-auth">
        <div className="auth-card">
          <h2 style={{ textAlign: 'center', color: '#1a365d', marginBottom: '20px' }}>
            Iniciar Sesión
          </h2>

          {error && <p className="mensaje-error mensaje-error-centro">{error}</p>}

          <form onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
            <div className="form-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                id="correo"
                type="email"
                placeholder="ejemplo@correo.cl"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primario btn-block btn-login-submit"
              disabled={cargando}
            >
              {cargando ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <p className="auth-footer">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </main>
  );
}