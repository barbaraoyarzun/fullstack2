let usuarios = [];

try {
    const g = localStorage.getItem("usuarios");
    if (g !== null) {
        const temp = JSON.parse(g);
        if (temp && temp.length > 0) usuarios = temp;
    }
} catch (e) {
    usuarios = [];
}

function mostrarUsuarios() {
    const cuerpo = document.getElementById("cuerpoUsuarios");
    if (!cuerpo) return;
    
    let filas = "";
    for (let i = 0; i < usuarios.length; i++) {
        const u = usuarios[i];
        const run = u.run || "-";
        const nombre = `${u.nombre || ""} ${u.apellidos || ""}`.trim();
        const correo = u.correo || "";
        const tipo = u.tipoUsuario || "Cliente";
        
        filas += `
            <tr>
                <td>${run}</td>
                <td>${nombre}</td>
                <td>${correo}</td>
                <td>${tipo}</td>
                <td>
                    <button class="btn-editar" data-indice="${i}">Editar</button> 
                    <button class="btn-eliminar" data-indice="${i}">Eliminar</button>
                </td>
            </tr>
        `;
    }
    
    cuerpo.innerHTML = filas;

    const botonesEditar = cuerpo.querySelectorAll(".btn-editar");
    botonesEditar.forEach(boton => {
        boton.addEventListener("click", function() {
            const indice = this.getAttribute("data-indice");
            editarUsuario(indice);
        });
    });

    const botonesEliminar = cuerpo.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function() {
            const indice = this.getAttribute("data-indice");
            eliminarUsuario(indice);
        });
    });
}

function editarUsuario(i) {
    localStorage.setItem("indiceUsuarioEditar", i);
    window.location.href = "usuario-editar.html";
}

function eliminarUsuario(i) {
    if (usuarios[i].correo === "admin@duoc.cl") {
        alert("No se puede eliminar admin principal");
        return;
    }
    if (confirm(`¿Eliminar ${usuarios[i].correo}?`)) {
        usuarios.splice(i, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarUsuarios();
    }
}

mostrarUsuarios();