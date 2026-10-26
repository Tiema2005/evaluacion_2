import EncabezadoPagina from "../../components/molecules/EncabezadoPagina";
import { useNavigate } from "react-router-dom";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { articulos } from "../../data/articulos";
import { Container, Row, Col } from "react-bootstrap";
import TarjetaArticulo from "../../components/molecules/TarjetaArticulo";

function Blog() {
    const navigate = useNavigate();

    useTituloPagina("Blog");

    function verArticulo(id) {
        navigate(`/blog/${id}`);
    }

    return (
        <Container className="py-5">
            <EncabezadoPagina
                titulo="Blog de Noticias"
                descripcion="Consejos e información para tus proyectos de construcción y ferretería."
            />

            <Row className="g-4">
                {articulos.map((articulo) => (
                    <Col
                        key={articulo.id}
                        xs={12}
                        md={6}
                    >
                        <TarjetaArticulo
                            articulo={articulo}
                            onVerArticulo={() => verArticulo(articulo.id)}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Blog;