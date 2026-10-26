import EncabezadoPagina from "../../components/molecules/EncabezadoPagina";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import ItemCarrito from "../../components/molecules/ItemCarrito";
import Boton from "../../components/atoms/Boton";
import Precio from "../../components/atoms/Precio";
import { useTituloPagina } from "../../hooks/useTituloPagina";

function Carrito() {
    const navigate = useNavigate();

    const { items, cantidadTotal, total, actualizarCantidad, eliminar, vaciar } = useCarrito();

    useTituloPagina("Carrito de compras");

    function volverCatalogo() {
        navigate("/catalogo");
    }

    function irConfirmacion() {
        navigate("/confirmar-pedido");
    }

    function cambiarCantidad(codigo, cantidad) {
        actualizarCantidad(codigo, cantidad);
    }

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Carrito de compras"
                descripcion="Revisa tus productos, ajusta cantidades y confirma tu pedido cuando esté listo."
            />

            {items.length === 0 ? (
                <div className="card shadow-sm">
                    <div className="card-body p-5 text-center">
                        <h2 className="h4 mb-3">Tu carrito está vacío</h2>
                        <p className="text-secondary mb-4">
                            Agrega productos desde el catálogo para preparar tu cotización o pedido.
                        </p>
                        <Boton texto="Explorar catálogo" variante="primary" onClick={volverCatalogo} />
                    </div>
                </div>
            ) : (
                <Row className="g-4 align-items-start">
                    <Col lg={8}>
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                            <h2 className="h5 fw-bold mb-0">Productos seleccionados</h2>
                            <span className="text-secondary small">{cantidadTotal} unidad(es) en tu carrito</span>
                        </div>

                        {items.map((item) => (
                            <ItemCarrito
                                key={item.codigo}
                                item={item}
                                onCambiarCantidad={cambiarCantidad}
                                onEliminar={eliminar}
                            />
                        ))}
                    </Col>

                    <Col lg={4}>
                        <div className="card resumen-carrito">
                            <div className="card-body p-4">
                                <h2 className="h4 fw-bold mb-4">Resumen de la compra</h2>

                                <div className="d-flex justify-content-between gap-3 mb-3">
                                    <span>Productos</span>
                                    <strong>{items.length}</strong>
                                </div>

                                <div className="d-flex justify-content-between gap-3 mb-3">
                                    <span>Unidades</span>
                                    <strong>{cantidadTotal}</strong>
                                </div>

                                <div className="d-flex justify-content-between gap-3 mb-4">
                                    <span>Retiro o despacho</span>
                                    <strong>A coordinar</strong>
                                </div>

                                <div className="resumen-total p-3 rounded-4 mb-4">
                                    <span className="d-block text-secondary small mb-2">Total estimado</span>
                                    <div className="h4 fw-bold mb-0">
                                        <Precio precio={total} />
                                    </div>
                                </div>

                                <div className="d-grid gap-2">
                                    <Boton texto="Confirmar pedido" variante="success" onClick={irConfirmacion} />
                                    <Boton texto="Seguir comprando" variante="outline-primary" onClick={volverCatalogo} />
                                    <Boton texto="Vaciar carrito" variante="outline-danger" onClick={vaciar} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Carrito;
