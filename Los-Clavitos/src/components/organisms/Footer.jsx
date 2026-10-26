import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { datosTienda } from "../../data/tienda";

function Footer() {
    return (
        <footer className="footer-tienda mt-auto border-top border-warning border-3">
            <Container className="py-5">
                <Row className="g-4">
                    <Col lg={4}>
                        <p className="footer-etiqueta mb-2">FERRETERÍA LOS MAESTROS</p>
                        <h2 className="h4 text-white mb-3">Tu apoyo para construir, reparar y equipar.</h2>
                        <p className="text-white-50 mb-3">
                            {datosTienda.descripcionBreve}
                        </p>
                        <p className="mb-1 text-white"><strong>Dirección:</strong> {datosTienda.direccion}, {datosTienda.comuna}</p>
                        <p className="mb-1 text-white"><strong>Teléfono:</strong> {datosTienda.telefono}</p>
                        <p className="mb-0 text-white"><strong>WhatsApp:</strong> {datosTienda.whatsapp}</p>
                    </Col>

                    <Col sm={6} lg={3}>
                        <h3 className="footer-titulo">Atención</h3>
                        <ul className="footer-lista">
                            <li>{datosTienda.horarioAtencion}</li>
                            <li>{datosTienda.horarioRetiro}</li>
                            <li>Correo: {datosTienda.email}</li>
                            <li>Retiro en tienda y despacho a domicilio</li>
                        </ul>
                    </Col>

                    <Col sm={6} lg={2}>
                        <h3 className="footer-titulo">Explora</h3>
                        <ul className="footer-lista footer-lista-enlaces">
                            <li><Link to="/catalogo">Catálogo</Link></li>
                            <li><Link to="/categorias">Categorías</Link></li>
                            <li><Link to="/ofertas">Destacados</Link></li>
                            <li><Link to="/carrito">Carrito</Link></li>
                            <li><Link to="/historial">Mis compras</Link></li>
                        </ul>
                    </Col>

                    <Col sm={6} lg={3}>
                        <h3 className="footer-titulo">Información</h3>
                        <ul className="footer-lista footer-lista-enlaces">
                            <li><Link to="/nosotros">Nuestra tienda</Link></li>
                            <li><Link to="/contacto">Contacto y ubicación</Link></li>
                            <li><Link to="/blog">Blog y noticias</Link></li>
                            <li><Link to="/login">Iniciar sesión</Link></li>
                            <li><Link to="/registro">Registrarse</Link></li>
                        </ul>
                    </Col>
                </Row>
            </Container>

            <div className="footer-inferior">
                <Container className="d-flex flex-column flex-md-row justify-content-between gap-2 py-3">
                    <small>© 2026 Ferretería Los Maestros. Todos los derechos reservados.</small>
                    <small>{datosTienda.comuna}, {datosTienda.ciudad}</small>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;