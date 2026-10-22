import { Container, Nav, Navbar as NavbarBootstrap } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar(props) {
    const enlaces = props.enlaces || [];

    return (
        <NavbarBootstrap bg="dark" data-bs-theme="dark" expand="lg">
            <Container className="px-4 px-md-3">
                <NavbarBootstrap.Brand as={Link} to="/">
                    {props.nombre}
                </NavbarBootstrap.Brand>

                <NavbarBootstrap.Toggle aria-controls="navbar-principal" />

                <NavbarBootstrap.Collapse id="navbar-principal">
                    <Nav className="ms-auto">
                        {enlaces.map((enlace) => (
                            <Nav.Link
                                key={enlace.ruta}
                                as={Link}
                                to={enlace.ruta}
                            >
                                {enlace.texto}
                            </Nav.Link>
                        ))}
                    </Nav>
                </NavbarBootstrap.Collapse>
            </Container>
        </NavbarBootstrap>
    );
}

export default Navbar;