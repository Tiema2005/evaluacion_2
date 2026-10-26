import { useState } from "react";
import { Container, Nav, NavDropdown, Navbar as NavbarBootstrap } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Navbar({ nombre, enlaces = [] }) {
    const [expandido, setExpandido] = useState(false);
    const ubicacion = useLocation();
    const cerrarMenu = () => setExpandido(false);
    const informacion = ["Nosotros", "Blog", "Contacto"];
    const cuenta = ["Mis compras", "Registrarse", "Iniciar Sesión"];
    const principales = enlaces.filter(
        (enlace) => ![...informacion, ...cuenta].includes(enlace.texto)
    );

    function enlacePorNombre(nombreEnlace) {
        return enlaces.find((enlace) => enlace.texto === nombreEnlace);
    }

    return (
        <NavbarBootstrap
            bg="dark"
            data-bs-theme="dark"
            expand="xl"
            className="barra-principal py-2"
            expanded={expandido}
            onToggle={setExpandido}
        >
            <Container>
                <NavbarBootstrap.Brand as={Link} to="/" onClick={cerrarMenu}>
                    {nombre}
                </NavbarBootstrap.Brand>

                <NavbarBootstrap.Toggle aria-controls="navbar-principal" />

                <NavbarBootstrap.Collapse id="navbar-principal">
                    <Nav className="ms-auto align-items-xl-center">
                        {principales.map((enlace) => (
                            <Nav.Link
                                key={enlace.ruta}
                                as={Link}
                                to={enlace.ruta}
                                active={ubicacion.pathname === enlace.ruta}
                                onClick={cerrarMenu}
                            >
                                {enlace.texto}
                            </Nav.Link>
                        ))}

                        <NavDropdown title="Información" id="menu-informacion">
                            {informacion.map((texto) => {
                                const enlace = enlacePorNombre(texto);
                                return enlace ? (
                                    <NavDropdown.Item
                                        key={enlace.ruta}
                                        as={Link}
                                        to={enlace.ruta}
                                        onClick={cerrarMenu}
                                    >
                                        {texto}
                                    </NavDropdown.Item>
                                ) : null;
                            })}
                        </NavDropdown>

                        <NavDropdown title="Cuenta" id="menu-cuenta">
                            {cuenta.map((texto) => {
                                const enlace = enlacePorNombre(texto);
                                return enlace ? (
                                    <NavDropdown.Item
                                        key={enlace.ruta}
                                        as={Link}
                                        to={enlace.ruta}
                                        onClick={cerrarMenu}
                                    >
                                        {texto}
                                    </NavDropdown.Item>
                                ) : null;
                            })}
                        </NavDropdown>
                    </Nav>
                </NavbarBootstrap.Collapse>
            </Container>
        </NavbarBootstrap>
    );
}

export default Navbar;
