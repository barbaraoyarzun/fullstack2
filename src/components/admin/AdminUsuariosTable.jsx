import { useState } from 'react';

export function AdminUsuariosTable({ usuarios, setUsuarios, mostrarNotificacion }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    run: '',
    nombre: '',
    correo: '',
    tipo: 'Cliente'
  });

  const handleNuevo = () => {
    setEditandoId(null);
    setForm({ run: '', nombre: '', correo: '', tipo: 'Cliente' });
    setMostrarForm(true);
  };

  const handleEditar = (user) => {
    setEditandoId(user.id);
    setForm({
      run: user.run || '111111111',
      nombre: user.nombre,
      correo: user.email || user.correo,
      tipo: user.tipo || (user.rol === 'admin' ? 'Administrador' : 'Cliente')
    });
    setMostrarForm(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Desea eliminar este usuario?')) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
      mostrarNotificacion('Usuario eliminado.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.correo) return alert('Complete nombre y correo.');

    if (editandoId) {
      setUsuarios(usuarios.map((u) => (u.id === editandoId ? { ...u, ...form, email: form.correo } : u)));
      mostrarNotificacion('Usuario actualizado.');
    } else {
      const nuevo = { ...form, id: Date.now(), email: form.correo };
      setUsuarios([...usuarios, nuevo]);
      mostrarNotificacion('Nuevo usuario agregado.');
    }
    setMostrarForm(false);
  };

  return (
    <div className="admin-panel-contenido">
      <div className="caja-titulo-seccion">
        <h2>Usuarios</h2>
      </div>

      <div className="barra-accion-tabla">
        <button type="button" onClick={handleNuevo} className="btn-nuevo-registro">
          Nuevo Usuario
        </button>
      </div>

      {mostrarForm && (
        <div className="auth-card" style={{ marginBottom: '20px', maxWidth: '100%' }}>
          <h3>{editandoId ? 'Editar Usuario' : 'Crear Usuario'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label>RUN:</label>
              <input type="text" value={form.run} onChange={(e) => setForm({ ...form, run: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Correo:</label>
              <input type="email" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Tipo:</label>
              <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                <option value="Cliente">Cliente</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-primario">Guardar</button>
              <button type="button" onClick={() => setMostrarForm(false)} className="btn-secundario">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <table className="tabla-html-original">
        <thead>
          <tr>
            <th>RUN</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.run || '111111111'}</td>
              <td>{u.nombre}</td>
              <td>{u.email || u.correo}</td>
              <td>{u.tipo || (u.rol === 'admin' ? 'Administrador' : 'Cliente')}</td>
              <td>
                <div className="acciones-botones-vertical">
                  <button type="button" onClick={() => handleEditar(u)} className="btn-blue-edit">
                    Editar
                  </button>
                  <button type="button" onClick={() => handleEliminar(u.id)} className="btn-red-delete">
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