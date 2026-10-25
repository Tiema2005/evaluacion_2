import { Container } from "react-bootstrap";

function Footer({ nombre, descripcion }) {
    return (
        <footer className="bg-dark text-white py-4 mt-auto border-top border-warning border-3">
            <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-center text-md-start">
                <strong>{nombre}</strong>
                <small className="text-white-50">{descripcion}</small>
            </Container>
        </footer>
    );
}

export default Footer;