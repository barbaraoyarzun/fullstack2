const imagenesAssets = import.meta.glob("../assets/*.{jpg,jpeg,png,svg}", {
  eager: true,
  import: "default",
});

export function obtenerImagen(nombreArchivo) {
  if (!nombreArchivo) return imagenesAssets["../assets/cilindro-11kg.jpg"];
  if (nombreArchivo.startsWith("http")) return nombreArchivo;

  const limpio = nombreArchivo.replace(/^\/?(img|assets)\//, "");
  return (
    imagenesAssets[`../assets/${limpio}`] ||
    imagenesAssets["../assets/cilindro-11kg.jpg"]
  );
}