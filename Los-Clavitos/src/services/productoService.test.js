import { describe, it, expect, beforeEach } from "vitest";
import {
    listarProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "./productoService";

describe("productoService", () => {
    // Prepara un catálogo vacío antes de cada prueba.
    beforeEach(() => {
        localStorage.setItem("productos", JSON.stringify([]));
    });

    const producto = {
        codigo: "TEST001",
        categoria: "Herramientas",
        subcategoria: "Manuales",
        nombre: "Martillo de prueba",
        marca: "Marca de prueba",
        unidad: "Unidad",
        precioCompra: 3000,
        precioVenta: 5990,
        stock: 15,
        stockMinimo: 5
    };

    it("crea un producto y permite consultarlo", () => {
        // Arrange: el catálogo comienza vacío.

        // Act: crear el producto.
        const nuevo = crearProducto(producto);

        // Assert: comprobar que se guardó correctamente.
        expect(nuevo.codigo).toBe("TEST001");
        expect(listarProductos()).toHaveLength(1);
        expect(obtenerProducto("TEST001")).toEqual(producto);
    });

    it("actualiza y elimina un producto correctamente", () => {
        // Arrange: crear un producto inicial.
        crearProducto(producto);

        // Act: actualizar su stock.
        const actualizado = actualizarProducto("TEST001", {
            stock: 20
        });

        // Assert: comprobar la actualización.
        expect(actualizado.stock).toBe(20);
        expect(obtenerProducto("TEST001").stock).toBe(20);

        // Act: eliminar el producto.
        const eliminado = eliminarProducto("TEST001");

        // Assert: comprobar la eliminación.
        expect(eliminado).toBe(true);
        expect(obtenerProducto("TEST001")).toBeNull();
        expect(listarProductos()).toHaveLength(0);
    });
});