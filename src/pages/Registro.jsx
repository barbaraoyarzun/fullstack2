import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validarRegistro } from '../utils/validaciones';

function Registro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    password: '',
    confirmarPassword: '',
    aceptaTerminos: false
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarRegistro(formData);

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
    } else {
      setErrores({});
      localStorage.setItem('usuarioRegistrado', JSON.stringify(formData));
      alert('¡Registro exitoso! Ya puedes iniciar sesión.');
      navigate('/login');
    }
  };

  return (
    <main className="contenedor-principal">
      <h2>Registro de Usuario</h2>

      <div className="contenedor-auth">
        <div className="auth-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
              />
              {errores.nombre && <span className="mensaje-error">{errores.nombre}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="rut">RUT:</label>
              <input
                type="text"
                id="rut"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                placeholder="12345678-9"
              />
              {errores.rut && <span className="mensaje-error">{errores.rut}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.cl"
              />
              {errores.email && <span className="mensaje-error">{errores.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              {errores.password && <span className="mensaje-error">{errores.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmarPassword">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirmarPassword"
                name="confirmarPassword"
                value={formData.confirmarPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
              {errores.confirmarPassword && <span className="mensaje-error">{errores.confirmarPassword}</span>}
            </div>

            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="aceptaTerminos"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleChange}
              />
              <label htmlFor="aceptaTerminos" style={{ fontSize: '0.9rem' }}>
                Acepto los términos y condiciones
              </label>
            </div>
            {errores.aceptaTerminos && <span className="mensaje-error">{errores.aceptaTerminos}</span>}

            <button type="submit" className="btn-primario btn-block btn-login-submit">
              Crear Cuenta
            </button>
          </form>

          <div className="auth-footer">
            <p>¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link></p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Registro;