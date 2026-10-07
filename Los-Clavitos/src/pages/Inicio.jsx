import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Inicio() {
    return (
        <Container className="py-5 text-center">
            <h1>Ferretería Los Maestros</h1>

            <p className="lead mt-3">
                Encuentra materiales, herramientas y productos para tus proyectos.
            </p>

            <Button as={Link} to="/catalogo" variant="primary">
                Ver catálogo
            </Button>
        </Container>
    );
}

export default Inicio;