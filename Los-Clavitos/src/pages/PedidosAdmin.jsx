import EncabezadoPagina from "../components/molecules/EncabezadoPagina";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { listarPedidos } from "../services/pedidoService";
import Boton from "../components/atoms/Boton";
import Precio from "../components/atoms/Precio";
import { useTituloPagina } from "../hooks/useTituloPagina";

function PedidosAdmin() {
    const navigate = useNavigate();

    useTituloPagina("Administración de pedidos");

    const pedidos = listarPedidos();

    function verPedido(numero) {
        navigate(`/pedido/${encodeURIComponent(numero)}`);
    }

    function volverPanel() {
        navigate("/admin");
    }

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Administración de pedidos"
                descripcion="Consulta los pedidos registrados en Ferretería Los Maestros."
            />

            <div className="mb-4">
                <Boton
                    texto="Volver al panel"
                    variante="secondary"
                    onClick={volverPanel}
                />
            </div>

            <p>
                <strong>Pedidos registrados:</strong>{" "}
                {pedidos.length}
            </p>

            {pedidos.length === 0 ? (
                <p>
                    Todavía no hay pedidos registrados.
                </p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Cliente</th>
                            <th>Estado</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.numero}>
                                <td>{pedido.numero}</td>

                                <td>
                                    {pedido.cliente.nombre}{" "}
                                    {pedido.cliente.apellidos}
                                </td>

                                <td>{pedido.estado}</td>

                                <td>
                                    <Precio precio={pedido.total} />
                                </td>

                                <td>
                                    <Boton
                                        texto="Ver comprobante"
                                        variante="outline-primary"
                                        onClick={() =>
                                            verPedido(pedido.numero)
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default PedidosAdmin;