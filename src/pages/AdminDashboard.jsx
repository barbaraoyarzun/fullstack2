import { useState, useEffect } from 'react';
import { productosData } from '../data/productos';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHomeSection } from '../components/admin/AdminHomeSection';
import { AdminProductosTable } from '../components/admin/AdminProductosTable';
import { AdminUsuariosTable } from '../components/admin/AdminUsuariosTable';

const usuariosIniciales = [
  { id: 1, run: '111111111', nombre: 'Admin Gas El Volcán', correo: 'admin@duoc.cl', tipo: 'Administrador' },
  { id: 2, run: '222222222', nombre: 'Carlos Repartidor Ñuble', correo: 'vendedor@duoc.cl', tipo: 'Vendedor' },
  { id: 3, run: '19011022K', nombre: 'Juan Pérez', correo: 'cliente@gmail.com', tipo: 'Cliente' },
  { id: 4, run: '220268594', nombre: 'juan perez', correo: 'juan@gmail.com', tipo: 'Cliente' }
];

function AdminDashboard() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [mensaje, setMensaje] = useState('');

  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos_admin');
    return guardados ? JSON.parse(guardados) : productosData;
  });

  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem('usuarios_admin');
    return guardados ? JSON.parse(guardados) : usuariosIniciales;
  });

  useEffect(() => {
    localStorage.setItem('productos_admin', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('usuarios_admin', JSON.stringify(usuarios));
  }, [usuarios]);

  const mostrarNotificacion = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="layout-admin-html">
      <AdminSidebar seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} />

      <main className="admin-main-view">
        {mensaje && <div className="toast-notificacion">{mensaje}</div>}

        {seccionActiva === 'inicio' && (
          <AdminHomeSection
            cantidadProductos={productos.length}
            cantidadUsuarios={usuarios.length}
            setSeccionActiva={setSeccionActiva}
          />
        )}

        {seccionActiva === 'productos' && (
          <AdminProductosTable
            productos={productos}
            setProductos={setProductos}
            mostrarNotificacion={mostrarNotificacion}
          />
        )}

        {seccionActiva === 'usuarios' && (
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