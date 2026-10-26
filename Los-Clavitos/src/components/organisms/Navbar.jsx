import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { datosTienda } from "../../data/tienda";

function NavbarPrincipal({ nombre, enlaces }) {
    const accesosPrincipales = enlaces.filter((enlace) =>
        ["Inicio", "Catálogo", "Categorías", "Ofertas", "Carrito", "Administración"].includes(enlace.texto)
    );

    const accesosInformacion = enlaces.filter((enlace) =>
        ["Nosotros", "Blog", "Contacto", "Mis compras", "Registrarse", "Iniciar Sesión"].includes(enlace.texto)
    );

    return (
        <>
            <div className="barra-superior py-2">
                <Container className="d-flex flex-column flex-md-row justify-content-between gap-2 small">
                    <span>{datosTienda.telefono} · {datosTienda.horarioAtencion}</span>
                    <span>{datosTienda.direccion}, {datosTienda.comuna}</span>
                </Container>
            </div>

            <Navbar expand="lg" bg="white" className="shadow-sm border-bottom barra-principal sticky-top">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="d-flex flex-column">
                        <span>{nombre}</span>
                        <small className="text-secondary">Materiales y herramientas para tu obra</small>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="menu-principal" />

                    <Navbar.Collapse id="menu-principal">
                        <Nav className="ms-auto align-items-lg-center gap-lg-1">
                            {accesosPrincipales.map((enlace) => (
                                <Nav.Link key={enlace.texto} as={Link} to={enlace.ruta}>
                                    {enlace.texto}
                                </Nav.Link>
                            ))}

                            <NavDropdown title="Más" id="menu-secundario" align="end">
                                {accesosInformacion.map((enlace) => (
                                    <NavDropdown.Item key={enlace.texto} as={Link} to={enlace.ruta}>
                                        {enlace.texto}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarPrincipal;
