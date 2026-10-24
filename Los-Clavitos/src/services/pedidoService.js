import {
    listarProductos,
    actualizarProducto
} from "./productoService";

import { validarDatosPedido } from "../utils/validacionesPedido";

const CLAVE = "pedidos";

// READ: obtiene los pedidos almacenados.
export function listarPedidos() {
    const guardado = localStorage.getItem(CLAVE);

    if (guardado === null) {
        return [];
    }

    try {
        const pedidos = JSON.parse(guardado);

        return Array.isArray(pedidos) ? pedidos : [];
    } catch {
        return [];
    }
}

// READ: busca un pedido por su número.
export function obtenerPedido(numero) {
    return listarPedidos().find(
        (pedido) => pedido.numero === numero
    ) ?? null;
}

// CREATE: registra un pedido y actualiza el inventario.
export function registrarPedido(datosCliente, carrito) {
    // Validar los datos del cliente.
    const errores = validarDatosPedido(datosCliente);

    if (Object.keys(errores).length > 0) {
        throw new Error("Los datos del cliente no son válidos.");
    }

    // Impedir pedidos sin productos.
    if (!Array.isArray(carrito) || carrito.length === 0) {
        throw new Error("No se puede registrar un carrito vacío.");
    }

    const productos = listarProductos();
    const codigos = new Set();

    // Comprobar cantidades y disponibilidad.
    const detalles = carrito.map((item) => {
        const producto = productos.find(
            (producto) => producto.codigo === item.codigo
        );

        if (!producto) {
            throw new Error("Uno de los productos ya no existe.");
        }

        if (codigos.has(item.codigo)) {
            throw new Error("El carrito contiene productos duplicados.");
        }

        codigos.add(item.codigo);

        if (
            !Number.isInteger(item.cantidad) ||
            item.cantidad < 1
        ) {
            throw new Error("La cantidad del producto no es válida.");
        }

        if (item.cantidad > producto.stock) {
            throw new Error(
                `Stock insuficiente para ${producto.nombre}.`
            );
        }

        const precioVenta = Number(producto.precioVenta);

        return {
            codigo: producto.codigo,
            nombre: producto.nombre,
            precioVenta,
            cantidad: item.cantidad,
            subtotal: precioVenta * item.cantidad
        };
    });

    // Calcular el total utilizando los precios del catálogo.
    const total = detalles.reduce(
        (acumulado, item) => acumulado + item.subtotal,
        0
    );

    const pedido = {
        numero: `PED-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        fecha: new Date().toISOString(),
        cliente: { ...datosCliente },
        productos: detalles,
        total,
        estado: "Pendiente"
    };

    // Guardar los stocks originales para poder revertir
    // los cambios si falla el registro.
    const stocksOriginales = detalles.map((item) => {
        const producto = productos.find(
            (producto) => producto.codigo === item.codigo
        );

        return {
            codigo: item.codigo,
            stock: producto.stock
        };
    });

    const actualizados = [];

    try {
        // Descontar las unidades solicitadas.
        detalles.forEach((item) => {
            const original = stocksOriginales.find(
                (producto) => producto.codigo === item.codigo
            );

            const resultado = actualizarProducto(item.codigo, {
                stock: original.stock - item.cantidad
            });

            if (resultado === null) {
                throw new Error("No se pudo actualizar el inventario.");
            }

            actualizados.push(original);
        });

        // Guardar el pedido después de actualizar el inventario.
        const pedidos = listarPedidos();

        localStorage.setItem(
            CLAVE,
            JSON.stringify([...pedidos, pedido])
        );
    } catch {
        // Intentar restaurar los stocks si ocurre un error.
        actualizados.forEach((producto) => {
            actualizarProducto(producto.codigo, {
                stock: producto.stock
            });
        });

        throw new Error("No se pudo completar el registro del pedido.");
    }

    return pedido;
}