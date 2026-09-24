

document.addEventListener("DOMContentLoaded", function() {
    const totalPago = document.getElementById("totalPago");
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    
    if (carritoActual.length === 0) {
        alert("Tu carrito está vacío. Serás redirigido a la tienda.");
        window.location.href = "productos.html";
        return;
    }

    let total = 0;
    carritoActual.forEach(item => {
       
        const productoReal = PRODUCTOS.find(p => p.codigo === item.codigo);
        
        if (productoReal) {
            total += productoReal.precioResidencial * item.cantidad;
        } else if (item.precioResidencial) {
 
            total += item.precioResidencial * item.cantidad;
        }
    });
    
    totalPago.textContent = total.toLocaleString("es-CL");
});

document.getElementById("formPago").addEventListener("submit", function(e) {
    e.preventDefault();

    const direccion = document.getElementById("direccion").value.trim();
    const comuna = document.getElementById("comuna").value;
    const metodoPago = document.getElementById("metodoPago").value;

    let formularioValido = true;

    if (direccion.length < 5) {
        mostrarError("errorDireccion", "Ingresa una dirección válida.");
        formularioValido = false;
    } else {
        limpiarError("errorDireccion");
    }

    if (comuna === "") {
        mostrarError("errorComuna", "Debes seleccionar tu comuna.");
        formularioValido = false;
    } else {
        limpiarError("errorComuna");
    }

    if (metodoPago === "") {
        mostrarError("errorMetodo", "Selecciona un método de pago.");
        formularioValido = false;
    } else {
        limpiarError("errorMetodo");
    }

    if (formularioValido) {
        alert("¡Pago procesado con éxito! Gracias por preferir Gas El Volcán.");
        localStorage.removeItem("carrito");
        window.location.href = "index.html";
    }
});