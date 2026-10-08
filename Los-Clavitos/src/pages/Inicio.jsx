import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Boton from "../components/atoms/Boton";

function Inicio() {
    const navigate = useNavigate();

    function irCatalogo() {
        navigate("/catalogo");
    }

    return (
        <Container className="py-5 text-center">
            <h1>Ferretería Los Maestros</h1>

            <p className="lead mt-3">
                Encuentra materiales, herramientas y productos para tus proyectos.
            </p>

            <Boton
                texto="Ver catálogo"
                variante="primary"
                onClick={irCatalogo}
            />
        </Container>
    );
}

export default Inicio;