function mostrarProductosAdmin() {
  const cuerpo = document.getElementById("cuerpoProductosAdmin");
  if (!cuerpo) return;

  let filas = "";

  PRODUCTOS.forEach(function (producto) {
    filas += `
      <tr>
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>$${producto.precioResidencial}</td>
        <td>${producto.stock}</td>
        <td>
          <button type="button" class="btn-editar" data-codigo="${producto.codigo}">Editar</button>
          <button type="button" class="btn-eliminar" data-codigo="${producto.codigo}">Eliminar</button>
        </td>
      </tr>
    `;
  });

  cuerpo.innerHTML = filas;

  const botonesEditar = cuerpo.querySelectorAll(".btn-editar");
  botonesEditar.forEach(boton => {
    boton.addEventListener("click", function() {
      const codigo = this.getAttribute("data-codigo");
      editarProducto(codigo);
    });
  });

  const botonesEliminar = cuerpo.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach(boton => {
    boton.addEventListener("click", function() {
      const codigo = this.getAttribute("data-codigo");
      eliminarProducto(codigo);
    });
  });
}

function editarProducto(codigo) {
  localStorage.setItem("codigoProductoEditar", codigo);
  window.location.href = "producto-editar.html";
}

function eliminarProducto(codigo) {
  if (!confirm("¿Eliminar este producto?")) return;

  PRODUCTOS = PRODUCTOS.filter(function (p) {
    return p.codigo !== codigo;
  });

  localStorage.setItem("productos", JSON.stringify(PRODUCTOS));
  mostrarProductosAdmin();
}

mostrarProductosAdmin();