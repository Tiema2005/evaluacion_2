import { Container, Nav, Navbar as NavbarBootstrap } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <NavbarBootstrap bg="dark" data-bs-theme="dark" expand="lg">
          <Container>
            <NavbarBootstrap.Brand as={Link} to="/">
            Ferretería Los Maestros
            </NavbarBootstrap.Brand>

            <NavbarBootstrap.Toggle aria-controls="navbar-principal" />

            <NavbarBootstrap.Collapse id="navbar-principal">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">
                  Inicio
                </Nav.Link>

                <Nav.Link as={Link} to="/catalogo">
                 Catálogo
                </Nav.Link>
              </Nav>
            </NavbarBootstrap.Collapse>
          </Container>
        </NavbarBootstrap>
    );
}

export default Navbar;