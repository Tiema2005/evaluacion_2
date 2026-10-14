import { createContext, useContext } from "react";

// Contexto compartido para administrar los productos.
export const ProductosContext = createContext(null);

// Hook personalizado para acceder al contexto.
export function useProductos() {
    const contexto = useContext(ProductosContext);

    if (!contexto) {
        throw new Error(
            "useProductos debe usarse dentro de un ProductosProvider"
        );
    }

    return contexto;
}