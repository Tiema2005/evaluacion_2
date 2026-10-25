import EncabezadoPagina from "../components/molecules/EncabezadoPagina";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Nosotros() {
    const navigate = useNavigate();

    useTituloPagina("Nosotros");

    function verCatalogo() {
        navigate("/catalogo");
    }

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Sobre Ferretería Los Maestros"
                descripcion="Materiales y herramientas para tus proyectos."
            />

            <p>
                Ferretería Los Maestros ofrece un catálogo de
                materiales de construcción, herramientas y
                artículos de ferretería para diferentes necesidades.
            </p>

            <Row className="g-4 mt-2">
                <Col xs={12} md={6}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="h4">
                                Nuestros productos
                            </h2>

                            <p>
                                Contamos con categorías de
                                construcción, pinturas, herramientas,
                                electricidad y otros artículos.
                            </p>
                        </div>
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="h4">
                                Nuestros servicios
                            </h2>

                            <p>
                                Puedes revisar nuestro catálogo,
                                consultar la disponibilidad de los
                                productos y registrar pedidos con
                                retiro en tienda o despacho.
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>

            <div className="mt-4">
                <Boton
                    texto="Explorar catálogo"
                    variante="primary"
                    onClick={verCatalogo}
                />
            </div>
        </Container>
    );
}

export default Nosotros;