const CLAVE = "carrito";

// Obtiene los productos agregados al carrito.
function leer() {
    const guardado = localStorage.getItem(CLAVE);

    if (guardado !== null) {
        try {
            const carrito = JSON.parse(guardado);

            if (Array.isArray(carrito)) {
                return carrito;
            }
        } catch {
            // Si los datos son inválidos, se inicia un carrito vacío.
        }
    }

    return [];
}

// Guarda el carrito en localStorage.
function guardar(carrito) {
    localStorage.setItem(CLAVE, JSON.stringify(carrito));
}

// READ: devuelve los productos del carrito.
export function listarCarrito() {
    return leer();
}

// CREATE: agrega un producto o aumenta su cantidad.
export function agregarAlCarrito(producto) {
    if (!producto || producto.stock <= 0) {
        return null;
    }

    const carrito = leer();

    const existente = carrito.find(
        (item) => item.codigo === producto.codigo
    );

    if (existente) {
        if (existente.cantidad >= producto.stock) {
            return null;
        }

        const carritoActualizado = carrito.map((item) =>
            item.codigo === producto.codigo
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        );

        guardar(carritoActualizado);

        return carritoActualizado.find(
            (item) => item.codigo === producto.codigo
        );
    }

    const nuevo = {
        codigo: producto.codigo,
        cantidad: 1
    };

    guardar([...carrito, nuevo]);

    return nuevo;
}

// UPDATE: modifica la cantidad sin superar el stock disponible.
export function actualizarCantidad(codigo, cantidad, stockDisponible) {
    const carrito = leer();

    const existe = carrito.some(
        (item) => item.codigo === codigo
    );

    if (
        !existe ||
        !Number.isInteger(cantidad) ||
        cantidad < 1 ||
        cantidad > stockDisponible
    ) {
        return null;
    }

    const carritoActualizado = carrito.map((item) =>
        item.codigo === codigo
            ? { ...item, cantidad }
            : item
    );

    guardar(carritoActualizado);

    return carritoActualizado.find(
        (item) => item.codigo === codigo
    );
}

// DELETE: elimina un producto del carrito.
export function eliminarDelCarrito(codigo) {
    const carrito = leer();

    const carritoActualizado = carrito.filter(
        (item) => item.codigo !== codigo
    );

    if (carritoActualizado.length === carrito.length) {
        return false;
    }

    guardar(carritoActualizado);

    return true;
}

// Vacía todos los productos del carrito.
export function vaciarCarrito() {
    guardar([]);
}