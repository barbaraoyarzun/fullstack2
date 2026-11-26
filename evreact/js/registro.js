document.addEventListener("DOMContentLoaded", () => {
  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }

  const datosUbicacion = [
    {
      region: "Región de Ñuble",
      comunas: [
        "Chillán",
        "Chillán Viejo",
        "El Carmen",
        "Pinto",
        "San Ignacio",
        "Bulnes",
        "Quillón"
      ]
    }
  ];

  const form = document.getElementById("formRegistro");
  const inputRun = document.getElementById("run");
  const inputNombre = document.getElementById("nombre");
  const inputApellidos = document.getElementById("apellidos");
  const inputCorreo = document.getElementById("correo");
  const inputPassword = document.getElementById("password");
  const inputConfirmPassword = document.getElementById("confirmPassword");
  const inputTelefono = document.getElementById("telefono");
  const inputFechaNac = document.getElementById("fechaNacimiento");
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");
  const inputDireccion = document.getElementById("direccion");
  const mensajeGeneral = document.getElementById("mensaje-general");

  const errorRun = document.getElementById("error-run");
  const errorNombre = document.getElementById("error-nombre");
  const errorApellidos = document.getElementById("error-apellidos");
  const errorCorreo = document.getElementById("error-correo");
  const errorPassword = document.getElementById("error-password");
  const errorConfirmPassword = document.getElementById("error-confirmPassword");
  const errorTelefono = document.getElementById("error-telefono");
  const errorFechaNac = document.getElementById("error-fechaNacimiento");
  const errorRegion = document.getElementById("error-region");
  const errorComuna = document.getElementById("error-comuna");
  const errorDireccion = document.getElementById("error-direccion");

  const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

  datosUbicacion.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.region;
    opt.textContent = item.region;
    selectRegion.appendChild(opt);
  });

  selectRegion.addEventListener("change", () => {
    const regionSeleccionada = selectRegion.value;
    selectComuna.innerHTML = '<option value="">-- Selecciona una comuna --</option>';

    if (!regionSeleccionada) {
      selectComuna.disabled = true;
      validarRegion();
      return;
    }

    const encontrada = datosUbicacion.find(item => item.region === regionSeleccionada);
    if (encontrada) {
      encontrada.comunas.forEach(comuna => {
        const opt = document.createElement("option");
        opt.value = comuna;
        opt.textContent = comuna;
        selectComuna.appendChild(opt);
      });
      selectComuna.disabled = false;
    }

    validarRegion();
  });

  selectComuna.addEventListener("change", validarComuna);

  function validarCampoRUN() {
    const valor = inputRun.value.trim().toUpperCase();

    if (valor === "") {
      mostrarError(inputRun, errorRun, "El RUN es obligatorio.");
      return false;
    }

    if (valor.includes(".") || valor.includes("-")) {
      mostrarError(inputRun, errorRun, "El RUN debe ser sin puntos ni guión (ej: 19011022K).");
      return false;
    }

    if (valor.length < 7 || valor.length > 9) {
      mostrarError(inputRun, errorRun, "Debe tener entre 7 y 9 caracteres.");
      return false;
    }

    if (typeof validarRUN !== "function") {
      mostrarError(inputRun, errorRun, "Error interno: funcion validarRUN no disponible.");
      return false;
    }

    if (!validarRUN(valor)) {
      mostrarError(inputRun, errorRun, "El RUN ingresado no es válido (dígito verificador incorrecto).");
      return false;
    }

    limpiarError(inputRun, errorRun);
    return true;
  }

  function validarNombre() {
    const valor = inputNombre.value.trim();
    if (valor === "") {
      mostrarError(inputNombre, errorNombre, "El nombre es obligatorio.");
      return false;
    }
    if (valor.length > 50) {
      mostrarError(inputNombre, errorNombre, "Máximo 50 caracteres.");
      return false;
    }
    limpiarError(inputNombre, errorNombre);
    return true;
  }

  function validarApellidos() {
    const valor = inputApellidos.value.trim();
    if (valor === "") {
      mostrarError(inputApellidos, errorApellidos, "Los apellidos son obligatorios.");
      return false;
    }
    if (valor.length > 100) {
      mostrarError(inputApellidos, errorApellidos, "Máximo 100 caracteres.");
      return false;
    }
    limpiarError(inputApellidos, errorApellidos);
    return true;
  }

  function validarCorreo() {
    const valor = inputCorreo.value.trim().toLowerCase();
    if (valor === "") {
      mostrarError(inputCorreo, errorCorreo, "El correo es obligatorio.");
      return false;
    }
    if (valor.length > 100) {
      mostrarError(inputCorreo, errorCorreo, "Máximo 100 caracteres.");
      return false;
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(valor)) {
      mostrarError(inputCorreo, errorCorreo, "Formato de correo no válido.");
      return false;
    }
    const tieneDominioPermitido = dominiosValidos.some(dominio => valor.endsWith(dominio));
    if (!tieneDominioPermitido) {
      mostrarError(inputCorreo, errorCorreo, "Solo se permite @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return false;
    }
    limpiarError(inputCorreo, errorCorreo);
    return true;
  }

  function validarPassword() {
    const valor = inputPassword.value;
    if (valor.trim() === "") {
      mostrarError(inputPassword, errorPassword, "La contraseña es obligatoria.");
      return false;
    }
    if (valor.length < 4 || valor.length > 10) {
      mostrarError(inputPassword, errorPassword, "Debe tener entre 4 y 10 caracteres.");
      return false;
    }
    limpiarError(inputPassword, errorPassword);
    if (inputConfirmPassword.value !== "") {
      validarConfirmPassword();
    }
    return true;
  }

  function validarConfirmPassword() {
    const clave = inputPassword.value;
    const confirm = inputConfirmPassword.value;
    if (confirm.trim() === "") {
      mostrarError(inputConfirmPassword, errorConfirmPassword, "Confirma tu contraseña.");
      return false;
    }
    if (clave !== confirm) {
      mostrarError(inputConfirmPassword, errorConfirmPassword, "Las contraseñas no coinciden.");
      return false;
    }
    limpiarError(inputConfirmPassword, errorConfirmPassword);
    return true;
  }

  function validarTelefono() {
    const valor = inputTelefono.value.trim();
    if (valor === "") {
      limpiarError(inputTelefono, errorTelefono);
      return true;
    }
    if (!/^\+?[0-9]{8,12}$/.test(valor)) {
      mostrarError(inputTelefono, errorTelefono, "Formato inválido. Ej: +56912345678");
      return false;
    }
    limpiarError(inputTelefono, errorTelefono);
    return true;
  }

  function validarFechaNac() {
    const valor = inputFechaNac.value;
    if (!valor) {
      limpiarError(inputFechaNac, errorFechaNac);
      return true;
    }
    const fecha = new Date(valor);
    const hoy = new Date();
    if (fecha > hoy) {
      mostrarError(inputFechaNac, errorFechaNac, "La fecha no puede ser futura.");
      return false;
    }
    limpiarError(inputFechaNac, errorFechaNac);
    return true;
  }

  function validarRegion() {
    if (!selectRegion.value) {
      mostrarError(selectRegion, errorRegion, "Selecciona una región.");
      return false;
    }
    limpiarError(selectRegion, errorRegion);
    return true;
  }

  function validarComuna() {
    if (!selectComuna.value) {
      mostrarError(selectComuna, errorComuna, "Selecciona una comuna.");
      return false;
    }
    limpiarError(selectComuna, errorComuna);
    return true;
  }

  function validarDireccion() {
    const valor = inputDireccion.value.trim();
    if (valor === "") {
      mostrarError(inputDireccion, errorDireccion, "La dirección es obligatoria.");
      return false;
    }
    if (valor.length > 300) {
      mostrarError(inputDireccion, errorDireccion, "Máximo 300 caracteres.");
      return false;
    }
    limpiarError(inputDireccion, errorDireccion);
    return true;
  }

  function mostrarError(input, elemError, mensaje) {
    input.classList.add("input-invalido");
    input.classList.remove("input-valido");
    elemError.textContent = mensaje;
  }

  function limpiarError(input, elemError) {
    input.classList.remove("input-invalido");
    input.classList.add("input-valido");
    elemError.textContent = "";
  }

  inputRun.addEventListener("input", validarCampoRUN);
  inputRun.addEventListener("blur", validarCampoRUN);
  inputNombre.addEventListener("input", validarNombre);
  inputNombre.addEventListener("blur", validarNombre);
  inputApellidos.addEventListener("input", validarApellidos);
  inputApellidos.addEventListener("blur", validarApellidos);
  inputCorreo.addEventListener("input", validarCorreo);
  inputCorreo.addEventListener("blur", validarCorreo);
  inputPassword.addEventListener("input", validarPassword);
  inputPassword.addEventListener("blur", validarPassword);
  inputConfirmPassword.addEventListener("input", validarConfirmPassword);
  inputConfirmPassword.addEventListener("blur", validarConfirmPassword);
  inputTelefono.addEventListener("input", validarTelefono);
  inputTelefono.addEventListener("blur", validarTelefono);
  inputFechaNac.addEventListener("change", validarFechaNac);
  inputDireccion.addEventListener("input", validarDireccion);
  inputDireccion.addEventListener("blur", validarDireccion);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const runOk = validarCampoRUN();
    const nombreOk = validarNombre();
    const apellidosOk = validarApellidos();
    const correoOk = validarCorreo();
    const passwordOk = validarPassword();
    const confirmOk = validarConfirmPassword();
    const telOk = validarTelefono();
    const fechaOk = validarFechaNac();
    const regionOk = validarRegion();
    const comunaOk = validarComuna();
    const dirOk = validarDireccion();

    if (
      runOk && nombreOk && apellidosOk && correoOk && 
      passwordOk && confirmOk && telOk && fechaOk && 
      regionOk && comunaOk && dirOk
    ) {
      const nuevoUsuario = {
        run: inputRun.value.trim().toUpperCase(),
        nombre: inputNombre.value.trim(),
        apellidos: inputApellidos.value.trim(),
        correo: inputCorreo.value.trim().toLowerCase(),
        password: inputPassword.value,
        fechaNacimiento: inputFechaNac.value || "No especificada",
        telefono: inputTelefono.value.trim() || "No especificado",
        tipoUsuario: "Cliente",
        region: selectRegion.value,
        comuna: selectComuna.value,
        direccion: inputDireccion.value.trim()
      };

      const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

      const correoExiste = usuariosGuardados.some(u => u.correo === nuevoUsuario.correo);
      if (correoExiste) {
        mostrarError(inputCorreo, errorCorreo, "Este correo ya se encuentra registrado.");
        return;
      }

      const runExiste = usuariosGuardados.some(u => u.run === nuevoUsuario.run);
      if (runExiste) {
        mostrarError(inputRun, errorRun, "Este RUN ya se encuentra registrado.");
        return;
      }

      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

      mensajeGeneral.className = "mensaje-alerta exito";
      mensajeGeneral.textContent = "¡Usuario registrado con éxito! Redirigiendo a Iniciar Sesión...";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      mensajeGeneral.className = "mensaje-alerta error";
      mensajeGeneral.textContent = "Por favor, completa correctamente todos los campos obligatorios.";
    }
  });
});