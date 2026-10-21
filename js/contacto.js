document.addEventListener("DOMContentLoaded", () => {
  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }

  const form = document.getElementById("formContacto");
  const inputNombre = document.getElementById("nombre");
  const inputCorreo = document.getElementById("correo");
  const inputComentario = document.getElementById("comentario");
  const contadorCaracteres = document.getElementById("contador-caracteres");

  const errorNombre = document.getElementById("error-nombre");
  const errorCorreo = document.getElementById("error-correo");
  const errorComentario = document.getElementById("error-comentario");
  const mensajeGeneral = document.getElementById("mensaje-general");

  const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

  function validarNombre() {
    const valor = inputNombre.value.trim();

    if (valor === "") {
      mostrarError(inputNombre, errorNombre, "El nombre completo es obligatorio.");
      return false;
    }

    if (valor.length > 100) {
      mostrarError(inputNombre, errorNombre, "El nombre no puede superar los 100 caracteres.");
      return false;
    }

    if (valor.length < 3) {
      mostrarError(inputNombre, errorNombre, "El nombre debe tener al menos 3 caracteres.");
      return false;
    }

    limpiarError(inputNombre, errorNombre);
    return true;
  }

  function validarCorreo() {
    const valor = inputCorreo.value.trim().toLowerCase();

    if (valor === "") {
      mostrarError(inputCorreo, errorCorreo, "El correo electrónico es obligatorio.");
      return false;
    }

    if (valor.length > 100) {
      mostrarError(inputCorreo, errorCorreo, "El correo no puede exceder los 100 caracteres.");
      return false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(valor)) {
      mostrarError(inputCorreo, errorCorreo, "Ingresa un formato de correo valido.");
      return false;
    }

    const tieneDominioPermitido = dominiosValidos.some(dominio => valor.endsWith(dominio));
    if (!tieneDominioPermitido) {
      mostrarError(
        inputCorreo, 
        errorCorreo, 
        "Dominio no permitido. Solo se acepta @duoc.cl, @profesor.duoc.cl o @gmail.com"
      );
      return false;
    }

    limpiarError(inputCorreo, errorCorreo);
    return true;
  }

  function validarComentario() {
    const valor = inputComentario.value.trim();
    const longitud = inputComentario.value.length;

    contadorCaracteres.textContent = `${longitud} / 500`;

    if (valor === "") {
      mostrarError(inputComentario, errorComentario, "El comentario o consulta es obligatorio.");
      return false;
    }

    if (longitud > 500) {
      mostrarError(inputComentario, errorComentario, "El comentario no puede superar los 500 caracteres.");
      return false;
    }

    limpiarError(inputComentario, errorComentario);
    return true;
  }

  function mostrarError(input, elementoError, mensaje) {
    input.classList.add("input-invalido");
    input.classList.remove("input-valido");
    elementoError.textContent = mensaje;
  }

  function limpiarError(input, elementoError) {
    input.classList.remove("input-invalido");
    input.classList.add("input-valido");
    elementoError.textContent = "";
  }

  inputNombre.addEventListener("input", validarNombre);
  inputNombre.addEventListener("blur", validarNombre);

  inputCorreo.addEventListener("input", validarCorreo);
  inputCorreo.addEventListener("blur", validarCorreo);

  inputComentario.addEventListener("input", validarComentario);
  inputComentario.addEventListener("blur", validarComentario);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreOk = validarNombre();
    const correoOk = validarCorreo();
    const comentarioOk = validarComentario();

    if (nombreOk && correoOk && comentarioOk) {
      mensajeGeneral.className = "mensaje-alerta exito";
      mensajeGeneral.textContent = "¡Mensaje enviado con éxito! Nos comunicaremos a la brevedad.";
      
      form.reset();
      contadorCaracteres.textContent = "0 / 500";

      [inputNombre, inputCorreo, inputComentario].forEach(el => el.classList.remove("input-valido"));

      setTimeout(() => {
        mensajeGeneral.style.display = "none";
      }, 4000);
    } else {
      mensajeGeneral.className = "mensaje-alerta error";
      mensajeGeneral.textContent = "Por favor, completa correctamente todos los campos obligatorios.";
    }
  });
});