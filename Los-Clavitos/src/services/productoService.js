
import datosExcel from "../data/productos.json";

const CLAVE = "productos";

// Transforma los datos del Excel a una estructura más fácil de utilizar.
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

// Obtiene los productos desde localStorage.
function leer() {
    const guardado = localStorage.getItem(CLAVE);

    if (guardado === null) {
        const productosIniciales = obtenerProductosIniciales();
        guardar(productosIniciales);
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

    const existe = lista.some(
        (producto) => producto.codigo === datos.codigo
    );

    if (existe) {
        throw new Error("Ya existe un producto con ese código");
    }

    const nuevo = { ...datos };

    guardar([...lista, nuevo]);

    return nuevo;
}

// UPDATE: modifica un producto existente.
export function actualizarProducto(codigo, cambios) {
    const lista = leer();

    const existe = lista.some(
        (producto) => producto.codigo === codigo
    );

    if (!existe) {
        return null;
    }

    const { codigo: codigoIgnorado, ...datosActualizados } = cambios;

    const productosActualizados = lista.map((producto) =>
        producto.codigo === codigo
            ? { ...producto, ...datosActualizados }
            : producto
    );

    guardar(productosActualizados);

    return productosActualizados.find(
        (producto) => producto.codigo === codigo
    );
}

// DELETE: elimina un producto existente.
export function eliminarProducto(codigo) {
    const lista = leer();

    const existe = lista.some(
        (producto) => producto.codigo === codigo
    );

    if (!existe) {
        return false;
    }

    const productosActualizados = lista.filter(
        (producto) => producto.codigo !== codigo
    );

    guardar(productosActualizados);

    return true;
}
