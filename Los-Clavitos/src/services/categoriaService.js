
const CLAVE = "categorias";

function normalizar(nombre) {
    return String(nombre ?? "").trim();
}

function coincide(primero, segundo) {
    return normalizar(primero).toLocaleLowerCase("es") ===
        normalizar(segundo).toLocaleLowerCase("es");
}

function leerCategoriasGuardadas() {
    try {
        const datos = JSON.parse(
            localStorage.getItem(CLAVE) || "[]"
        );

        if (!Array.isArray(datos)) {
            return [];
        }

        return datos.filter(
            (nombre) =>
                typeof nombre === "string" &&
                nombre.trim() !== ""
        );
    } catch {
        return [];
    }
}

function guardarCategorias(categorias) {
    localStorage.setItem(CLAVE, JSON.stringify(categorias));
}

export function listarCategorias(productos = []) {
    const nombres = [
        ...leerCategoriasGuardadas(),
        ...productos.map((producto) => producto.categoria)
    ];

    const categorias = [];

    for (const nombreOriginal of nombres) {
        const nombre = normalizar(nombreOriginal);

        if (!nombre) {
            continue;
        }

        const existe = categorias.some(
            (categoria) => coincide(categoria.nombre, nombre)
        );

        if (!existe) {
            categorias.push({
                nombre,
                cantidad: productos.filter(
                    (producto) =>
                        coincide(producto.categoria, nombre)
                ).length
            });
        }
    }

    return categorias.sort((a, b) =>
        a.nombre.localeCompare(b.nombre, "es")
    );
}

export function crearCategoria(nombre, productos = []) {
    const nueva = normalizar(nombre);

    if (!nueva) {
        throw new Error("El nombre de la categoría es obligatorio.");
    }

    const existe = listarCategorias(productos).some(
        (categoria) => coincide(categoria.nombre, nueva)
    );

    if (existe) {
        throw new Error("Ya existe una categoría con ese nombre.");
    }

    const guardadas = leerCategoriasGuardadas();

    guardarCategorias([...guardadas, nueva]);

    return nueva;
}

export function renombrarCategoria(
    nombreActual,
    nombreNuevo,
    productos,
    actualizarProducto
) {
    const nuevo = normalizar(nombreNuevo);

    if (!nuevo) {
        throw new Error("El nuevo nombre es obligatorio.");
    }

    const categorias = listarCategorias(productos);

    const actual = categorias.find(
        (categoria) => coincide(categoria.nombre, nombreActual)
    );

    if (!actual) {
        throw new Error("La categoría seleccionada no existe.");
    }

    const duplicada = categorias.some(
        (categoria) =>
            !coincide(categoria.nombre, nombreActual) &&
            coincide(categoria.nombre, nuevo)
    );

    if (duplicada) {
        throw new Error("Ya existe una categoría con ese nombre.");
    }

    const asociados = productos.filter(
        (producto) => coincide(producto.categoria, nombreActual)
    );

    const actualizados = [];

    try {
        for (const producto of asociados) {
            const resultado = actualizarProducto(
                producto.codigo,
                { ...producto, categoria: nuevo }
            );

            if (resultado === null) {
                throw new Error(
                    `No se pudo actualizar el producto ${producto.codigo}.`
                );
            }

            actualizados.push(producto);
        }
    } catch (error) {
        for (const producto of actualizados.reverse()) {
            try {
                actualizarProducto(producto.codigo, producto);
            } catch {
                // Se conserva el error original.
            }
        }

        throw error;
    }

    const guardadas = leerCategoriasGuardadas().filter(
        (nombre) => !coincide(nombre, nombreActual)
    );

    if (!guardadas.some((nombre) => coincide(nombre, nuevo))) {
        guardadas.push(nuevo);
    }

    guardarCategorias(guardadas);

    return nuevo;
}

export function eliminarCategoria(nombre, productos = []) {
    const categoria = listarCategorias(productos).find(
        (item) => coincide(item.nombre, nombre)
    );

    if (!categoria) {
        throw new Error("La categoría seleccionada no existe.");
    }

    if (categoria.cantidad > 0) {
        throw new Error(
            "No puedes eliminar una categoría con productos asociados. " +
            "Primero cambia la categoría de esos productos."
        );
    }

    const guardadas = leerCategoriasGuardadas().filter(
        (item) => !coincide(item, nombre)
    );

    guardarCategorias(guardadas);

    return true;
}
