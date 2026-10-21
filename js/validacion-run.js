function validarRUN(runCompleto) {
  if (!runCompleto || typeof runCompleto !== "string") {
    return false;
  }

  const runLimpio = runCompleto.trim().replace(/[\.\-\s]/g, "").toUpperCase();

  if (runLimpio.length < 7 || runLimpio.length > 9) {
    return false;
  }

  const cuerpo = runLimpio.slice(0, -1);
  const dvIngresado = runLimpio.slice(-1);

  if (!/^\d+$/.test(cuerpo)) {
    return false;
  }

  let suma = 0;
  let factor = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }

  const resto = suma % 11;
  const dvCalculado = 11 - resto;

  let dvEsperado = "";
  if (dvCalculado === 11) {
    dvEsperado = "0";
  } else if (dvCalculado === 10) {
    dvEsperado = "K";
  } else {
    dvEsperado = dvCalculado.toString();
  }

  return dvIngresado === dvEsperado;
}