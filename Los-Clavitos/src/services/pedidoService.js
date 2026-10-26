import {
    listarProductos,
    actualizarProducto
} from "./productoService";

import { validarDatosPedido } from "../utils/validacionesPedido";
import { obtenerUsuario } from "./usuarioService";

const CLAVE = "pedidos";

// Obtiene los pedidos guardados.
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

// Busca un pedido por su número.
export function obtenerPedido(numero) {
    return listarPedidos().find(
        (pedido) => pedido.numero === numero
    ) ?? null;
}

// Registra un pedido y descuenta los productos del inventario.
export function registrarPedido(datosCliente, carrito) {
    const errores = validarDatosPedido(datosCliente);

    if (Object.keys(errores).length > 0) {
        throw new Error("Los datos del cliente no son válidos.");
    }

    const condicionPago = datosCliente.condicionPago || "Pago al retirar o recibir";
    if (condicionPago === "Cuenta corriente - pago pendiente a fin de mes") {
        const usuario = obtenerUsuario(datosCliente.correo);
        if (!usuario?.cuentaCorriente) {
            throw new Error("El cliente no tiene una cuenta corriente habilitada.");
        }
    }

    if (!Array.isArray(carrito) || carrito.length === 0) {
        throw new Error("No se puede registrar un carrito vacío.");
    }

    const productos = listarProductos();
    const codigos = new Set();

    // Validar los productos y calcular sus subtotales.
    const detalles = carrito.map((item) => {
        const producto = productos.find(
            (p) => p.codigo === item.codigo
        );

        if (!producto) {
            throw new Error("Uno de los productos ya no existe.");
        }

        if (codigos.has(item.codigo)) {
            throw new Error("El carrito contiene productos duplicados.");
        }

        codigos.add(item.codigo);

        if (!Number.isInteger(item.cantidad) || item.cantidad < 1) {
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

    const total = detalles.reduce(
        (suma, item) => suma + item.subtotal,
        0
    );

    const pedido = {
        numero: `PED-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        fecha: new Date().toISOString(),
        cliente: { ...datosCliente },
        productos: detalles,
        total,
        estado: "Pendiente",
        condicionPago,
        estadoPago: condicionPago === "Cuenta corriente - pago pendiente a fin de mes"
            ? "Pendiente a fin de mes"
            : "Pago por realizar al recibir o retirar"
    };

    // Guardar los productos que se modifican para poder restaurarlos.
    const actualizados = [];

    try {
        for (const item of detalles) {
            const producto = productos.find(
                (p) => p.codigo === item.codigo
            );

            const resultado = actualizarProducto(item.codigo, {
                stock: producto.stock - item.cantidad
            });

            if (resultado === null) {
                throw new Error("No se pudo actualizar el inventario.");
            }

            actualizados.push({
                codigo: producto.codigo,
                stock: producto.stock
            });
        }

        const pedidos = listarPedidos();

        localStorage.setItem(
            CLAVE,
            JSON.stringify([...pedidos, pedido])
        );

    } catch {
        // Intentar recuperar el stock si falla el registro.
        for (const producto of actualizados) {
            actualizarProducto(producto.codigo, {
                stock: producto.stock
            });
        }

        throw new Error("No se pudo completar el registro del pedido.");
    }

    return pedido;
}