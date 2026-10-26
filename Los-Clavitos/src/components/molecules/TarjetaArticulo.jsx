import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function TarjetaArticulo({ articulo }) {
    return (
        <Card className="h-100 tarjeta-articulo-blog">
            <Card.Img variant="top" src={articulo.imagen} alt={articulo.titulo} className="imagen-articulo" />
            <Card.Body className="d-flex flex-column">
                <Badge bg="warning" text="dark" className="align-self-start mb-3">
                    {articulo.categoria}
                </Badge>
                <Card.Title>{articulo.titulo}</Card.Title>
                <Card.Text className="text-secondary mb-4">{articulo.resumen}</Card.Text>
                <Link className="mt-auto fw-semibold text-decoration-none" to={`/blog/${articulo.id}`}>
                    Leer noticia →
                </Link>
            </Card.Body>
        </Card>
    );
}

export default TarjetaArticulo;
