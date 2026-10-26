import { Container, Row, Col } from "react-bootstrap";
import EncabezadoPagina from "../components/molecules/EncabezadoPagina";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { datosTienda } from "../data/tienda";

function Contacto() {
    useTituloPagina("Contacto");

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Contacto y ubicación"
                descripcion="Encuentra nuestros datos principales de contacto, horarios de atención y ubicación de la tienda."
            />

            <Row className="g-4 mb-4">
                <Col md={6} lg={3}>
                    <div className="card h-100 tarjeta-contacto-info">
                        <div className="card-body p-4">
                            <h2 className="h5 mb-3">Dirección</h2>
                            <p className="mb-0 text-secondary">{datosTienda.direccion}<br />{datosTienda.comuna}, {datosTienda.ciudad}</p>
                        </div>
                    </div>
                </Col>

                <Col md={6} lg={3}>
                    <div className="card h-100 tarjeta-contacto-info">
                        <div className="card-body p-4">
                            <h2 className="h5 mb-3">Teléfonos</h2>
                            <p className="mb-1 text-secondary">{datosTienda.telefono}</p>
                            <p className="mb-0 text-secondary">WhatsApp: {datosTienda.whatsapp}</p>
                        </div>
                    </div>
                </Col>

                <Col md={6} lg={3}>
                    <div className="card h-100 tarjeta-contacto-info">
                        <div className="card-body p-4">
                            <h2 className="h5 mb-3">Correo</h2>
                            <p className="mb-0 text-secondary">{datosTienda.email}</p>
                        </div>
                    </div>
                </Col>

                <Col md={6} lg={3}>
                    <div className="card h-100 tarjeta-contacto-info">
                        <div className="card-body p-4">
                            <h2 className="h5 mb-3">Horarios</h2>
                            <p className="mb-1 text-secondary">{datosTienda.horarioAtencion}</p>
                            <p className="mb-0 text-secondary">{datosTienda.horarioRetiro}</p>
                        </div>
                    </div>
                </Col>
            </Row>

            <div className="card border-0 shadow-sm overflow-hidden">
                <Row className="g-0 align-items-stretch">
                    <Col lg={7}>
                        <iframe
                            title="Mapa de la tienda"
                            src={datosTienda.mapaEmbed}
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: "380px" }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </Col>
                    <Col lg={5}>
                        <div className="p-4 p-lg-5 h-100 d-flex flex-column justify-content-center">
                            <p className="inicio-etiqueta mb-2">VISÍTANOS</p>
                            <h2 className="h3 mb-3">Atención presencial y retiro en tienda</h2>
                            <p className="text-secondary mb-4">
                                Esta sección reemplaza una página de contacto vacía por una vista más útil: datos principales, mapa y horarios, tal como suele verse en sitios de retail y ferretería.
                            </p>

                            <ul className="ps-3 text-secondary mb-0">
                                <li>Consulta disponibilidad de productos.</li>
                                <li>Retira productos comprados desde el carrito.</li>
                                <li>Coordina despacho y atención comercial.</li>
                                <li>Resuelve dudas antes de confirmar tu pedido.</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default Contacto;
