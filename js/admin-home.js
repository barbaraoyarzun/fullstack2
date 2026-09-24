const statProductos = document.getElementById("statProductos");
if (statProductos) {
  statProductos.textContent = PRODUCTOS.length + " productos registrados";
}

const statUsuarios = document.getElementById("statUsuarios");
if (statUsuarios) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  statUsuarios.textContent = usuarios.length + " usuarios registrados";
}