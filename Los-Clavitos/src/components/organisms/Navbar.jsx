import { Container, Nav, Navbar as NavbarBootstrap } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar(props) {
    const enlaces = [
        { texto: "Inicio", ruta: "/" },
        { texto: "Catálogo", ruta: "/catalogo" },
        { texto: "Categorías", ruta: "/categorias" },
        { texto: "Ofertas", ruta: "/ofertas" },
        { texto: "Nosotros", ruta: "/nosotros" },
        { texto: "Blog", ruta: "/blog" },
        { texto: "Contacto", ruta: "/contacto" },
        { texto: "Carrito", ruta: "/carrito" },
        { texto: "Administración", ruta: "/administracion" },
        { texto: "Registrarse", ruta: "/registro" },
        { texto: "Iniciar Sesión", ruta: "/login" }
    ];

    return (
        <NavbarBootstrap bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
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