import { Container } from "react-bootstrap";

function Footer(props) {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <Container className="text-center">
                <p className="mb-1">{props.nombre}</p>
                <small>{props.descripcion}</small>
            </Container>
        </footer>
    );
}

export default Footer;