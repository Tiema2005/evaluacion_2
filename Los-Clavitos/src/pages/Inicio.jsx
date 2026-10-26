import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import Boton from "../components/atoms/Boton";
import TarjetaCategoria from "../components/molecules/TarjetaCategoria";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Inicio() {
    const navigate = useNavigate();
    const { productos } = useProductos();
    const categorias = [...new Set(productos.map((producto) => producto.categoria))]
        .filter(Boolean)
        .slice(0, 3);

    useTituloPagina("Inicio");

    return (
        <Container className="py-5">
            <section className="inicio-destacado p-4 p-md-5 mb-5">
                <p className="inicio-etiqueta mb-2">FERRETERÍA LOS MAESTROS</p>
                <h1 className="mb-3">Materiales y herramientas para tus proyectos</h1>
                <p className="lead text-secondary mb-4">
                    Explora productos de ferretería, revisa su stock
                    y prepara tu pedido con retiro o despacho.
                </p>
                <div className="d-flex flex-wrap gap-2">
                    <Boton texto="Ver catálogo" variante="primary"
                        onClick={() => navigate("/catalogo")} />
                    <Boton texto="Explorar categorías" variante="outline-primary"
                        onClick={() => navigate("/categorias")} />
                </div>
            </section>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h4 fw-bold mb-0">Explora nuestras categorías</h2>
            </div>
            {categorias.length === 0 ? (
                <p>No hay categorías disponibles.</p>
            ) : (
                <Row className="g-4">
                    {categorias.map((categoria) => (
                        <Col key={categoria} xs={12} md={4}>
                            <TarjetaCategoria
                                categoria={categoria}
                                onVerProductos={() => navigate(
                                    `/catalogo?categoria=${encodeURIComponent(categoria)}`
                                )}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Inicio;
