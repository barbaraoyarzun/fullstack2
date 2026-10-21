document.addEventListener("DOMContentLoaded", () => {
  const acciones = document.querySelector(".acciones-usuario");
  if (!acciones) return;

  let activo = null;
  try {
    activo = JSON.parse(localStorage.getItem("usuarioActivo"));
  } catch (e) {
    activo = null;
  }

  if (!activo || !activo.nombre) return;

  const linkLogin = acciones.querySelector('a[href="login.html"]');
  const linkRegistro = acciones.querySelector('a[href="registro.html"]');
  const primerNombre = activo.nombre.split(" ")[0];

  if (activo.rol === "Administrador" || activo.rol === "Vendedor") {
    const linkAdmin = document.createElement("a");
    linkAdmin.href = "admin/home.html";
    linkAdmin.textContent = "Ir a Admin";
    linkAdmin.classList.add("btn-ir-admin");
    acciones.insertBefore(linkAdmin, acciones.firstChild);
  }

  if (linkLogin) {
    linkLogin.textContent = `👤 ${primerNombre}`;
    linkLogin.removeAttribute("href");
    linkLogin.classList.add("badge-usuario");
  }

  if (linkRegistro) {
    linkRegistro.textContent = "Cerrar sesión";
    linkRegistro.setAttribute("href", "#");
    linkRegistro.classList.add("btn-cerrar-sesion");
    linkRegistro.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuarioActivo");
      window.location.href = "index.html";
    });
  }
});