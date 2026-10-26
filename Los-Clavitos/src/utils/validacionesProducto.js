export function validarProducto(producto) {
    const camposTexto = [
        "codigo",
        "nombre",
        "categoria",
        "subcategoria",
        "marca",
        "unidad"
    ];

    const camposNumericos = [
        "precioCompra",
        "precioVenta",
        "stock",
        "stockMinimo"
    ];

    const campos = [...camposTexto, ...camposNumericos];

    const hayCamposVacios = campos.some(
        (campo) => !String(producto[campo] ?? "").trim()
    );

    if (hayCamposVacios) {
        return {
            error: "Todos los campos son obligatorios.",
            datos: null
        };
    }

    const datos = { ...producto };

    camposTexto.forEach((campo) => {
        datos[campo] = producto[campo].trim();
    });

    camposNumericos.forEach((campo) => {
        datos[campo] = Number(producto[campo]);
    });

    datos.imagen = String(producto.imagen ?? "").trim();

    if (datos.imagen && !/^https?:\/\//i.test(datos.imagen)) {
        return {
            error: "La imagen debe ser una URL que comience con http:// o https://.",
            datos: null
        };
    }

    const { precioCompra, precioVenta, stock, stockMinimo } = datos;

    if (
        !camposNumericos.every((campo) => Number.isInteger(datos[campo])) ||
        precioCompra < 0 ||
        precioVenta <= 0 ||
        stock < 0 ||
        stockMinimo < 0
    ) {
        return {
            error: "Ingresa precios enteros válidos y cantidades no negativas.",
            datos: null
        };
    }

    return {
        error: "",
        datos
    };
}