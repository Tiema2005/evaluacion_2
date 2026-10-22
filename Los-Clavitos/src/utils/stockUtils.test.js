import { describe, it, expect } from "vitest";
import { obtenerEstadoStock } from "./stockUtils";

describe("obtenerEstadoStock", () => {
    it("devuelve Sin stock cuando la cantidad es cero", () => {
        // Arrange: preparar los datos.
        const stock = 0;
        const stockMinimo = 10;

        // Act: ejecutar la función.
        const resultado = obtenerEstadoStock(stock, stockMinimo);

        // Assert: comprobar el resultado.
        expect(resultado).toEqual({
            texto: "Sin stock",
            variante: "danger"
        });
    });

    it("devuelve Stock bajo cuando la cantidad es menor al mínimo", () => {
        const resultado = obtenerEstadoStock(5, 10);

        expect(resultado).toEqual({
            texto: "Stock bajo",
            variante: "warning"
        });
    });

    it("devuelve Disponible cuando la cantidad es suficiente", () => {
        const resultado = obtenerEstadoStock(20, 10);

        expect(resultado).toEqual({
            texto: "Disponible",
            variante: "success"
        });
    });
});