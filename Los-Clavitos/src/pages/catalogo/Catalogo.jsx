import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useProductos } from "../../context/ProductosContext";
import EncabezadoPagina from "../../components/molecules/EncabezadoPagina";
import CatalogoProductos from "../../components/organisms/CatalogoProductos";
import Selector from "../../components/atoms/Selector";
import { useTituloPagina } from "../../hooks/useTituloPagina";

function Catalogo() {
    const navigate = useNavigate();
    const { productos } = useProductos();
    const [searchParams, setSearchParams] = useSearchParams();

    const categoriaInicial = searchParams.get("categoria") || "";
    const [categoria, setCategoria] = useState(categoriaInicial);
    const [busqueda, setBusqueda] = useState(searchParams.get("q") || "");

    useTituloPagina("Catálogo");

    const categorias = useMemo(
        () => [...new Set(productos.map((producto) => producto.categoria))].filter(Boolean),
        [productos]
    );

    const productosFiltrados = useMemo(() => {
        return productos.filter((producto) => {
            const coincideCategoria = !categoria || producto.categoria === categoria;
            const texto = `${producto.nombre} ${producto.marca} ${producto.subcategoria} ${producto.codigo}`.toLowerCase();
            const coincideBusqueda = texto.includes(busqueda.trim().toLowerCase());
            return coincideCategoria && coincideBusqueda;
        });
    }, [productos, categoria, busqueda]);

    function actualizarFiltros(nuevaCategoria, nuevaBusqueda) {
        const nuevos = {};

        if (nuevaCategoria) {
            nuevos.categoria = nuevaCategoria;
        }
        if (nuevaBusqueda.trim()) {
            nuevos.q = nuevaBusqueda.trim();
        }

        setSearchParams(nuevos);
    }

    function cambiarCategoria(evento) {
        const nuevaCategoria = evento.target.value;
        setCategoria(nuevaCategoria);
        actualizarFiltros(nuevaCategoria, busqueda);
    }

    function cambiarBusqueda(evento) {
        const nuevaBusqueda = evento.target.value;
        setBusqueda(nuevaBusqueda);
        actualizarFiltros(categoria, nuevaBusqueda);
    }

    function limpiarFiltros() {
        setCategoria("");
        setBusqueda("");
        setSearchParams({});
    }

    function verProducto(codigo) {
        navigate(`/producto/${encodeURIComponent(codigo)}`);
    }

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Catálogo de productos"
                descripcion="Explora nuestro inventario con filtros por categoría y búsqueda por nombre, marca o código."
            />

            <section className="card mb-4 filtro-catalogo-card">
                <div className="card-body">
                    <Row className="g-3 align-items-end">
                        <Col md={4}>
                            <Selector
                                id="categoriaCatalogo"
                                className="mb-0"
                                label="Categoría"
                                placeholder="Todas las categorías"
                                opciones={categorias}
                                value={categoria}
                                onChange={cambiarCategoria}
                            />
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="busquedaCatalogo">
                                <Form.Label>Buscar producto</Form.Label>
                                <Form.Control
                                    type="search"
                                    placeholder="Ej: cemento, taladro, cable o código"
                                    value={busqueda}
                                    onChange={cambiarBusqueda}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={2}>
                            <button type="button" className="btn btn-outline-secondary w-100" onClick={limpiarFiltros}>
                                Limpiar
                            </button>
                        </Col>
                    </Row>
                </div>
            </section>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
                <p className="mb-0 text-secondary">
                    <strong>{productosFiltrados.length}</strong> producto(s) encontrado(s)
                    {categoria ? ` en ${categoria}` : ""}.
                </p>
                {(categoria || busqueda) && (
                    <p className="mb-0 small text-secondary">
                        Filtros activos: {categoria || "todas las categorías"}
                        {busqueda ? ` · “${busqueda}”` : ""}
                    </p>
                )}
            </div>

            {productosFiltrados.length === 0 ? (
                <div className="alert alert-light border">
                    No se encontraron productos con los filtros seleccionados.
                </div>
            ) : (
                <CatalogoProductos productos={productosFiltrados} onVerProducto={verProducto} />
            )}
        </Container>
    );
}

export default Catalogo;
