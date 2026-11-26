export function AdminUsuarios({
  usuarios,
  usuarioForm,
  setUsuarioForm,
  modoEdicionUser,
  handleGuardarUsuario,
  handleEditarUsuario,
  handleEliminarUsuario,
  resetFormUsuario
}) {
  return (
    <div className="contenedor-admin-grid">
      <div className="auth-card">
        <h3>{modoEdicionUser ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h3>
        <form onSubmit={handleGuardarUsuario}>
          <div className="form-group">
            <label>Nombre Completo:</label>
            <input
              type="text"
              value={usuarioForm.nombre}
              onChange={(e) => setUsuarioForm({ ...usuarioForm, nombre: e.target.value })}
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={usuarioForm.email}
              onChange={(e) => setUsuarioForm({ ...usuarioForm, email: e.target.value })}
              placeholder="correo@ejemplo.cl"
            />
          </div>

          <div className="form-group">
            <label>Rol de Usuario:</label>
            <select
              value={usuarioForm.rol}
              onChange={(e) => setUsuarioForm({ ...usuarioForm, rol: e.target.value })}
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="acciones-tarjeta">
            <button type="submit" className="btn-primario btn-block">
              {modoEdicionUser ? 'Guardar Cambios' : 'Crear Usuario'}
            </button>
            {modoEdicionUser && (
              <button type="button" onClick={resetFormUsuario} className="btn-secundario btn-block">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="auth-card tabla-container">
        <h3>Lista de Usuarios Registrados ({usuarios.length})</h3>
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td><strong>{user.nombre}</strong></td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge-rol ${user.rol === 'admin' ? 'badge-admin' : 'badge-cliente'}`}>
                    {user.rol}
                  </span>
                </td>
                <td className="acciones-tabla">
                  <button type="button" onClick={() => handleEditarUsuario(user)} className="btn-accion-editar">
                    Editar
                  </button>
                  <button type="button" onClick={() => handleEliminarUsuario(user.id)} className="btn-accion-eliminar">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}