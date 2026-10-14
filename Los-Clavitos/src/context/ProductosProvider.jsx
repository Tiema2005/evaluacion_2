import { useState } from "react";
import { ProductosContext } from "./ProductosContext";
import * as productoService from "../services/productoService";

export function ProductosProvider(props) {
    const [productos, setProductos] = useState(
        () => productoService.listarProductos()
    );

    // CREATE: agrega un producto y actualiza el estado.
    function crear(datos) {
        const nuevo = productoService.crearProducto(datos);

        setProductos(productoService.listarProductos());

        return nuevo;
    }

    // UPDATE: modifica un producto existente.
    function actualizar(codigo, cambios) {
        const actualizado = productoService.actualizarProducto(
            codigo,
            cambios
        );

        if (actualizado !== null) {
            setProductos(productoService.listarProductos());
        }

        return actualizado;
    }

    // DELETE: elimina un producto existente.
    function eliminar(codigo) {
        const eliminado = productoService.eliminarProducto(codigo);

        if (eliminado) {
            setProductos(productoService.listarProductos());
        }

        return eliminado;
    }

    // Recarga los productos desde localStorage.
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
            {props.children}
        </ProductosContext.Provider>
    );
}