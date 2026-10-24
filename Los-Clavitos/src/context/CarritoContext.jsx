import { createContext, useContext } from "react";

// Contexto compartido para administrar el carrito.
export const CarritoContext = createContext(null);

// Hook personalizado para acceder al carrito.
export function useCarrito() {
    const contexto = useContext(CarritoContext);

    if (!contexto) {
        throw new Error(
            "useCarrito debe usarse dentro de un CarritoProvider"
        );
    }

    return contexto;
}