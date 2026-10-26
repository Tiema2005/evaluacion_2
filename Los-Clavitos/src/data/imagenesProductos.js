// Fotografías referenciales por categoría. No corresponden necesariamente a la marca o modelo exacto.
const IMAGENES_POR_CATEGORIA = {
    "Mat. Construcción": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=75",
    "Pinturas": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=75",
    "Herramientas": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=75",
    "Gasfitería": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=75",
    "Electricidad": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=75",
    "Tornillería": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=900&q=75",
    "Madera": "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=900&q=75",
    "Seguridad": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=75",
    "Jardín": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=75"
};

export function imagenPorCategoria(categoria) {
    return IMAGENES_POR_CATEGORIA[categoria] || "";
}

export function obtenerImagenProducto(producto) {
    return producto?.imagen || imagenPorCategoria(producto?.categoria);
}
