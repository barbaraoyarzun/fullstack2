const codigoEditar = localStorage.getItem("codigoProductoEditar");

const producto = PRODUCTOS.find(p => p.codigo === codigoEditar);

if (!producto) {
    alert("No se encontró el producto a editar");
    window.location.href = "productos.html";
} else {
    document.getElementById("codigo").value = producto.codigo;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion || "";
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("unidad").value = producto.unidad;
    document.getElementById("precioResidencial").value = producto.precioResidencial;
    document.getElementById("precioComercial").value = producto.precioComercial;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("stockCritico").value = producto.stockCritico;
    document.getElementById("imagen").value = producto.imagen || "";
}

function validarNombreEditar() {
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

function validarDescripcionEditar() {
    const valor = document.getElementById("descripcion").value.trim();
    if (valor.length > 500) {
        mostrarError("errorDescripcion", "La descripción no puede superar los 500 caracteres.");
        return false;
    }
    limpiarError("errorDescripcion");
    return true;
}

function validarCategoriaEditar() {
    const valor = document.getElementById("categoria").value;
    if (valor === "") {
        mostrarError("errorCategoria", "Debes seleccionar una categoría.");
        return false;
    }
    limpiarError("errorCategoria");
    return true;
}

function validarUnidadEditar() {
    const valor = document.getElementById("unidad").value;
    if (valor === "") {
        mostrarError("errorUnidad", "Debes seleccionar una unidad.");
        return false;
    }
    limpiarError("errorUnidad");
    return true;
}

function validarPrecioResidencialEditar() {
    const valor = document.getElementById("precioResidencial").value;
    if (valor === "" || isNaN(valor) || Number(valor) < 0) {
        mostrarError("errorPrecioResidencial", "Ingresa un precio residencial válido (0 o mayor).");
        return false;
    }
    limpiarError("errorPrecioResidencial");
    return true;
}

function validarPrecioComercialEditar() {
    const valor = document.getElementById("precioComercial").value;
    if (valor === "" || isNaN(valor) || Number(valor) < 0) {
        mostrarError("errorPrecioComercial", "Ingresa un precio comercial válido (0 o mayor).");
        return false;
    }
    limpiarError("errorPrecioComercial");
    return true;
}

function validarStockEditar() {
    const valor = document.getElementById("stock").value;
    if (valor === "" || !Number.isInteger(Number(valor)) || Number(valor) < 0) {
        mostrarError("errorStock", "El stock debe ser un número entero de 0 o más.");
        return false;
    }
    limpiarError("errorStock");
    return true;
}

function validarStockCriticoEditar() {
    const valor = document.getElementById("stockCritico").value;
    if (valor !== "" && (!Number.isInteger(Number(valor)) || Number(valor) < 0)) {
        mostrarError("errorStockCritico", "El stock crítico debe ser un número entero de 0 o más.");
        return false;
    }
    limpiarError("errorStockCritico");
    return true;
}

document.getElementById("formProductoEditar").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombreValido = validarNombreEditar();
    const descripcionValida = validarDescripcionEditar();
    const categoriaValida = validarCategoriaEditar();
    const unidadValida = validarUnidadEditar();
    const precioResidencialValido = validarPrecioResidencialEditar();
    const precioComercialValido = validarPrecioComercialEditar();
    const stockValido = validarStockEditar();
    const stockCriticoValido = validarStockCriticoEditar();

    const formularioValido = nombreValido && descripcionValida && categoriaValida &&
        unidadValida && precioResidencialValido && precioComercialValido &&
        stockValido && stockCriticoValido;

    if (!formularioValido) return;

    const indiceProducto = PRODUCTOS.findIndex(p => p.codigo === codigoEditar);
    if (indiceProducto === -1) {
        alert("No se pudo actualizar: el producto ya no existe.");
        window.location.href = "productos.html";
        return;
    }

    PRODUCTOS[indiceProducto].nombre = document.getElementById("nombre").value.trim();
    PRODUCTOS[indiceProducto].descripcion = document.getElementById("descripcion").value.trim();
    PRODUCTOS[indiceProducto].categoria = document.getElementById("categoria").value;
    PRODUCTOS[indiceProducto].unidad = document.getElementById("unidad").value;
    PRODUCTOS[indiceProducto].precioResidencial = Number(document.getElementById("precioResidencial").value);
    PRODUCTOS[indiceProducto].precioComercial = Number(document.getElementById("precioComercial").value);
    PRODUCTOS[indiceProducto].stock = Number(document.getElementById("stock").value);
    PRODUCTOS[indiceProducto].stockCritico = document.getElementById("stockCritico").value !== "" ? Number(document.getElementById("stockCritico").value) : 0;
    PRODUCTOS[indiceProducto].imagen = document.getElementById("imagen").value.trim();

    localStorage.setItem("productos", JSON.stringify(PRODUCTOS));
    alert("Producto actualizado correctamente.");
    window.location.href = "productos.html";
});