export function AdminHomeSection({ cantidadProductos, cantidadUsuarios, setSeccionActiva }) {
  return (
    <div className="admin-panel-contenido">
      <div className="banner-hola-admin">
        <h1>¡Hola Administrador!</h1>
      </div>

      <div className="tarjeta-blanca-mensaje">
        <p>Bienvenido al panel de administración de Gas El Volcán.</p>
      </div>

      <div className="seccion-resumen-bloque">
        <div className="bloque-resumen-item">
          <h3>Productos</h3>
          <p>{cantidadProductos} productos registrados</p>
          <button
            type="button"
            className="enlace-purpura"
            onClick={() => setSeccionActiva('productos')}
          >
            Ver productos
          </button>
        </div>

        <div className="bloque-resumen-item">
          <h3>Usuarios</h3>
          <p>{cantidadUsuarios} usuarios registrados</p>
          <button
            type="button"
            className="enlace-purpura"
            onClick={() => setSeccionActiva('usuarios')}
          >
            Ver usuarios
          </button>
        </div>
      </div>
    </div>
  );
}