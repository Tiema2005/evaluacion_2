import { useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import EncabezadoPagina from "../../components/molecules/EncabezadoPagina";
import Boton from "../../components/atoms/Boton";
import Precio from "../../components/atoms/Precio";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { listarPedidos } from "../../services/pedidoService";

function HistorialPedidos() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [correo, setCorreo] = useState(params.get("correo") || "");
    const [buscado, setBuscado] = useState(params.get("correo") || "");
    useTituloPagina("Historial de pedidos");

    const pedidos = buscado.trim()
        ? listarPedidos().filter(
            (pedido) => pedido.cliente.correo.toLowerCase() === buscado.trim().toLowerCase()
        )
        : [];

    function buscar(evento) {
        evento.preventDefault();
        setBuscado(correo);
    }

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Historial de pedidos"
                descripcion="Consulta los pedidos guardados en esta demostración usando el correo del cliente."
            />
            <p className="text-secondary small">
                Los pedidos se almacenan solo en este navegador. Esta búsqueda no representa una cuenta autenticada.
            </p>
            <Form className="mb-4" onSubmit={buscar}>
                <Form.Label htmlFor="correoHistorial">Correo del cliente</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                    <Form.Control
                        id="correoHistorial"
                        type="email"
                        value={correo}
                        onChange={(evento) => setCorreo(evento.target.value)}
                        placeholder="ejemplo@correo.cl"
                        required
                        className="flex-grow-1"
                    />
                    <Boton tipo="submit" texto="Consultar" />
                </div>
            </Form>
            {buscado && (
                pedidos.length === 0 ? <p>No se encontraron pedidos para ese correo.</p> : (
                    <Table striped bordered responsive>
                        <thead><tr><th>Número</th><th>Fecha</th><th>Estado</th><th>Total</th><th>Comprobante</th></tr></thead>
                        <tbody>
                            {pedidos.map((pedido) => (
                                <tr key={pedido.numero}>
                                    <td>{pedido.numero}</td>
                                    <td>{new Date(pedido.fecha).toLocaleDateString("es-CL")}</td>
                                    <td>{pedido.estado}</td>
                                    <td><Precio precio={pedido.total} /></td>
                                    <td><Boton texto="Ver detalle" variante="outline-primary" onClick={() => navigate(`/pedido/${encodeURIComponent(pedido.numero)}`)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            )}
        </Container>
    );
}

export default HistorialPedidos;
