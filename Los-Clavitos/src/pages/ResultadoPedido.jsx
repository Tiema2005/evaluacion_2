import EncabezadoPagina from "../components/molecules/EncabezadoPagina";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerPedido } from "../services/pedidoService";
import Boton from "../components/atoms/Boton";
import ResumenPedido from "../components/molecules/ResumenPedido";
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
            <Container className="py-5">
                <EncabezadoPagina titulo="No se encontró el pedido" />

                <p className="alert alert-danger" role="alert">
                    No existe un pedido registrado
                    con el número indicado.
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
        <Container className="py-5">
            <EncabezadoPagina titulo="Pedido registrado correctamente" />

            <p className="alert alert-success" role="status">
                Tu solicitud fue registrada exitosamente.
            </p>

            <div className="card">
                <div className="card-body p-4">
                    <h2 className="h4 fw-bold mb-4">
                        Comprobante del pedido
                    </h2>

                    <p>
                        <strong>Número:</strong>{" "}
                        {pedido.numero}
                    </p>

                    <p>
                        <strong>Estado:</strong>{" "}
                        {pedido.estado}
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

                    <hr className="my-4" />

                    <ResumenPedido
                        items={pedido.productos}
                        total={pedido.total}
                        titulo="Productos solicitados"
                    />

                    <p className="text-secondary mt-4">
                        Este pedido fue registrado de manera
                        simulada. No se ha realizado ningún cobro.
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