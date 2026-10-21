function renderizarCarrito() {
  const carrito = obtenerCarrito();
  const tabla = document.getElementById("tablaCarrito");
  const cuerpo = document.getElementById("cuerpoCarrito");
  const mensajeVacio = document.getElementById("carritoVacio");
  const totalEl = document.getElementById("totalCarrito");
  
  if (!tabla || !cuerpo) return;

  if (carrito.length === 0) {
    tabla.hidden = true;
    if (mensajeVacio) mensajeVacio.hidden = false;
    if (totalEl) totalEl.textContent = 0;
    actualizarContadorCarrito();
    return;
  }

  tabla.hidden = false;
  if (mensajeVacio) mensajeVacio.hidden = true;

  let filas = "";

  carrito.forEach(function (item) {
    const producto = PRODUCTOS.find(function (p) {
      return p.codigo === item.codigo;
    });

    if (!producto) return;

    const subtotal = producto.precioResidencial * item.cantidad;

    filas += `
      <tr>
        <td>${obtenerImagenHtml(producto, "imagen-producto")}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precioResidencial}</td>
        <td>
          <button type="button" class="btn-cantidad btn-menos" data-codigo="${item.codigo}" data-cantidad="${item.cantidad}">-</button>
          ${item.cantidad}
          <button type="button" class="btn-cantidad btn-mas" data-codigo="${item.codigo}" data-cantidad="${item.cantidad}">+</button>
        </td>
        <td>$${subtotal}</td>
        <td>
          <button type="button" class="btn-secundario btn-quitar" data-codigo="${item.codigo}">Quitar</button>
        </td>
      </tr>
    `;
  });

  cuerpo.innerHTML = filas;

  const botonesMenos = cuerpo.querySelectorAll(".btn-menos");
  botonesMenos.forEach(boton => {
    boton.addEventListener("click", function() {
      const codigo = this.getAttribute("data-codigo");
      const cantidadActual = Number(this.getAttribute("data-cantidad"));
      actualizarCantidad(codigo, cantidadActual - 1);
      renderizarCarrito();
    });
  });

  const botonesMas = cuerpo.querySelectorAll(".btn-mas");
  botonesMas.forEach(boton => {
    boton.addEventListener("click", function() {
      const codigo = this.getAttribute("data-codigo");
      const cantidadActual = Number(this.getAttribute("data-cantidad"));
      actualizarCantidad(codigo, cantidadActual + 1);
      renderizarCarrito();
    });
  });

  const botonesQuitar = cuerpo.querySelectorAll(".btn-quitar");
  botonesQuitar.forEach(boton => {
    boton.addEventListener("click", function() {
      const codigo = this.getAttribute("data-codigo");
      quitarDelCarrito(codigo);
      renderizarCarrito();
    });
  });

  if (totalEl) totalEl.textContent = calcularTotal();

  actualizarContadorCarrito();
}

renderizarCarrito();
const botonPagar = document.getElementById("btn-pagar");

if (botonPagar) {
    botonPagar.addEventListener("click", function() {
        // Leemos el carrito desde localStorage
        const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
        
        // Si no hay productos, evitamos que vaya a la página de pago
        if (carritoActual.length === 0) {
            alert("Tu carrito está vacío. Agrega productos antes de pagar.");
            return; 
        }
        
        // Si hay productos, hacemos la redirección a la nueva página
        window.location.href = "pago.html";
    });
}
const btnAplicarCupon = document.getElementById("btn-aplicar-cupon");
const inputCupon = document.getElementById("cupon");
const spanTotalCarrito = document.getElementById("totalCarrito");
let descuentoAplicado = false;

if (btnAplicarCupon) {
    btnAplicarCupon.addEventListener("click", function() {
        const codigo = inputCupon.value.trim().toUpperCase();
        
        if (descuentoAplicado) {
            alert("Ya has aplicado un descuento a esta compra.");
            return;
        }

        if (codigo === "DUOC2026") {
            const totalActual = parseInt(spanTotalCarrito.textContent.replace(/\./g, ''));
            if (totalActual > 0) {
                const nuevoTotal = Math.round(totalActual * 0.90);
                spanTotalCarrito.textContent = nuevoTotal.toLocaleString("es-CL");
                descuentoAplicado = true;
                inputCupon.disabled = true;
                alert("¡Cupón DUOC2026 aplicado! Se descontó un 10% al total.");
            } else {
                alert("Agrega productos al carrito antes de usar un cupón.");
            }
        } else if (codigo === "") {
            alert("Ingresa un código de cupón.");
        } else {
            alert("Cupón inválido o expirado.");
        }
    });
}