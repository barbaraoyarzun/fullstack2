import { useState } from 'react';
import { validarContacto } from '../utils/validaciones';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarContacto(formData);

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      setMensajeExito('');
    } else {
      setErrores({});
      setMensajeExito('¡Gracias por contactarnos! Te responderemos a la brevedad.');
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
    }
  };

  return (
    <main className="contenedor-principal">
      <h2>Contacto</h2>

      <div className="contenedor-auth">
        <div className="auth-card">
          {mensajeExito && (
            <div className="toast-notificacion toast-inline">
              {mensajeExito}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
              />
              {errores.nombre && <span className="mensaje-error">{errores.nombre}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.cl"
              />
              {errores.email && <span className="mensaje-error">{errores.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono de Contacto:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="912345678"
              />
              {errores.telefono && <span className="mensaje-error">{errores.telefono}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje o Consulta:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
              {errores.mensaje && <span className="mensaje-error">{errores.mensaje}</span>}
            </div>

            <button type="submit" className="btn-primario btn-block">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Contacto;