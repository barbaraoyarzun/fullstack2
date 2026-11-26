const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

function getToken() {
  try {
    const sesion = JSON.parse(localStorage.getItem("sesion_volcan"));
    return sesion?.token || null;
  } catch {
    return null;
  }
}

function normalizarProducto(p) {
  if (!p) return p;
  return {
    ...p,
    categoriaObj: typeof p.categoria === "object" ? p.categoria : null,
    categoria:
      typeof p.categoria === "object"
        ? p.categoria?.nombre || ""
        : p.categoria || "",
  };
}

function prepararProductoPayload(producto) {
  return {
    ...producto,
    categoriaNombre:
      typeof producto.categoria === "object"
        ? producto.categoria?.nombre
        : producto.categoria,
  };
}

async function request(endpoint, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || errorData.mensaje || `Error HTTP ${response.status}`
    );
  }

  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  // --- AUTENTICACIÓN (JWT) ---
  login: (correo, password) =>
    request("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ correo, password }),
    }),

  registrar: (usuario) =>
    request("/v1/auth/registro", {
      method: "POST",
      body: JSON.stringify(usuario),
    }),

  // --- CATEGORÍAS ---
  getCategorias: () => request("/v1/categorias"),

  // --- PRODUCTOS ---
  getProductos: async () => {
    const lista = await request("/v1/productos");
    return Array.isArray(lista) ? lista.map(normalizarProducto) : [];
  },
  getProductoById: async (id) => {
    const prod = await request(`/v1/productos/${id}`);
    return normalizarProducto(prod);
  },
  crearProducto: async (producto) => {
    const creado = await request("/v1/productos", {
      method: "POST",
      body: JSON.stringify(prepararProductoPayload(producto)),
    });
    return normalizarProducto(creado);
  },
  actualizarProducto: async (id, producto) => {
    const actualizado = await request(`/v1/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify(prepararProductoPayload(producto)),
    });
    return normalizarProducto(actualizado);
  },
  eliminarProducto: (id) =>
    request(`/v1/productos/${id}`, {
      method: "DELETE",
    }),

  // --- USUARIOS (SOLO ADMIN) ---
  getUsuarios: () => request("/v1/usuarios"),
  crearUsuario: (usuario) =>
    request("/v1/usuarios", {
      method: "POST",
      body: JSON.stringify(usuario),
    }),
  actualizarUsuario: (id, usuario) =>
    request(`/v1/usuarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(usuario),
    }),
  eliminarUsuario: (id) =>
    request(`/v1/usuarios/${id}`, {
      method: "DELETE",
    }),

  // --- BOLETAS / ÓRDENES ---
  getBoletas: () => request("/v1/boletas"),
  getBoletaById: (id) => request(`/v1/boletas/${id}`),
  getBoletasByUsuario: (usuarioId) => request(`/v1/boletas/usuario/${usuarioId}`),
  crearBoleta: (usuarioId, items) =>
    request("/v1/boletas", {
      method: "POST",
      body: JSON.stringify({ usuarioId, items }),
    }),

  // Alias para mantener compatibilidad con componentes existentes
  getPedidos: () => request("/v1/boletas"),
  crearPedido: (usuarioId, items) =>
    request("/v1/boletas", {
      method: "POST",
      body: JSON.stringify({ usuarioId, items }),
    }),
};