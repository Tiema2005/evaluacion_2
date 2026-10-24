import { describe, it, expect, beforeEach } from "vitest";
import {
    listarCarrito,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito
} from "./carritoService";

describe("carritoService", () => {
    const producto = {
        codigo: "MC001",
        nombre: "Cemento Polpaico gris 25 kg",
        precioVenta: 5990,
        stock: 10
    };

    beforeEach(() => {
        localStorage.setItem("carrito", JSON.stringify([]));
    });

    it("agrega un producto y aumenta su cantidad", () => {
        // Arrange: el carrito comienza vacío.

        // Act: agregar el mismo producto dos veces.
        agregarAlCarrito(producto);
        agregarAlCarrito(producto);

        // Assert: se conserva un solo producto con cantidad 2.
        expect(listarCarrito()).toEqual([
            { codigo: "MC001", cantidad: 2 }
        ]);
    });

    it("no permite agregar más unidades que el stock disponible", () => {
        // Arrange: un producto con una sola unidad disponible.
        const productoLimitado = {
            ...producto,
            stock: 1
        };

        // Act: intentar agregarlo dos veces.
        agregarAlCarrito(productoLimitado);
        const resultado = agregarAlCarrito(productoLimitado);

        // Assert: la cantidad no supera el stock.
        expect(resultado).toBeNull();
        expect(listarCarrito()[0].cantidad).toBe(1);
    });

    it("permite actualizar, eliminar y vaciar el carrito", () => {
        // Arrange: agregar un producto.
        agregarAlCarrito(producto);

        // Act y Assert: modificar la cantidad.
        actualizarCantidad("MC001", 3, producto.stock);
        expect(listarCarrito()[0].cantidad).toBe(3);

        // Act y Assert: eliminar el producto.
        expect(eliminarDelCarrito("MC001")).toBe(true);
        expect(listarCarrito()).toHaveLength(0);

        // Act y Assert: vaciar el carrito.
        agregarAlCarrito(producto);
        vaciarCarrito();
        expect(listarCarrito()).toHaveLength(0);
    });
});