import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Registro() {
  const [form, setForm] = useState({
    run: '',
    nombre: '',
    correo: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const { registrar } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      await registrar(form);
      navigate('/productos');
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="contenedor-principal">
      <div className="contenedor-auth">
        <div className="auth-card">
          <h2 style={{ textAlign: 'center', color: '#1a365d', marginBottom: '20px' }}>
            Crear Cuenta
          </h2>

          {error && <p className="mensaje-error mensaje-error-centro">{error}</p>}

          <form onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
            <div className="form-group">
              <label htmlFor="run">RUN</label>
              <input
                id="run"
                type="text"
                name="run"
                placeholder="12.345.678-9"
                value={form.run}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                placeholder="Juan Pérez"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                id="correo"
                type="email"
                name="correo"
                placeholder="ejemplo@correo.cl"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primario btn-block btn-login-submit"
              disabled={cargando}
            >
              {cargando ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <p className="auth-footer">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </main>
  );
}