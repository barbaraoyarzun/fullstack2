export function AdminProductos({
  productos,
  productoForm,
  setProductoForm,
  modoEdicionProd,
  handleGuardarProducto,
  handleEditarProducto,
  handleEliminarProducto,
  resetFormProducto
}) {
  return (
    <div className="contenedor-admin-grid">
      <div className="auth-card">
        <h3>{modoEdicionProd ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
        <form onSubmit={handleGuardarProducto}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={productoForm.nombre}
              onChange={(e) => setProductoForm({ ...productoForm, nombre: e.target.value })}
              placeholder="Ej: Cilindro 11 kg"
            />
          </div>

          <div className="form-group">
            <label>Precio ($):</label>
            <input
              type="number"
              value={productoForm.precio}
              onChange={(e) => setProductoForm({ ...productoForm, precio: e.target.value })}
              placeholder="Ej: 12000"
            />
          </div>

          <div className="form-group">
            <label>Categoría:</label>
            <select
              value={productoForm.categoria}
              onChange={(e) => setProductoForm({ ...productoForm, categoria: e.target.value })}
            >
              <option value="Cilindros">Cilindros</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Calefacción">Calefacción</option>
              <option value="Seguridad">Seguridad</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              rows="3"
              value={productoForm.descripcion}
              onChange={(e) => setProductoForm({ ...productoForm, descripcion: e.target.value })}
            />
          </div>

          <div className="acciones-tarjeta">
            <button type="submit" className="btn-primario btn-block">
              {modoEdicionProd ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
            {modoEdicionProd && (
              <button type="button" onClick={resetFormProducto} className="btn-secundario btn-block">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="auth-card tabla-container">
        <h3>Inventario de Productos ({productos.length})</h3>
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>#{prod.id}</td>
                <td><strong>{prod.nombre}</strong></td>
                <td>${Number(prod.precio).toLocaleString('es-CL')}</td>
                <td>{prod.categoria || 'Cilindros'}</td>
                <td className="acciones-tabla">
                  <button type="button" onClick={() => handleEditarProducto(prod)} className="btn-accion-editar">
                    Editar
                  </button>
                  <button type="button" onClick={() => handleEliminarProducto(prod.id)} className="btn-accion-eliminar">
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