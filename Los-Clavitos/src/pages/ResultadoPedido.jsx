import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerPedido } from "../services/pedidoService";
import Boton from "../components/atoms/Boton";
import Precio from "../components/atoms/Precio";
import { useTituloPagina } from "../hooks/useTituloPagina";

function ResultadoPedido() {
    const navigate = useNavigate();
    const { numero } = useParams();

    const pedido = obtenerPedido(numero);

    useTituloPagina(
        pedido ? "Pedido registrado" : "Pedido no encontrado"
    );

    function volverInicio() {
        navigate("/");
    }

    function volverCarrito() {
        navigate("/carrito");
    }

    if (!pedido) {
        return (
            <Container className="py-4">
                <h1>No se encontró el pedido</h1>

                <p className="alert alert-danger" role="alert">
                    No existe un pedido registrado con el número indicado.
                </p>

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
            <h1>Pedido registrado correctamente</h1>

            <p className="alert alert-success" role="status">
                Tu solicitud fue registrada exitosamente.
            </p>

            <div className="card">
                <div className="card-body">
                    <h4 className="mb-3">
                        Comprobante del pedido
                    </h4>

                    <p>
                        <strong>Número:</strong> {pedido.numero}
                    </p>

                    <p>
                        <strong>Estado:</strong> {pedido.estado}
                    </p>

                    <p>
                        <strong>Cliente:</strong>{" "}
                        {pedido.cliente.nombre}{" "}
                        {pedido.cliente.apellidos}
                    </p>

                    <p>
                        <strong>Correo:</strong>{" "}
                        {pedido.cliente.correo}
                    </p>

                    <p>
                        <strong>Entrega:</strong>{" "}
                        {pedido.cliente.tipoEntrega}
                    </p>

                    {pedido.cliente.tipoEntrega ===
                        "Despacho a domicilio" && (
                        <p>
                            <strong>Dirección:</strong>{" "}
                            {pedido.cliente.direccion}
                        </p>
                    )}

                    <hr />

                    <h5>Productos solicitados</h5>

                    {pedido.productos.map((producto) => (
                        <div
                            key={producto.codigo}
                            className="mb-3"
                        >
                            <p className="mb-1">
                                <strong>{producto.nombre}</strong>
                            </p>

                            <p className="mb-1">
                                Cantidad: {producto.cantidad}
                            </p>

                            <Precio precio={producto.subtotal} />
                        </div>
                    ))}

                    <hr />

                    <h5>
                        Total: <Precio precio={pedido.total} />
                    </h5>

                    <p className="text-muted mt-3">
                        Este pedido fue registrado de manera simulada.
                        No se ha realizado ningún cobro.
                    </p>

                    <Boton
                        texto="Volver al inicio"
                        variante="primary"
                        onClick={volverInicio}
                    />
                </div>
            </div>
        </Container>
    );
}

export default ResultadoPedido;