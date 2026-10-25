import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Contacto() {
    const navigate = useNavigate();

    useTituloPagina("Contacto");

    function verCatalogo() {
        navigate("/catalogo");
    }

    function verCarrito() {
        navigate("/carrito");
    }

    return (
        <Container className="py-4">
            <h1>Contacto</h1>

            <p className="lead">
                ¿Necesitas materiales o herramientas
                para tu proyecto?
            </p>

            <p>
                En Ferretería Los Maestros puedes consultar
                nuestro catálogo y preparar tus pedidos
                de manera sencilla.
            </p>

            <Row className="g-4 mt-2">
                <Col xs={12} md={6}>
                    <div className="card h-100">
                        <div className="card-body d-flex flex-column">
                            <h2 className="h4">
                                Consultar productos
                            </h2>

                            <p>
                                Revisa nuestros artículos,
                                precios y disponibilidad
                                de stock en el catálogo.
                            </p>

                            <div className="mt-auto">
                                <Boton
                                    texto="Ver catálogo"
                                    variante="primary"
                                    onClick={verCatalogo}
                                />
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    <div className="card h-100">
                        <div className="card-body d-flex flex-column">
                            <h2 className="h4">
                                Realizar un pedido
                            </h2>

                            <p>
                                Agrega productos al carrito
                                y selecciona retiro en tienda
                                o despacho al confirmar.
                            </p>

                            <div className="mt-auto">
                                <Boton
                                    texto="Ver carrito"
                                    variante="primary"
                                    onClick={verCarrito}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Contacto;