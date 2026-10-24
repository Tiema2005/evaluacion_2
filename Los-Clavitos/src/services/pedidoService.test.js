import { describe, it, expect, beforeEach } from "vitest";

import {
    registrarPedido,
    listarPedidos,
    obtenerPedido
} from "./pedidoService";

import { obtenerProducto } from "./productoService";

describe("pedidoService", () => {
    const producto = {
        codigo: "TEST001",
        categoria: "Herramientas",
        subcategoria: "Manuales",
        nombre: "Martillo de prueba",
        marca: "Marca de prueba",
        unidad: "Unidad",
        precioCompra: 3000,
        precioVenta: 5990,
        stock: 10,
        stockMinimo: 2
    };

    const cliente = {
        nombre: "Cliente",
        apellidos: "De Prueba",
        correo: "cliente@correo.cl",
        tipoEntrega: "Retiro en tienda",
        direccion: ""
    };

    beforeEach(() => {
        // Arrange: preparar datos independientes.
        localStorage.setItem(
            "productos",
            JSON.stringify([producto])
        );

        localStorage.setItem(
            "pedidos",
            JSON.stringify([])
        );
    });

    it("rechaza un carrito vacío", () => {
        expect(() => {
            registrarPedido(cliente, []);
        }).toThrow("No se puede registrar un carrito vacío.");
    });

    it("rechaza cantidades superiores al stock", () => {
        const carrito = [
            { codigo: "TEST001", cantidad: 15 }
        ];

        expect(() => {
            registrarPedido(cliente, carrito);
        }).toThrow("Stock insuficiente");

        expect(listarPedidos()).toHaveLength(0);
        expect(obtenerProducto("TEST001").stock).toBe(10);
    });

    it("registra un pedido y calcula correctamente el total", () => {
        const carrito = [
            { codigo: "TEST001", cantidad: 2 }
        ];

        const pedido = registrarPedido(cliente, carrito);

        expect(pedido.total).toBe(11980);
        expect(pedido.productos[0].cantidad).toBe(2);
        expect(pedido.estado).toBe("Pendiente");

        expect(listarPedidos()).toHaveLength(1);
        expect(obtenerPedido(pedido.numero)).toEqual(pedido);
    });

    it("descuenta el stock después de registrar un pedido", () => {
        const carrito = [
            { codigo: "TEST001", cantidad: 3 }
        ];

        registrarPedido(cliente, carrito);

        expect(obtenerProducto("TEST001").stock).toBe(7);
    });
});