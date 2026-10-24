import { validarCorreo } from "./validaciones";

// Valida la información ingresada durante la confirmación.
export function validarDatosPedido(datos) {
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

    const tiposEntrega = [
        "Retiro en tienda",
        "Despacho a domicilio"
    ];

    if (!tiposEntrega.includes(datos.tipoEntrega)) {
        errores.tipoEntrega = "Seleccione un tipo de entrega válido.";
    }

    if (
        datos.tipoEntrega === "Despacho a domicilio" &&
        !datos.direccion.trim()
    ) {
        errores.direccion = "La dirección es obligatoria para el despacho.";
    }

    return errores;
}