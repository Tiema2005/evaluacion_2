import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EncabezadoPagina from "../components/molecules/EncabezadoPagina";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { datosTienda } from "../data/tienda";

function Nosotros() {
    const navigate = useNavigate();

    useTituloPagina("Nuestra tienda");

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Nuestra tienda"
                descripcion="Conoce de forma rápida quiénes somos, qué servicios ofrecemos y dónde encontrarnos."
            />

            <section className="mb-5">
                <Row className="g-4 align-items-center">
                    <Col lg={6}>
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4 p-lg-5">
                                <p className="inicio-etiqueta mb-2">SOBRE LOS MAESTROS</p>
                                <h2 className="h3 mb-3">Atención cercana para obras, reparaciones y compras del día a día.</h2>
                                <p className="text-secondary mb-3">
                                    {datosTienda.nombre} es una tienda pensada para clientes particulares, maestros y pequeñas empresas que necesitan materiales, herramientas y una compra ágil.
                                </p>
                                <p className="text-secondary mb-4">
                                    En este proyecto el foco está en el frontend: catálogo, detalle de producto, carrito y confirmación de pedidos. Por eso esta página se orienta a entregar la información útil que normalmente un cliente busca antes de comprar.
                                </p>

                                <div className="d-flex flex-wrap gap-2">
                                    <Boton texto="Ver catálogo" variante="primary" onClick={() => navigate("/catalogo")} />
                                    <Boton texto="Ir a contacto" variante="outline-primary" onClick={() => navigate("/contacto")} />
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4 p-lg-5">
                                <h2 className="h4 mb-4">Información importante</h2>
                                <div className="info-tienda-lista">
                                    <div>
                                        <span>Ubicación</span>
                                        <strong>{datosTienda.direccion}, {datosTienda.comuna}</strong>
                                    </div>
                                    <div>
                                        <span>Contacto</span>
                                        <strong>{datosTienda.telefono} · {datosTienda.email}</strong>
                                    </div>
                                    <div>
                                        <span>Horarios</span>
                                        <strong>{datosTienda.horarioAtencion}</strong>
                                    </div>
                                    <div>
                                        <span>Modalidades</span>
                                        <strong>Retiro en tienda y despacho</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>

            <section className="mb-5">
                <Row className="g-4">
                    {datosTienda.servicios.map((servicio) => (
                        <Col md={6} lg={3} key={servicio}>
                            <div className="card h-100 tarjeta-servicio-simple">
                                <div className="card-body p-4">
                                    <p className="mb-0 fw-semibold">{servicio}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </section>

            <section>
                <div className="card border-0 shadow-sm overflow-hidden">
                    <Row className="g-0 align-items-stretch">
                        <Col lg={6}>
                            <div className="p-4 p-lg-5 h-100">
                                <p className="inicio-etiqueta mb-2">UBICACIÓN</p>
                                <h2 className="h3 mb-3">Encuéntranos en San Bernardo</h2>
                                <p className="text-secondary mb-4">
                                    Si necesitas retirar productos, consultar disponibilidad o ubicar la tienda, aquí tienes una referencia visual rápida de la ubicación.
                                </p>
                                <p className="mb-2"><strong>Dirección:</strong> {datosTienda.direccion}</p>
                                <p className="mb-2"><strong>Comuna:</strong> {datosTienda.comuna}</p>
                                <p className="mb-4"><strong>Horario:</strong> {datosTienda.horarioRetiro}</p>
                                <Boton texto="Contactar tienda" variante="primary" onClick={() => navigate("/contacto")} />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <iframe
                                title="Ubicación de Ferretería Los Maestros"
                                src={datosTienda.mapaEmbed}
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: "340px" }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </Col>
                    </Row>
                </div>
            </section>
        </Container>
    );
}

export default Nosotros;
