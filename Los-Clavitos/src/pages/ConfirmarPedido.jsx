import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useProductos } from "../context/ProductosContext";
import FormularioPedido from "../components/organisms/FormularioPedido";
import Boton from "../components/atoms/Boton";
import Precio from "../components/atoms/Precio";
import { registrarPedido } from "../services/pedidoService";
import { useTituloPagina } from "../hooks/useTituloPagina";

function ConfirmarPedido() {
    const navigate = useNavigate();

    const { carrito, items, total, vaciar } = useCarrito();
    const { recargar } = useProductos();

    const [error, setError] = useState("");
    const [procesando, setProcesando] = useState(false);

    useTituloPagina("Confirmar pedido");

    function volverCarrito() {
        navigate("/carrito");
    }

    function confirmar(datosCliente) {
        setProcesando(true);
        setError("");

        try {
            // Registrar el pedido con los datos originales del carrito.
            const pedido = registrarPedido(datosCliente, carrito);

            // Actualizar inventario y limpiar el carrito solo si tuvo éxito.
            recargar();
            vaciar();

            // Mostrar el resultado utilizando el número del pedido.
            navigate(`/pedido/${encodeURIComponent(pedido.numero)}`, {
                replace: true
            });
        } catch (errorRegistro) {
            setError(errorRegistro.message);
            setProcesando(false);
        }
    }

    if (items.length === 0) {
        return (
            <Container className="py-4">
                <h1>Confirmar pedido</h1>

                <p>No hay productos para confirmar.</p>

                <Boton
                    texto="Volver al carrito"
                    variante="primary"
                    onClick={volverCarrito}
                />
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h1>Confirmar pedido</h1>

            <p>
                Revisa tu compra y completa los datos necesarios
                para registrar el pedido.
            </p>

            <Row className="g-4">
                <Col xs={12} lg={7}>
                    <div className="card">
                        <div className="card-body">
                            {error && (
                                <p
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error}
                                </p>
                            )}

                            <FormularioPedido
                                onEnviar={confirmar}
                                procesando={procesando}
                            />
                        </div>
                    </div>
                </Col>

                <Col xs={12} lg={5}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-3">
                                Resumen del pedido
                            </h4>

                            {items.map((item) => (
                                <div
                                    key={item.codigo}
                                    className="mb-3"
                                >
                                    <p className="mb-1">
                                        <strong>{item.nombre}</strong>
                                    </p>

                                    <p className="mb-1">
                                        Cantidad: {item.cantidad}
                                    </p>

                                    <Precio precio={item.subtotal} />
                                </div>
                            ))}

                            <hr />

                            <div className="mb-3">
                                <strong>Total: </strong>
                                <Precio precio={total} />
                            </div>

                            <Boton
                                texto="Volver al carrito"
                                variante="secondary"
                                onClick={volverCarrito}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ConfirmarPedido;