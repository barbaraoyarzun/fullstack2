// Algoritmo de validación de RUT chileno (Módulo 11)
export const validarRut = (rut) => {
  if (!rut || typeof rut !== 'string') return false;

  // Eliminar puntos, guiones y espacios, y convertir a mayúsculas
  const rutLimpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();

  // Mínimo 8 caracteres (7 dígitos + DV)
  if (rutLimpio.length < 8) return false;

  const cuerpo = rutLimpio.slice(0, -1);
  const dvIngresado = rutLimpio.slice(-1);

  if (!/^[0-9]+$/.test(cuerpo)) return false;

  // Cálculo del Módulo 11
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  const dvEsperado = 11 - resto;

  let dvCalculado = '';
  if (dvEsperado === 11) dvCalculado = '0';
  else if (dvEsperado === 10) dvCalculado = 'K';
  else dvCalculado = dvEsperado.toString();

  return dvCalculado === dvIngresado;
};

// Validación para el formulario de contacto
export const validarContacto = (formData) => {
  const errores = {};

  if (!formData.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.';
  }

  if (!formData.email.trim()) {
    errores.email = 'El correo electrónico es obligatorio.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errores.email = 'Ingrese un correo electrónico válido.';
  }

  if (!formData.telefono.trim()) {
    errores.telefono = 'El teléfono es obligatorio.';
  } else if (!/^[0-9]{8,9}$/.test(formData.telefono.replace(/\s+/g, ''))) {
    errores.telefono = 'Ingrese un número válido (8 o 9 dígitos).';
  }

  if (!formData.mensaje.trim()) {
    errores.mensaje = 'El mensaje no puede estar vacío.';
  }

  return errores;
};

// Validación para el formulario de registro de usuario
export const validarRegistro = (formData) => {
  const errores = {};

  if (!formData.nombre.trim()) {
    errores.nombre = 'El nombre completo es obligatorio.';
  }

  if (!formData.rut.trim()) {
    errores.rut = 'El RUT es obligatorio.';
  } else if (!validarRut(formData.rut)) {
    errores.rut = 'El RUT ingresado no es válido (Ejemplo: 12345678-K).';
  }

  if (!formData.email.trim()) {
    errores.email = 'El correo electrónico es obligatorio.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errores.email = 'Ingrese un correo electrónico válido.';
  }

  if (!formData.password) {
    errores.password = 'La contraseña es obligatoria.';
  } else if (formData.password.length < 6) {
    errores.password = 'La contraseña debe tener al menos 6 caracteres.';
  }

  if (formData.confirmarPassword !== formData.password) {
    errores.confirmarPassword = 'Las contraseñas no coinciden.';
  }

  if (!formData.aceptaTerminos) {
    errores.aceptaTerminos = 'Debe aceptar los términos y condiciones.';
  }

  return errores;
};