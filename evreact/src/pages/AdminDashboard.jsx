import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHomeSection } from '../components/admin/AdminHomeSection';
import { AdminProductosTable } from '../components/admin/AdminProductosTable';
import { AdminUsuariosTable } from '../components/admin/AdminUsuariosTable';

function AdminDashboard() {
  const { usuario } = useAuth();
  const esAdmin = usuario?.rol?.toLowerCase() === 'admin';
  const esVendedor = usuario?.rol?.toLowerCase() === 'vendedor';

  // El Vendedor entra directo a 'productos'; el Admin entra a 'inicio'
  const [seccionActiva, setSeccionActiva] = useState(esVendedor ? 'productos' : 'inicio');
  const [mensaje, setMensaje] = useState('');

  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [boletas, setBoletas] = useState([]);

  // Estados para modales de detalle (Vendedor / Admin)
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [boletaDetalle, setBoletaDetalle] = useState(null);

  const mostrarNotificacion = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const listaProductos = await api.getProductos();
        setProductos(listaProductos);

        const listaBoletas = await api.getBoletas();
        setBoletas(listaBoletas);

        // Solo el ADMIN tiene permiso en el backend para listar usuarios
        if (esAdmin) {
          const listaUsuarios = await api.getUsuarios();
          setUsuarios(
            listaUsuarios.map((u) => ({
              ...u,
              tipo: u.rol,
            }))
          );
        }
      } catch (error) {
        mostrarNotificacion(`Error al cargar datos: ${error.message}`);
      }
    };

    cargarDatos();
  }, [esAdmin]);

  return (
    <div className="layout-admin-html">
      <AdminSidebar seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} />

      <main className="admin-main-view">
        {mensaje && <div className="toast-notificacion">{mensaje}</div>}

        {/* SECCIÓN INICIO (Solo ADMIN) */}
        {esAdmin && seccionActiva === 'inicio' && (
          <AdminHomeSection
            cantidadProductos={productos.length}
            cantidadUsuarios={usuarios.length}
            setSeccionActiva={setSeccionActiva}
          />
        )}

        {/* SECCIÓN PRODUCTOS: Editable para ADMIN, solo lectura + detalle para VENDEDOR */}
        {seccionActiva === 'productos' && esAdmin && (
          <AdminProductosTable
            productos={productos}
            setProductos={setProductos}
            mostrarNotificacion={mostrarNotificacion}
          />
        )}

        {seccionActiva === 'productos' && esVendedor && (
          <section className="caja-titulo-seccion">
            <h2>Catálogo de Productos (Vista Vendedor - Solo Lectura)</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="tabla-html-original" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td>{prod.nombre}</td>
                      <td>{prod.categoria}</td>
                      <td>${Number(prod.precio).toLocaleString('es-CL')}</td>
                      <td>{prod.stock} un.</td>
                      <td>
                        <button
                          type="button"
                          className="btn-primario"
                          onClick={() => setProductoDetalle(prod)}
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {productoDetalle && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
                <h3>Detalle del Producto #{productoDetalle.id}</h3>
                <p><strong>Nombre:</strong> {productoDetalle.nombre}</p>
                <p><strong>Categoría:</strong> {productoDetalle.categoria}</p>
                <p><strong>Descripción:</strong> {productoDetalle.descripcion}</p>
                <p><strong>Precio:</strong> ${Number(productoDetalle.precio).toLocaleString('es-CL')}</p>
                <p><strong>Stock disponible:</strong> {productoDetalle.stock} unidades</p>
                <button type="button" onClick={() => setProductoDetalle(null)}>
                  Cerrar Detalle
                </button>
              </div>
            )}
          </section>
        )}

        {/* SECCIÓN ÓRDENES / BOLETAS (ADMIN y VENDEDOR) */}
        {seccionActiva === 'boletas' && (
          <section className="caja-titulo-seccion">
            <h2>Listado de Órdenes y Boletas</h2>
            {boletas.length === 0 ? (
              <p style={{ marginTop: '1rem' }}>Aún no hay boletas registradas en el sistema.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="tabla-html-original" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                  <thead>
                    <tr>
                      <th>N° Boleta</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boletas.map((b) => (
                      <tr key={b.id}>
                        <td>#{b.id}</td>
                        <td>{new Date(b.fecha).toLocaleString('es-CL')}</td>
                        <td>{b.usuario?.nombre || b.usuario?.correo}</td>
                        <td>${Number(b.total).toLocaleString('es-CL')}</td>
                        <td>{b.estado}</td>
                        <td>
                          <button
                            type="button"
                            className="btn-primario"
                            onClick={() => setBoletaDetalle(b)}
                          >
                            Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {boletaDetalle && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
                <h3>Detalle de Boleta #{boletaDetalle.id}</h3>
                <p><strong>Cliente:</strong> {boletaDetalle.usuario?.nombre} ({boletaDetalle.usuario?.correo})</p>
                <p><strong>Fecha:</strong> {new Date(boletaDetalle.fecha).toLocaleString('es-CL')}</p>
                <p><strong>Estado:</strong> {boletaDetalle.estado}</p>

                <table style={{ width: '100%', marginTop: '0.75rem', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boletaDetalle.detalles?.map((det) => (
                      <tr key={det.id}>
                        <td>{det.producto?.nombre}</td>
                        <td>{det.cantidad}</td>
                        <td>${Number(det.precioUnitario).toLocaleString('es-CL')}</td>
                        <td>${Number(det.subtotal).toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p style={{ marginTop: '0.75rem', fontWeight: 'bold' }}>
                  Total Boleta: ${Number(boletaDetalle.total).toLocaleString('es-CL')}
                </p>
                <button type="button" onClick={() => setBoletaDetalle(null)}>
                  Cerrar Detalle
                </button>
              </div>
            )}
          </section>
        )}

        {/* SECCIÓN USUARIOS (Solo ADMIN) */}
        {esAdmin && seccionActiva === 'usuarios' && (
          <AdminUsuariosTable
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            mostrarNotificacion={mostrarNotificacion}
          />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;