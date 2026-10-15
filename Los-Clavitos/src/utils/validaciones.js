export function validarCorreo(correo) {
    if (!correo.trim()) {
        return "El correo electrónico es obligatorio.";
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo.trim())) {
        return "Ingrese un correo electrónico válido.";
    }

    return "";
}

export function validarContrasena(contrasena) {
    if (!contrasena) {
        return "La contraseña es obligatoria.";
    }

    if (contrasena.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres.";
    }

    return "";
}