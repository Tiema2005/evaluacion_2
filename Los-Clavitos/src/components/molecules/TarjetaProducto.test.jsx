import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TarjetaProducto from "./TarjetaProducto";

describe("TarjetaProducto", () => {
    const producto = {
        codigo: "MC001",
        nombre: "Cemento Polpaico gris 25 kg",
        marca: "Polpaico",
        precioVenta: 5990,
        stock: 80,
        stockMinimo: 20
    };

    it("muestra el nombre, la marca y el estado del producto", () => {
        render(<TarjetaProducto producto={producto} />);

        expect(
            screen.getByText("Cemento Polpaico gris 25 kg")
        ).toBeInTheDocument();

        expect(screen.getByText("Polpaico")).toBeInTheDocument();
        expect(screen.getByText("Disponible")).toBeInTheDocument();
    });

    it("avisa al componente padre al seleccionar Ver producto", async () => {
        const onVerProducto = vi.fn();
        const usuario = userEvent.setup();

        render(
            <TarjetaProducto
                producto={producto}
                onVerProducto={onVerProducto}
            />
        );

        await usuario.click(
            screen.getByRole("button", { name: "Ver producto" })
        );

        expect(onVerProducto).toHaveBeenCalledTimes(1);
    });
});