import { Container, Row, Col, Badge } from "react-bootstrap";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductos } from "../../context/ProductosContext";
import { useCarrito } from "../../context/CarritoContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import ImagenProducto from "../../components/atoms/ImagenProducto";
import Precio from "../../components/atoms/Precio";
import EtiquetaStock from "../../components/atoms/EtiquetaStock";
import Boton from "../../components/atoms/Boton";
import CatalogoProductos from "../../components/organisms/CatalogoProductos";
import { obtenerEstadoStock } from "../../utils/stockUtils";

function DetalleProducto() {
    const navigate = useNavigate();
    const { codigo } = useParams();
    const { productos } = useProductos();
    const { agregar } = useCarrito();

    const producto = productos.find((item) => item.codigo === codigo) || null;
    const [mensaje, setMensaje] = useState("");

    useTituloPagina(producto ? producto.nombre : "Producto no encontrado");

    const relacionados = useMemo(() => {
        if (!producto) {
            return [];
        }

        return productos
            .filter((item) => item.codigo !== producto.codigo && item.categoria === producto.categoria)
            .slice(0, 3);
    }, [producto, productos]);

    if (!producto) {
        return (
            <Container className="py-4">
                <div className="alert alert-warning">No se encontró el producto solicitado.</div>
                <Boton texto="Volver al catálogo" variante="primary" onClick={() => navigate("/catalogo")} />
            </Container>
        );
    }

    const estadoStock = obtenerEstadoStock(producto.stock, producto.stockMinimo);

    function agregarAlCarrito() {
        const resultado = agregar(producto.codigo);

        if (resultado === null) {
            setMensaje("No fue posible agregar el producto al carrito.");
            return;
        }

        setMensaje("Producto agregado al carrito correctamente.");
    }

    function verProducto(codigoProducto) {
        navigate(`/producto/${encodeURIComponent(codigoProducto)}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <Container className="py-4">
            <p className="small text-secondary mb-3">
                Catálogo / {producto.categoria} / {producto.subcategoria}
            </p>

            <section className="detalle-producto mb-5">
                <Row className="g-4 align-items-stretch">
                    <Col lg={6}>
                        <div className="card h-100 detalle-producto-galeria">
                            <div className="card-body p-0 overflow-hidden rounded-4">
                                <ImagenProducto producto={producto} variante="detalle" />
                            </div>
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className="card h-100 detalle-producto-resumen">
                            <div className="card-body p-4 p-lg-5 d-flex flex-column">
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    <Badge bg="light" text="dark">{producto.categoria}</Badge>
                                    <Badge bg="warning" text="dark">{producto.subcategoria}</Badge>
                                </div>

                                <h1 className="mb-2">{producto.nombre}</h1>
                                <p className="text-secondary mb-2">Marca: <strong>{producto.marca}</strong></p>
                                <p className="text-secondary mb-4">Código: {producto.codigo} · Unidad: {producto.unidad}</p>

                                <div className="mb-3">
                                    <Precio precio={producto.precioVenta} />
                                </div>

                                <div className="mb-4">
                                    <EtiquetaStock texto={estadoStock.texto} variante={estadoStock.variante} />
                                </div>

                                <div className="detalle-grid mb-4">
                                    <div><span>Stock disponible</span><strong>{producto.stock} unidades</strong></div>
                                    <div><span>Stock mínimo</span><strong>{producto.stockMinimo} unidades</strong></div>
                                    <div><span>Retiro</span><strong>Disponible en tienda</strong></div>
                                    <div><span>Despacho</span><strong>Según comuna de cobertura</strong></div>
                                </div>

                                {mensaje && <div className="alert alert-success py-2">{mensaje}</div>}

                                <div className="d-grid gap-2 mt-auto">
                                    <Boton texto="Agregar al carrito" variante="primary" onClick={agregarAlCarrito} />
                                    <Boton texto="Volver al catálogo" variante="outline-primary" onClick={() => navigate("/catalogo")} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>

            <section className="mb-5">
                <Row className="g-4">
                    <Col lg={8}>
                        <div className="card h-100">
                            <div className="card-body p-4">
                                <h2 className="h4 mb-3">Descripción general</h2>
                                <p className="text-secondary mb-0">
                                    Producto perteneciente a la categoría <strong>{producto.categoria}</strong> y subcategoría <strong>{producto.subcategoria}</strong>. Puede utilizarse como referencia de compra para el flujo de catálogo, detalle y carrito del sistema.
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="card h-100">
                            <div className="card-body p-4">
                                <h2 className="h4 mb-3">Beneficios</h2>
                                <ul className="mb-0 text-secondary ps-3">
                                    <li>Precios visibles y claros.</li>
                                    <li>Stock actualizado por producto.</li>
                                    <li>Pedido rápido desde el carrito.</li>
                                    <li>Retiro en tienda o despacho.</li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>

            {relacionados.length > 0 && (
                <section>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <p className="inicio-etiqueta mb-2">RELACIONADOS</p>
                            <h2 className="h3 mb-0">También te puede interesar</h2>
                        </div>
                    </div>
                    <CatalogoProductos productos={relacionados} onVerProducto={verProducto} />
                </section>
            )}
        </Container>
    );
}

export default DetalleProducto;
