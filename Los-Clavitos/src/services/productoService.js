// productoService: aquí vive el CRUD (Crear, Leer, Actualizar, Eliminar) de los productos.
// Son funciones de JavaScript puro: no usan React.

import datosExcel from "../data/productos.json";

const CLAVE = "productos";

// Esta función transforma los datos del Excel a una estructura más fácil de usar.
// slice(2) elimina las dos primeras filas porque corresponden al título y encabezados.
function obtenerProductosIniciales() {
    return datosExcel["Catálogo de Productos"].slice(2).map((producto) => ({
        codigo: producto["FERRETERÍA LOS MAESTROS"],
        categoria: producto.Column2,
        subcategoria: producto.Column3,
        nombre: producto.Column4,
        marca: producto.Column5,
        unidad: producto.Column6,
        precioCompra: producto.Column7,
        precioVenta: producto.Column8,
        stock: producto.Column9,
        stockMinimo: producto.Column10,
    }));
}

// Devuelve la lista actual de productos.
function leer() {
    const guardado = localStorage.getItem(CLAVE);

    // Si todavía no existen productos en localStorage,
// se cargan los productos provenientes del Excel.
    if (guardado === null) {
        const productosIniciales = obtenerProductosIniciales();

        localStorage.setItem(
            CLAVE,
            JSON.stringify(productosIniciales)
        );

        return productosIniciales;
    }

    return JSON.parse(guardado);
}

// Guarda la lista de productos en localStorage.
function guardar(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// READ: devuelve todos los productos.
export function listarProductos() {
    return leer();
}

// READ: busca un producto por su código.
export function obtenerProducto(codigo) {
    return leer().find(
        (producto) => producto.codigo === codigo
    ) ?? null;
}

// CREATE: agrega un producto nuevo.
export function crearProducto(datos) {
    const lista = leer();

    const nuevo = { ...datos };

    guardar([...lista, nuevo]);

    return nuevo;
}

// UPDATE: modifica el producto que tenga el código indicado.
export function actualizarProducto(codigo, cambios) {
    const lista = leer().map((producto) =>
        producto.codigo === codigo
            ? { ...producto, ...cambios }
            : producto
    );

    guardar(lista);

    return lista.find(
        (producto) => producto.codigo === codigo
    ) ?? null;
}

// DELETE: elimina el producto que tenga el código indicado.
export function eliminarProducto(codigo) {
    const lista = leer().filter(
        (producto) => producto.codigo !== codigo
    );

    guardar(lista);
}