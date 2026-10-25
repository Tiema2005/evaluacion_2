import EncabezadoPagina from "../components/molecules/EncabezadoPagina";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { listarPedidos } from "../services/pedidoService";
import { listarCategorias } from "../services/categoriaService";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";

function PanelAdministracion() {
    const navigate = useNavigate();
    const { productos } = useProductos();

    useTituloPagina("Panel de administración");

    const pedidos = listarPedidos();
    const categorias = listarCategorias(productos);

    const productosCriticos = productos.filter(
        (producto) =>
            producto.stock <= 0 ||
            producto.stock < producto.stockMinimo
    );

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Panel de administración"
                descripcion="Resumen general de los productos, pedidos e inventario de Ferretería Los Maestros."
            />

            <Row className="g-4 mt-2">
                <Col xs={12} md={6} lg={4}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="h5">
                                Productos registrados
                            </h2>

                            <p className="display-6">
                                {productos.length}
                            </p>

                            <p>
                                Total de productos en el catálogo.
                            </p>
                        </div>
                    </div>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="h5">
                                Pedidos registrados
                            </h2>

                            <p className="display-6">
                                {pedidos.length}
                            </p>

                            <p>
                                Solicitudes registradas
                                por los clientes.
                            </p>
                        </div>
                    </div>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <div className="card h-100 d-flex">
                        <div className="card-body d-flex flex-column">
                            <h2 className="h5">
                                Productos con stock crítico
                            </h2>

                            <p className="display-6">
                                {productosCriticos.length}
                            </p>

                            <p>
                                Productos agotados o bajo
                                el stock mínimo.
                            </p>

                            <div className="mt-auto">
                                <Boton
                                    texto="Ver stock crítico"
                                    variante="outline-primary"
                                    onClick={() =>
                                        navigate("/admin/stock-critico")
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <h2 className="h4 mt-5 mb-3">
                Gestión administrativa
            </h2>

            <Row className="g-4">
                <Col xs={12} md={6}>
                    <div className="card h-100">
                        <div className="card-body d-flex flex-column">
                            <h3 className="h5">
                                Inventario
                            </h3>

                            <p>
                                Consulta, crea, edita y elimina
                                productos del catálogo.
                            </p>

                            <div className="mt-auto">
                                <Boton
                                    texto="Gestionar productos"
                                    variante="primary"
                                    onClick={() =>
                                        navigate("/administracion")
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    <div className="card h-100">
                        <div className="card-body d-flex flex-column">
                            <h3 className="h5">
                                Pedidos
                            </h3>

                            <p>
                                Revisa las solicitudes registradas
                                y sus comprobantes.
                            </p>

                            <div className="mt-auto">
                                <Boton
                                    texto="Ver pedidos"
                                    variante="primary"
                                    onClick={() =>
                                        navigate("/admin/pedidos")
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    <div className="card h-100">
                        <div className="card-body d-flex flex-column">
                            <h3 className="h5">
                                Categorías
                            </h3>

                            <p>
                                Categorías registradas:{" "}
                                <strong>{categorias.length}</strong>.
                                Puedes crear nuevas categorías
                                y modificar las existentes.
                            </p>

                            <div className="mt-auto">
                                <Boton
                                    texto="Gestionar categorías"
                                    variante="primary"
                                    onClick={() =>
                                        navigate("/admin/categorias")
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default PanelAdministracion;