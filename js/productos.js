const contenedor = document.getElementById("grid-productos");

if (contenedor) {
  let html = "";
  
  PRODUCTOS.forEach(function (producto) {
    html += `
      <div class="tarjeta-producto">
        ${obtenerImagenHtml(producto, "imagen-producto")}
        <h3>${producto.nombre}</h3>
        <p>$${producto.precioResidencial}</p>
        <a class="btn-secundario" href="producto-detalle.html?codigo=${producto.codigo}">Ver detalle</a>
        <button type="button" class="btn-primario btn-agregar" data-codigo="${producto.codigo}">Añadir</button>
      </div>`;
  });
  
  contenedor.innerHTML = html;

  const botonesAgregar = contenedor.querySelectorAll(".btn-agregar");
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", function() {
      const codigo = this.getAttribute("data-codigo");
      agregarAlCarrito(codigo, 1);
      actualizarContadorCarrito();
      alert("Producto agregado al carrito");
    });
  });
}