export function AdminResumen({ productos, usuarios, setSeccionActiva, handleEditarProducto, handleEditarUsuario }) {
  return (
    <div className="contenedor-resumen">
      <div className="grilla-metricas">
        <div className="tarjeta-metrica">
          <h3>Total Productos</h3>
          <p className="valor-metrica">{productos.length}</p>
          <span className="detalle-metrica">Activos en catálogo</span>
        </div>
        <div className="tarjeta-metrica">
          <h3>Usuarios Registrados</h3>
          <p className="valor-metrica">{usuarios.length}</p>
          <span className="detalle-metrica">
            {usuarios.filter((u) => u.rol === 'admin').length} Admins / {usuarios.filter((u) => u.rol !== 'admin').length} Clientes
          </span>
        </div>
        <div className="tarjeta-metrica">
          <h3>Ventas del Mes</h3>
          <p className="valor-metrica">$1.480.000</p>
          <span className="detalle-metrica">18 pedidos completados</span>
        </div>
      </div>

      <div className="grilla-dos-columnas">
        {/* Resumen Productos */}
        <div className="auth-card">
          <div className="card-header-flex">
            <h3>📦 Últimos Productos</h3>
            <button type="button" onClick={() => setSeccionActiva('productos')} className="btn-secundario-sm">
              Gestionar Todos
            </button>
          </div>
          <table className="tabla-admin">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.slice(-4).reverse().map((prod) => (
                <tr key={prod.id}>
                  <td><strong>{prod.nombre}</strong></td>
                  <td>${Number(prod.precio).toLocaleString('es-CL')}</td>
                  <td>
                    <button type="button" onClick={() => handleEditarProducto(prod)} className="btn-accion-editar">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumen Usuarios */}
        <div className="auth-card">
          <div className="card-header-flex">
            <h3>👥 Usuarios Recientes</h3>
            <button type="button" onClick={() => setSeccionActiva('usuarios')} className="btn-secundario-sm">
              Gestionar Todos
            </button>
          </div>
          <table className="tabla-admin">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.slice(-4).reverse().map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.nombre}</strong>
                    <div className="email-subtext">{user.email}</div>
                  </td>
                  <td>
                    <span className={`badge-rol ${user.rol === 'admin' ? 'badge-admin' : 'badge-cliente'}`}>
                      {user.rol}
                    </span>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleEditarUsuario(user)} className="btn-accion-editar">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}