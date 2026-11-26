function guardarCarrito(carrito) {
  const texto = JSON.stringify(carrito);
  localStorage.setItem("carrito", texto);
}

function obtenerCarrito() {
  const texto = localStorage.getItem("carrito");
  if (texto === null) {
    return [];
  }
  return JSON.parse(texto);
}

function agregarAlCarrito(codigo, cantidad) {
  const producto = PRODUCTOS.find(function (p) {
    return p.codigo === codigo;
  });

  if (producto === undefined) {
    console.error("Producto no encontrado:", codigo);
    return;
  }

  const carrito = obtenerCarrito();

  const itemExistente = carrito.find(function (item) {
    return item.codigo === codigo;
  });

  const cantidadActual = itemExistente ? itemExistente.cantidad : 0;
  const cantidadNueva = cantidadActual + cantidad;

  if (cantidadNueva > producto.stock) {
    alert("No hay suficiente stock. Disponible: " + producto.stock);
    return;
  }

  if (itemExistente) {
    itemExistente.cantidad = cantidadNueva;
  } else {
    carrito.push({ codigo: codigo, cantidad: cantidadNueva });
  }

  guardarCarrito(carrito);
}

function quitarDelCarrito(codigo) {
  const carrito = obtenerCarrito();

  const carritoActualizado = carrito.filter(function (item) {
    return item.codigo !== codigo;
  });

  guardarCarrito(carritoActualizado);
}

function actualizarCantidad(codigo, nuevaCantidad) {
  if (nuevaCantidad <= 0) {
    quitarDelCarrito(codigo);
    return;
  }

  const producto = PRODUCTOS.find(function (p) {
    return p.codigo === codigo;
  });

  if (producto === undefined) {
    console.error("Producto no encontrado:", codigo);
    return;
  }

  if (nuevaCantidad > producto.stock) {
    alert("No hay suficiente stock. Disponible: " + producto.stock);
    return;
  }

  const carrito = obtenerCarrito();

  const item = carrito.find(function (i) {
    return i.codigo === codigo;
  });

  if (item) {
    item.cantidad = nuevaCantidad;
    guardarCarrito(carrito);
  }
}

function calcularTotal() {
  const carrito = obtenerCarrito();
  let total = 0;

  carrito.forEach(function (item) {
    const producto = PRODUCTOS.find(function (p) {
      return p.codigo === item.codigo;
    });
    if (producto) {
      total = total + producto.precioResidencial * item.cantidad;
    }
  });

  return total;
}

function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  let totalUnidades = 0;

  carrito.forEach(function (item) {
    totalUnidades = totalUnidades + item.cantidad;
  });

  const contador = document.getElementById("contadorCarrito");
  if (contador) {
    contador.textContent = totalUnidades;
  }
}

actualizarContadorCarrito();