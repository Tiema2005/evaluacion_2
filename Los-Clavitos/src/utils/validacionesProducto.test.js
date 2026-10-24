import { describe, it, expect } from "vitest";
import { validarProducto } from "./validacionesProducto";

describe("validarProducto", () => {
    const producto = {
        codigo: "TEST001",
        nombre: "Martillo de prueba",
        categoria: "Herramientas",
        subcategoria: "Manuales",
        marca: "Marca de prueba",
        unidad: "Unidad",
        precioCompra: "3000",
        precioVenta: "5990",
        stock: "10",
        stockMinimo: "2"
    };

    it("acepta un producto válido y convierte sus números", () => {
        const resultado = validarProducto(producto);

        expect(resultado.error).toBe("");
        expect(resultado.datos.precioVenta).toBe(5990);
        expect(resultado.datos.stock).toBe(10);
    });

    it("rechaza productos con campos vacíos", () => {
        const datos = {
            ...producto,
            nombre: ""
        };

        const resultado = validarProducto(datos);

        expect(resultado.error).toBe(
            "Todos los campos son obligatorios."
        );
        expect(resultado.datos).toBeNull();
    });

    it("rechaza cantidades negativas", () => {
        const datos = {
            ...producto,
            stock: "-5"
        };

        const resultado = validarProducto(datos);

        expect(resultado.error).not.toBe("");
        expect(resultado.datos).toBeNull();
    });
});