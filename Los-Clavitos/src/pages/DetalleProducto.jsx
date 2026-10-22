import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";

import Boton from "../components/atoms/Boton";
import Precio from "../components/atoms/Precio";
import EtiquetaStock from "../components/atoms/EtiquetaStock";
import { obtenerEstadoStock } from "../utils/stockUtils";
import { useTituloPagina } from "../hooks/useTituloPagina";

function DetalleProducto() {
    const { codigo } = useParams();
    const navigate = useNavigate();
    const { productos } = useProductos();

    const producto = productos.find(
        (producto) => producto.codigo === codigo
    );

    useTituloPagina(producto ? producto.nombre : "Producto no encontrado");

    function volverCatalogo() {
        navigate("/catalogo");
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
            <h1>{producto.nombre}</h1>

            <p className="text-muted">
                Código: {producto.codigo}
            </p>

            <div className="card">
                <div className="card-body">
                    <h5 className="mb-3">Información del producto</h5>

                    <p><strong>Marca:</strong> {producto.marca}</p>
                    <p><strong>Categoría:</strong> {producto.categoria}</p>
                    <p><strong>Subcategoría:</strong> {producto.subcategoria}</p>
                    <p><strong>Unidad:</strong> {producto.unidad}</p>

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

                    <Boton
                        texto="Volver al catálogo"
                        variante="secondary"
                        onClick={volverCatalogo}
                    />
                </div>
            </div>
        </Container>
    );
}

export default DetalleProducto;