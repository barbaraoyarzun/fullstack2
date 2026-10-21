import { useState } from 'react';

export function AdminProductosTable({ productos, setProductos, mostrarNotificacion }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    categoria: 'Cilindros de Gas',
    precio: '',
    stock: ''
  });

  const handleNuevo = () => {
    setEditandoId(null);
    setForm({ codigo: `CL00${productos.length + 1}`, nombre: '', categoria: 'Cilindros de Gas', precio: '', stock: '' });
    setMostrarForm(true);
  };

  const handleEditar = (prod) => {
    setEditandoId(prod.id);
    setForm({
      codigo: prod.codigo || `CL00${prod.id}`,
      nombre: prod.nombre,
      categoria: prod.categoria || 'Cilindros de Gas',
      precio: prod.precio,
      stock: prod.stock || 50
    });
    setMostrarForm(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      setProductos(productos.filter((p) => p.id !== id));
      mostrarNotificacion('Producto eliminado.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) return alert('Complete nombre y precio.');

    if (editandoId) {
      setProductos(productos.map((p) => (p.id === editandoId ? { ...p, ...form, precio: Number(form.precio) } : p)));
      mostrarNotificacion('Producto actualizado.');
    } else {
      const nuevo = { ...form, id: Date.now(), precio: Number(form.precio), stock: Number(form.stock) || 10 };
      setProductos([...productos, nuevo]);
      mostrarNotificacion('Nuevo producto agregado.');
    }
    setMostrarForm(false);
  };

  return (
    <div className="admin-panel-contenido">
      <div className="caja-titulo-seccion">
        <h2>Productos</h2>
      </div>

      <div className="barra-accion-tabla">
        <button type="button" onClick={handleNuevo} className="btn-nuevo-registro">
          Nuevo Producto
        </button>
      </div>

      {mostrarForm && (
        <div className="auth-card" style={{ marginBottom: '20px', maxWidth: '100%' }}>
          <h3>{editandoId ? 'Editar Producto' : 'Crear Producto'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label>Código:</label>
              <input type="text" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Categoría:</label>
              <input type="text" value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Precio Residencial ($):</label>
              <input type="number" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Stock:</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
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
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio Residencial</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod, i) => (
            <tr key={prod.id}>
              <td>{prod.codigo || `CL00${i + 1}`}</td>
              <td>{prod.nombre}</td>
              <td>{prod.categoria || 'Cilindros de Gas'}</td>
              <td>${prod.precio}</td>
              <td>{prod.stock || 50}</td>
              <td>
                <div className="acciones-botones-vertical">
                  <button type="button" onClick={() => handleEditar(prod)} className="btn-blue-edit">
                    Editar
                  </button>
                  <button type="button" onClick={() => handleEliminar(prod.id)} className="btn-red-delete">
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