import EncabezadoPagina from "../components/molecules/EncabezadoPagina";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { useCarrito } from "../context/CarritoContext";
import Boton from "../components/atoms/Boton";
import Precio from "../components/atoms/Precio";
import EtiquetaStock from "../components/atoms/EtiquetaStock";
import { obtenerEstadoStock } from "../utils/stockUtils";
import { useTituloPagina } from "../hooks/useTituloPagina";

function DetalleProducto() {
    const { codigo } = useParams();
    const navigate = useNavigate();

    const { productos } = useProductos();
    const { agregar } = useCarrito();

    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("success");

    const producto = productos.find(
        (producto) => producto.codigo === codigo
    );

    useTituloPagina(
        producto ? producto.nombre : "Producto no encontrado"
    );

    function volverCatalogo() {
        navigate("/catalogo");
    }

    function irCarrito() {
        navigate("/carrito");
    }

    function agregarProducto() {
        const resultado = agregar(producto.codigo);

        if (resultado === null) {
            setMensaje(
                "No es posible agregar más unidades de este producto."
            );
            setTipoMensaje("danger");
            return;
        }

        setMensaje("Producto agregado correctamente al carrito.");
        setTipoMensaje("success");
    }

    if (!producto) {
        return (
            <Container className="py-4">
                <h1>Producto no encontrado</h1>

                <p>
                    No existe un producto con el código indicado.
                </p>

                <Boton
                    texto="Volver al catálogo"
                    variante="primary"
                    onClick={volverCatalogo}
                />
            </Container>
        );
    }

    const estadoStock = obtenerEstadoStock(
        producto.stock,
        producto.stockMinimo
    );

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo={producto.nombre}
                descripcion={`Código: ${producto.codigo}`}
            />

            <div className="card">
                <div className="card-body">
                    <h5 className="mb-3">
                        Información del producto
                    </h5>

                    <p>
                        <strong>Marca:</strong> {producto.marca}
                    </p>

                    <p>
                        <strong>Categoría:</strong> {producto.categoria}
                    </p>

                    <p>
                        <strong>Subcategoría:</strong> {producto.subcategoria}
                    </p>

                    <p>
                        <strong>Unidad:</strong> {producto.unidad}
                    </p>

                    <Precio precio={producto.precioVenta} />

                    <div className="my-3">
                        <EtiquetaStock
                            texto={estadoStock.texto}
                            variante={estadoStock.variante}
                        />
                    </div>

                    <p>
                        <strong>Stock disponible:</strong> {producto.stock}
                    </p>

                    {mensaje && (
                        <p
                            className={`alert alert-${tipoMensaje}`}
                            role="status"
                        >
                            {mensaje}
                        </p>
                    )}

                    <div className="d-flex flex-wrap gap-2">
                        <Boton
                            texto="Agregar al carrito"
                            variante="primary"
                            onClick={agregarProducto}
                            deshabilitado={producto.stock <= 0}
                        />

                        <Boton
                            texto="Ver carrito"
                            variante="outline-primary"
                            onClick={irCarrito}
                        />

                        <Boton
                            texto="Volver al catálogo"
                            variante="secondary"
                            onClick={volverCatalogo}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default DetalleProducto;