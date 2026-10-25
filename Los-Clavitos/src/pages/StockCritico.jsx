
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useProductos } from "../context/ProductosContext";
import EtiquetaStock from "../components/atoms/EtiquetaStock";
import Boton from "../components/atoms/Boton";
import { obtenerEstadoStock } from "../utils/stockUtils";
import { useTituloPagina } from "../hooks/useTituloPagina";

function StockCritico() {
    const navigate = useNavigate();
    const { productos } = useProductos();

    useTituloPagina("Stock crítico");

    const productosCriticos = productos.filter(
        (producto) =>
            producto.stock <= 0 ||
            producto.stock < producto.stockMinimo
    );

    function volverPanel() {
        navigate("/admin");
    }

    function irInventario() {
        navigate("/administracion");
    }

    return (
        <Container className="py-4">
            <h1>Productos con stock crítico</h1>

            <p>
                Consulta los productos agotados o con
                existencias inferiores al stock mínimo.
            </p>

            <div className="d-flex flex-wrap gap-2 mb-4">
                <Boton
                    texto="Volver al panel"
                    variante="secondary"
                    onClick={volverPanel}
                />

                <Boton
                    texto="Gestionar inventario"
                    variante="primary"
                    onClick={irInventario}
                />
            </div>

            <p>
                <strong>Productos críticos:</strong>{" "}
                {productosCriticos.length}
            </p>

            {productosCriticos.length === 0 ? (
                <p>
                    No hay productos con stock crítico.
                </p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Stock actual</th>
                            <th>Stock mínimo</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productosCriticos.map((producto) => {
                            const estado = obtenerEstadoStock(
                                producto.stock,
                                producto.stockMinimo
                            );

                            return (
                                <tr key={producto.codigo}>
                                    <td>{producto.codigo}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.stock}</td>
                                    <td>{producto.stockMinimo}</td>

                                    <td>
                                        <EtiquetaStock
                                            texto={estado.texto}
                                            variante={estado.variante}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default StockCritico;
