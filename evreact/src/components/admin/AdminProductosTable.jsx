import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { obtenerImagen } from '../../utils/imagenes';

const IMAGENES_DISPONIBLES = [
  'cilindro-5kg.jpg',
  'cilindro-11kg.jpg',
  'cilindro-15kg.jpg',
  'cilindro-45kg.jpg',
  'regulador-de-alta-presion.jpg',
  'regulador-dual.jpg',
  'manguera-gas.jpg',
  'manguera-gas-3m.jpg',
  'kit-conexion.jpg',
  'detector-gas.jpg',
  'carro-gas.jpg',
  'tapa-gas.jpg',
];

const FORM_INICIAL = {
  id: null,
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  categoria: 'Cilindros',
  imagen: 'cilindro-11kg.jpg',
};

export function AdminProductosTable() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [editando, setEditando] = useState(false);

  const cargarProductos = async () => {
    try {
      const data = await api.getProductos();
      setProductos(data);
    } catch (err) {
      alert('Error al cargar productos: ' + err.message);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    };

    try {
      if (editando && form.id) {
        await api.actualizarProducto(form.id, payload);
      } else {
        await api.crearProducto(payload);
      }
      setForm(FORM_INICIAL);
      setEditando(false);
      await cargarProductos();
    } catch (err) {
      alert('Error al guardar producto: ' + err.message);
    }
  };

  const handleEditar = (prod) => {
    setForm(prod);
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este producto de la base de datos?')) return;
    try {
      await api.eliminarProducto(id);
      await cargarProductos();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  return (
    <div>
      <div className="caja-titulo-seccion">
        <h2>Gestión de Productos</h2>
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
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Ej: Cilindro GLP 15 kg"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Categoría</label>
              <select
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              >
                <option value="Cilindros">Cilindros</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>

            <div className="form-group">
              <label>Precio ($)</label>
              <input
                type="number"
                placeholder="14500"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                placeholder="20"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Imagen</label>
              <select
                value={form.imagen}
                onChange={(e) => setForm({ ...form, imagen: e.target.value })}
              >
                {IMAGENES_DISPONIBLES.map((img) => (
                  <option key={img} value={img}>
                    {img}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <input
                type="text"
                placeholder="Breve descripción"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button type="submit" className="btn-nuevo-registro">
              {editando ? 'Actualizar Producto' : '+ Crear Producto'}
            </button>
            {editando && (
              <button
                type="button"
                className="btn-secundario"
                onClick={() => {
                  setForm(FORM_INICIAL);
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
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <img
                  src={obtenerImagen(p.imagen)}
                  alt={p.nombre}
                  style={{ width: '42px', height: '42px', objectFit: 'contain' }}
                />
              </td>
              <td><strong>{p.nombre}</strong></td>
              <td>{p.categoria}</td>
              <td>${p.precio.toLocaleString('es-CL')}</td>
              <td>{p.stock}</td>
              <td>
                <div className="acciones-botones-vertical">
                  <button
                    type="button"
                    className="btn-blue-edit"
                    onClick={() => handleEditar(p)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn-red-delete"
                    onClick={() => handleEliminar(p.id)}
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

export default AdminProductosTable;