import { Container } from "react-bootstrap";

function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
          <Container className="text-center">
            <p className="mb-1">Ferretería Los Maestros</p>
            <small>Materiales y herramientas para tus proyectos</small>
          </Container>
        </footer>
    );
}

export default Footer;