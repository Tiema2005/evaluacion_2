import EncabezadoPagina from "../components/molecules/EncabezadoPagina";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import TarjetaCategoria from "../components/molecules/TarjetaCategoria";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Categorias() {
    const navigate = useNavigate();
    const { productos } = useProductos();

    useTituloPagina("Categorías");

    const categorias = [
        ...new Set(productos.map((producto) => producto.categoria))
    ].filter(Boolean);

    function verCategoria(categoria) {
        navigate(`/catalogo?categoria=${encodeURIComponent(categoria)}`);
    }

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Categorías"
                descripcion="Explora nuestros productos según su categoría."
            />

            <Row>
                {categorias.map((categoria) => (
                    <Col
                        key={categoria}
                        xs={12}
                        md={6}
                        lg={4}
                        className="mb-3"
                    >
                        <TarjetaCategoria
                            categoria={categoria}
                            onVerProductos={() => verCategoria(categoria)}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Categorias;