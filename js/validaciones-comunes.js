function mostrarError(idSpan, mensaje) {
    const span = document.getElementById(idSpan);
    if (span) span.textContent = mensaje;
}

function limpiarError(idSpan) {
    const span = document.getElementById(idSpan);
    if (span) span.textContent = "";
}