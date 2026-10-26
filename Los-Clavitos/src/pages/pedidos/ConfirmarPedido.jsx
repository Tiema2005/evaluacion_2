import EncabezadoPagina from "../../components/molecules/EncabezadoPagina";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import { useProductos } from "../../context/ProductosContext";
import FormularioPedido from "../../components/organisms/FormularioPedido";
import ResumenPedido from "../../components/molecules/ResumenPedido";
import Boton from "../../components/atoms/Boton";
import { registrarPedido } from "../../services/pedidoService";
import { useTituloPagina } from "../../hooks/useTituloPagina";

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
            const pedido = registrarPedido(
                datosCliente,
                carrito
            );

            recargar();
            vaciar();

            navigate(
                `/pedido/${encodeURIComponent(pedido.numero)}`,
                { replace: true }
            );
        } catch (errorRegistro) {
            setError(errorRegistro.message);
            setProcesando(false);
        }
    }

    if (items.length === 0) {
        return (
            <Container className="py-5">
                <h1 className="fw-bold mb-3">
                    Confirmar pedido
                </h1>

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
        <Container className="py-5">
            <EncabezadoPagina
                titulo="Confirmar pedido"
                descripcion="Revisa tu compra y completa los datos necesarios para registrar el pedido."
            />

            <Row className="g-4">
                <Col xs={12} lg={7}>
                    <div className="card h-100">
                        <div className="card-body p-4">
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
                        <div className="card-body p-4">
                            <ResumenPedido
                                items={items}
                                total={total}
                            />

                            <div className="mt-4">
                                <Boton
                                    texto="Volver al carrito"
                                    variante="secondary"
                                    onClick={volverCarrito}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ConfirmarPedido;