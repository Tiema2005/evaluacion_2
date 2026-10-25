import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Boton from "./Boton";

describe("Boton", () => {
    it("muestra el texto recibido mediante props", () => {
        render(<Boton texto="Ver catálogo" />);

        expect(
            screen.getByRole("button", { name: "Ver catálogo" })
        ).toBeInTheDocument();
    });

    it("acepta type y disabled para formularios de administración", () => {
        render(<Boton texto="Guardar" type="submit" disabled />);

        const boton = screen.getByRole("button", { name: "Guardar" });
        expect(boton).toHaveAttribute("type", "submit");
        expect(boton).toBeDisabled();
    });

    it("ejecuta onClick cuando el usuario hace clic", async () => {
        // Arrange: preparar la función simulada y el componente.
        const onClick = vi.fn();
        const usuario = userEvent.setup();

        render(<Boton texto="Ver producto" onClick={onClick} />);

        // Act: simular un clic.
        await usuario.click(
            screen.getByRole("button", { name: "Ver producto" })
        );

        // Assert: comprobar que se ejecutó la función.
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});