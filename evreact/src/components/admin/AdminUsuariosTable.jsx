import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const USUARIO_INICIAL = {
  id: null,
  run: '',
  nombre: '',
  correo: '',
  password: '',
  rol: 'CLIENTE',
};

export function AdminUsuariosTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(USUARIO_INICIAL);
  const [editando, setEditando] = useState(false);

  const cargarUsuarios = async () => {
    try {
      const data = await api.getUsuarios();
      setUsuarios(data);
    } catch (err) {
      alert('Error al cargar usuarios: ' + err.message);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando && form.id) {
        await api.actualizarUsuario(form.id, form);
      } else {
        await api.crearUsuario(form);
      }
      setForm(USUARIO_INICIAL);
      setEditando(false);
      await cargarUsuarios();
    } catch (err) {
      alert('Error al guardar usuario: ' + err.message);
    }
  };

  const handleEditar = (u) => {
    setForm({ ...u, password: '' });
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      await api.eliminarUsuario(id);
      await cargarUsuarios();
    } catch (err) {
      alert('Error al eliminar usuario: ' + err.message);
    }
  };

  return (
    <div>
      <div className="caja-titulo-seccion">
        <h2>Gestión de Usuarios</h2>
      </div>

      <div className="tarjeta-blanca-mensaje" style={{ textAlign: 'left' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            <div className="form-group">
              <label>RUN</label>
              <input
                type="text"
                placeholder="12.345.678-9"
                value={form.run}
                onChange={(e) => setForm({ ...form, run: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Nombre completo"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Correo</label>
              <input
                type="email"
                placeholder="usuario@correo.cl"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder={editando ? 'Nueva (opcional)' : 'Contraseña'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required={!editando}
              />
            </div>

            <div className="form-group">
              <label>Rol</label>
              <select
                value={form.rol}
                onChange={(e) => setForm({ ...form, rol: e.target.value })}
              >
                <option value="CLIENTE">CLIENTE</option>
                <option value="VENDEDOR">VENDEDOR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button type="submit" className="btn-nuevo-registro">
              {editando ? 'Actualizar Usuario' : '+ Crear Usuario'}
            </button>
            {editando && (
              <button
                type="button"
                className="btn-secundario"
                onClick={() => {
                  setForm(USUARIO_INICIAL);
                  setEditando(false);
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <table className="tabla-html-original">
        <thead>
          <tr>
            <th>ID</th>
            <th>RUN</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.run}</td>
              <td><strong>{u.nombre}</strong></td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td>
                <div className="acciones-botones-vertical">
                  <button
                    type="button"
                    className="btn-blue-edit"
                    onClick={() => handleEditar(u)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn-red-delete"
                    onClick={() => handleEliminar(u.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsuariosTable;