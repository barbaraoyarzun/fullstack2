const parametros = new URLSearchParams(window.location.search);
const codigo = parametros.get("codigo");

const producto = PRODUCTOS.find(function (p) {
  return p.codigo === codigo;
});

const breadcrumbEl = document.getElementById("breadcrumb");
const detalleEl = document.getElementById("detalleProducto");
const relacionadosEl = document.getElementById("grid-relacionados");

if(!producto){
  if(breadcrumbEl) breadcrumbEl.textContent = "Home > Producto no encontrado";
  if(detalleEl) detalleEl.innerHTML = "<p>Producto no encontrado</p><a href='../index.html'>Volver al inicio</a>";
  if(relacionadosEl) relacionadosEl.innerHTML = "";
} else {
  if(breadcrumbEl) breadcrumbEl.textContent = `Home > ${producto.categoria} > ${producto.nombre}`;

  if(detalleEl){
    detalleEl.innerHTML = `
      ${obtenerImagenHtml(producto, "imagen-producto-grande")}
      <h2>${producto.nombre}</h2>
      <p>$${producto.precioResidencial}</p>
      <p>${producto.descripcion}</p>
      <label for="inputCantidad">Cantidad:</label>
      <input type="number" id="inputCantidad" value="1" min="1">
      <button type="button" class="btn-primario" id="btnAgregarDetalle" data-codigo="${producto.codigo}">Añadir al carrito</button>
    `;

    const btnAgregar = document.getElementById("btnAgregarDetalle");
    const inputCantidad = document.getElementById("inputCantidad");
    
    if (btnAgregar && inputCantidad) {
      btnAgregar.addEventListener("click", function() {
        const cod = this.getAttribute("data-codigo");
        const cantidad = Number(inputCantidad.value);
        agregarAlCarrito(cod, cantidad);
        actualizarContadorCarrito();
        alert("Producto agregado al carrito");
      });
    }
  }

  const relacionados = PRODUCTOS.filter(function (p) {
    return p.categoria === producto.categoria && p.codigo !== producto.codigo;
  });

  let filasRelacionados = "";
  relacionados.forEach(function (p) {
    filasRelacionados += `
      <div class="tarjeta-producto">
          ${obtenerImagenHtml(p, "imagen-producto")}
          <h3>${p.nombre}</h3>
          <p>$${p.precioResidencial}</p>
          <a class="btn-secundario" href="producto-detalle.html?codigo=${p.codigo}">Ver detalle</a>
      </div>
    `;
  });

  if(relacionadosEl) relacionadosEl.innerHTML = filasRelacionados;
}