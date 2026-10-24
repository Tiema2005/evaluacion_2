import { describe, it, expect } from "vitest";
import { validarDatosPedido } from "./validacionesPedido";

describe("validarDatosPedido", () => {
    const cliente = {
        nombre: "Felipe",
        apellidos: "Prueba",
        correo: "cliente@correo.cl",
        tipoEntrega: "Retiro en tienda",
        direccion: ""
    };

    it("acepta un pedido con datos válidos", () => {
        const errores = validarDatosPedido(cliente);

        expect(errores).toEqual({});
    });

    it("rechaza un correo electrónico inválido", () => {
        const datos = {
            ...cliente,
            correo: "correo-invalido"
        };

        const errores = validarDatosPedido(datos);

        expect(errores.correo).toBe(
            "Ingrese un correo electrónico válido."
        );
    });

    it("exige dirección cuando se solicita despacho", () => {
        const datos = {
            ...cliente,
            tipoEntrega: "Despacho a domicilio",
            direccion: ""
        };

        const errores = validarDatosPedido(datos);

        expect(errores.direccion).toBe(
            "La dirección es obligatoria para el despacho."
        );
    });
});