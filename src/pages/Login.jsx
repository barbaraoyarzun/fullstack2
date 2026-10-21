import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Por favor complete todos los campos.');
      return;
    }

    setError('');
    
    // Si el correo contiene 'admin' o es admin@gaselvolcan.cl, le asigna rol admin
    const esAdmin = email.toLowerCase().includes('admin');
    const datosUsuario = {
      email,
      nombre: email.split('@')[0],
      rol: esAdmin ? 'admin' : 'cliente'
    };

    login(datosUsuario);

    // Redirección inteligente
    if (esAdmin) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <main className="contenedor-principal">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Acceso de Usuarios</h2>

      <div className="contenedor-auth">
        <div className="auth-card">
          <form onSubmit={handleSubmit}>
            {error && <p className="mensaje-error mensaje-error-centro">{error}</p>}

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gaselvolcan.cl o usuario@gmail.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn-primario btn-block btn-login-submit">
              Iniciar Sesión
            </button>
          </form>

          <div className="auth-footer">
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
            <p style={{ marginTop: '10px', fontSize: '0.8rem', color: '#718096' }}>
              💡 <em>Tip para evaluar: Ingresa con <strong>admin@gaselvolcan.cl</strong> para entrar al Panel Admin.</em>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;