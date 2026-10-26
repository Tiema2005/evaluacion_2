import { validarCorreo } from "../utils/validaciones";

const CLAVE = "usuarios";
export const ROLES = ["Cliente", "Vendedor", "Administrador"];

function normalizarCorreo(correo) {
    return String(correo ?? "").trim().toLowerCase();
}

export function listarUsuarios() {
    try {
        const guardados = JSON.parse(localStorage.getItem(CLAVE) || "[]");
        return Array.isArray(guardados) ? guardados : [];
    } catch {
        return [];
    }
}

export function obtenerUsuario(correo) {
    const normalizado = normalizarCorreo(correo);
    return listarUsuarios().find((usuario) => usuario.correo === normalizado) ?? null;
}

function validarPerfil(datos) {
    const nombre = String(datos.nombre ?? "").trim();
    const apellidos = String(datos.apellidos ?? "").trim();
    const correo = normalizarCorreo(datos.correo);
    const rol = datos.rol || "Cliente";

    if (!nombre || !apellidos) {
        throw new Error("El nombre y los apellidos son obligatorios.");
    }
    if (validarCorreo(correo)) {
        throw new Error("Ingrese un correo electrónico válido.");
    }
    if (!ROLES.includes(rol)) {
        throw new Error("Seleccione un rol válido.");
    }

    return {
        nombre,
        apellidos,
        correo,
        rol,
        cuentaCorriente: rol === "Cliente" && Boolean(datos.cuentaCorriente)
    };
}

export function crearUsuario(datos) {
    const usuario = validarPerfil(datos);
    if (obtenerUsuario(usuario.correo)) {
        throw new Error("Ya existe un usuario registrado con ese correo.");
    }
    localStorage.setItem(CLAVE, JSON.stringify([...listarUsuarios(), usuario]));
    return usuario;
}

export function actualizarUsuario(correoAnterior, datos) {
    const usuarios = listarUsuarios();
    const indice = usuarios.findIndex(
        (usuario) => usuario.correo === normalizarCorreo(correoAnterior)
    );
    if (indice < 0) {
        throw new Error("No se encontró el usuario.");
    }
    const actualizado = validarPerfil({ ...usuarios[indice], ...datos });
    if (usuarios.some((usuario, i) => i !== indice && usuario.correo === actualizado.correo)) {
        throw new Error("Ya existe otro usuario con ese correo.");
    }
    usuarios[indice] = actualizado;
    localStorage.setItem(CLAVE, JSON.stringify(usuarios));
    return actualizado;
}

export function eliminarUsuario(correo) {
    const usuarios = listarUsuarios();
    const restantes = usuarios.filter(
        (usuario) => usuario.correo !== normalizarCorreo(correo)
    );
    if (restantes.length === usuarios.length) {
        throw new Error("No se encontró el usuario.");
    }
    localStorage.setItem(CLAVE, JSON.stringify(restantes));
    return true;
}
