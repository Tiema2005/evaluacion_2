import { beforeEach, describe, expect, it } from "vitest";
import {
    crearUsuario,
    listarUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "./usuarioService";

const perfil = {
    nombre: "Ana",
    apellidos: "Prueba",
    correo: "ANA@EJEMPLO.CL",
    rol: "Cliente"
};

describe("usuarioService", () => {
    beforeEach(() => {
        localStorage.removeItem("usuarios");
    });

    it("crea un perfil sin guardar contraseñas", () => {
        crearUsuario({ ...perfil, contrasena: "no-almacenar" });
        expect(listarUsuarios()).toHaveLength(1);
        expect(obtenerUsuario("ana@ejemplo.cl").contrasena).toBeUndefined();
    });

    it("rechaza correos repetidos sin distinguir mayúsculas", () => {
        crearUsuario(perfil);
        expect(() => crearUsuario({ ...perfil, correo: "ana@ejemplo.cl" }))
            .toThrow("Ya existe");
    });

    it("actualiza el rol y habilita cuenta corriente en clientes", () => {
        crearUsuario(perfil);
        const actualizado = actualizarUsuario("ana@ejemplo.cl", { cuentaCorriente: true });
        expect(actualizado.cuentaCorriente).toBe(true);
        expect(obtenerUsuario("ana@ejemplo.cl").cuentaCorriente).toBe(true);
    });

    it("no permite cuenta corriente para roles que no son Cliente", () => {
        crearUsuario(perfil);
        const actualizado = actualizarUsuario("ana@ejemplo.cl", {
            rol: "Vendedor", cuentaCorriente: true
        });
        expect(actualizado.cuentaCorriente).toBe(false);
    });

    it("elimina el perfil registrado", () => {
        crearUsuario(perfil);
        eliminarUsuario("ana@ejemplo.cl");
        expect(listarUsuarios()).toEqual([]);
    });
});
