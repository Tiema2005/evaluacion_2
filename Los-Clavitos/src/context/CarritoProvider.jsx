import { useState } from "react";
import { CarritoContext } from "./CarritoContext";
import { useProductos } from "./ProductosContext";
import * as carritoService from "../services/carritoService";

export function CarritoProvider(props) {
    const { productos } = useProductos();

    const [carrito, setCarrito] = useState(
        () => carritoService.listarCarrito()
    );

    // CREATE: agrega una unidad del producto seleccionado.
    function agregar(codigo) {
        const producto = productos.find(
            (producto) => producto.codigo === codigo
        );

        if (!producto) {
            return null;
        }

        const resultado = carritoService.agregarAlCarrito(producto);

        if (resultado !== null) {
            setCarrito(carritoService.listarCarrito());
        }

        return resultado;
    }

    // UPDATE: cambia la cantidad respetando el stock disponible.
    function actualizarCantidad(codigo, cantidad) {
        const producto = productos.find(
            (producto) => producto.codigo === codigo
        );

        if (!producto) {
            return null;
        }

        const resultado = carritoService.actualizarCantidad(
            codigo,
            cantidad,
            producto.stock
        );

        if (resultado !== null) {
            setCarrito(carritoService.listarCarrito());
        }

        return resultado;
    }

    // DELETE: quita un producto del carrito.
    function eliminar(codigo) {
        const eliminado = carritoService.eliminarDelCarrito(codigo);

        if (eliminado) {
            setCarrito(carritoService.listarCarrito());
        }

        return eliminado;
    }

    // Elimina todos los productos del carrito.
    function vaciar() {
        carritoService.vaciarCarrito();
        setCarrito([]);
    }

    // Relaciona las cantidades del carrito con los datos del catálogo.
    const items = carrito
        .map((item) => {
            const producto = productos.find(
                (producto) => producto.codigo === item.codigo
            );

            if (!producto) {
                return null;
            }

            return {
                ...producto,
                cantidad: item.cantidad,
                subtotal: Number(producto.precioVenta) * item.cantidad
            };
        })
        .filter(Boolean);

    // Calcula las unidades y el total del carrito.
    const cantidadTotal = items.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    const total = items.reduce(
        (acumulado, item) => acumulado + item.subtotal,
        0
    );

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                items,
                cantidadTotal,
                total,
                agregar,
                actualizarCantidad,
                eliminar,
                vaciar
            }}
        >
            {props.children}
        </CarritoContext.Provider>
    );
}