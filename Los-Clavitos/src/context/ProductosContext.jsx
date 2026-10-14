import { createContext, useContext, useState } from "react";
import * as productoService from "../services/productoService";

// Contexto compartido para administrar los productos
const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState(
        () => productoService.listarProductos()
    );

    // CREATE: agrega un producto y actualiza el estado
    function crear(datos) {
        const nuevo = productoService.crearProducto(datos);

        setProductos(productoService.listarProductos());

        return nuevo;
    }

    // UPDATE: modifica un producto existente
    function actualizar(codigo, cambios) {
        const actualizado = productoService.actualizarProducto(codigo, cambios);

        if (actualizado !== null) {
            setProductos(productoService.listarProductos());
        }

        return actualizado;
    }

    // DELETE: elimina un producto existente
    function eliminar(codigo) {
        const eliminado = productoService.eliminarProducto(codigo);

        if (eliminado) {
            setProductos(productoService.listarProductos());
        }

        return eliminado;
    }

    // Vuelve a cargar los productos desde localStorage
    function recargar() {
        setProductos(productoService.listarProductos());
    }

    return (
        <ProductosContext.Provider
            value={{
                productos,
                crear,
                actualizar,
                eliminar,
                recargar
            }}
        >
            {children}
        </ProductosContext.Provider>
    );
}

// Hook personalizado para acceder al contexto
export function useProductos() {
    const contexto = useContext(ProductosContext);

    if (!contexto) {
        throw new Error(
            "useProductos debe usarse dentro de un ProductosProvider"
        );
    }

    return contexto;
}