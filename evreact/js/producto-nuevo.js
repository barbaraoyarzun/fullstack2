function validarCodigo() {
    const valor = document.getElementById("codigo").value.trim();
    if (valor.length < 3) {
        mostrarError("errorCodigo", "El código es obligatorio y debe tener al menos 3 caracteres.");
        return false;
    }
    if (PRODUCTOS.some(p => p.codigo === valor)) {
        mostrarError("errorCodigo", "Ya existe un producto con ese código.");
        return false;
    }
    limpiarError("errorCodigo");
    return true;
}

function validarNombre() {
    const valor = document.getElementById("nombre").value.trim();
    if (valor.length === 0) {
        mostrarError("errorNombre", "El nombre es obligatorio.");
        return false;
    }
    if (valor.length > 100) {
        mostrarError("errorNombre", "El nombre no puede superar los 100 caracteres.");
        return false;
    }
    limpiarError("errorNombre");
    return true;
}

function validarDescripcion() {
    const valor = document.getElementById("descripcion").value.trim();
    if (valor.length > 500) {
        mostrarError("errorDescripcion", "La descripción no puede superar los 500 caracteres.");
        return false;
    }
    limpiarError("errorDescripcion");
    return true;
}

function validarCategoria() {
    const valor = document.getElementById("categoria").value;
    if (valor === "") {
        mostrarError("errorCategoria", "Debes seleccionar una categoría.");
        return false;
    }
    limpiarError("errorCategoria");
    return true;
}

function validarUnidad() {
    const valor = document.getElementById("unidad").value;
    if (valor === "") {
        mostrarError("errorUnidad", "Debes seleccionar una unidad.");
        return false;
    }
    limpiarError("errorUnidad");
    return true;
}

function validarPrecioResidencial() {
    const valor = document.getElementById("precioResidencial").value;
    if (valor === "" || isNaN(valor) || Number(valor) < 0) {
        mostrarError("errorPrecioResidencial", "Ingresa un precio residencial válido (0 o mayor).");
        return false;
    }
    limpiarError("errorPrecioResidencial");
    return true;
}

function validarPrecioComercial() {
    const valor = document.getElementById("precioComercial").value;
    if (valor === "" || isNaN(valor) || Number(valor) < 0) {
        mostrarError("errorPrecioComercial", "Ingresa un precio comercial válido (0 o mayor).");
        return false;
    }
    limpiarError("errorPrecioComercial");
    return true;
}

function validarStock() {
    const valor = document.getElementById("stock").value;
    if (valor === "" || !Number.isInteger(Number(valor)) || Number(valor) < 0) {
        mostrarError("errorStock", "El stock debe ser un número entero de 0 o más.");
        return false;
    }
    limpiarError("errorStock");
    return true;
}

function validarStockCritico() {
    const valor = document.getElementById("stockCritico").value;
    if (valor !== "" && (!Number.isInteger(Number(valor)) || Number(valor) < 0)) {
        mostrarError("errorStockCritico", "El stock crítico debe ser un número entero de 0 o más.");
        return false;
    }
    limpiarError("errorStockCritico");
    return true;
}

document.getElementById("formProductoNuevo").addEventListener("submit", function (e) {
    e.preventDefault();

    const codigoValido = validarCodigo();
    const nombreValido = validarNombre();
    const descripcionValida = validarDescripcion();
    const categoriaValida = validarCategoria();
    const unidadValida = validarUnidad();
    const precioResidencialValido = validarPrecioResidencial();
    const precioComercialValido = validarPrecioComercial();
    const stockValido = validarStock();
    const stockCriticoValido = validarStockCritico();

    const formularioValido = codigoValido && nombreValido && descripcionValida &&
        categoriaValida && unidadValida && precioResidencialValido &&
        precioComercialValido && stockValido && stockCriticoValido;

    if (!formularioValido) return;

    const nuevoProducto = {
        codigo: document.getElementById("codigo").value.trim(),
        categoria: document.getElementById("categoria").value,
        nombre: document.getElementById("nombre").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        unidad: document.getElementById("unidad").value,
        precioResidencial: Number(document.getElementById("precioResidencial").value),
        precioComercial: Number(document.getElementById("precioComercial").value),
        stock: Number(document.getElementById("stock").value),
        stockCritico: document.getElementById("stockCritico").value !== "" ? Number(document.getElementById("stockCritico").value) : 0,
        imagen: document.getElementById("imagen").value.trim()
    };

    PRODUCTOS.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(PRODUCTOS));

    alert("Producto guardado correctamente.");
    window.location.href = "productos.html";
});