import {
    validarCorreo,
    validarContrasena
} from "./validaciones";

export function validarDatosRegistro(datos) {
    const errores = {};

    if (!datos.nombre.trim()) {
        errores.nombre = "El nombre es obligatorio.";
    }

    if (!datos.apellidos.trim()) {
        errores.apellidos = "Los apellidos son obligatorios.";
    }

    const errorCorreo = validarCorreo(datos.correo);

    if (errorCorreo) {
        errores.correo = errorCorreo;
    }

    const errorContrasena = validarContrasena(datos.contrasena);

    if (errorContrasena) {
        errores.contrasena = errorContrasena;
    }

    if (!datos.confirmarContrasena) {
        errores.confirmarContrasena =
            "Debe confirmar su contraseña.";
    } else if (
        datos.contrasena !== datos.confirmarContrasena
    ) {
        errores.confirmarContrasena =
            "Las contraseñas no coinciden.";
    }

    return errores;
}