export function obtenerEstadoStock(stock, stockMinimo) {
    if (stock <= 0) {
        return {
            texto: "Sin stock",
            variante: "danger",
        };
    }

    if (stock < stockMinimo) {
        return {
            texto: "Stock bajo",
            variante: "warning",
        };
    }

    return {
        texto: "Disponible",
        variante: "success",
    };
}