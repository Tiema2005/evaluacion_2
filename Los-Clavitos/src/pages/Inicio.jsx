import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import Boton from "../components/atoms/Boton";
import CatalogoProductos from "../components/organisms/CatalogoProductos";

function Inicio() {
    const navigate = useNavigate();
    const { productos } = useProductos();

    useTituloPagina("Inicio");

    const destacados = productos.filter((producto) => producto.stock > 0).slice(0, 3);

    function verProducto(codigo) {
        navigate(`/producto/${encodeURIComponent(codigo)}`);
    }

    return (
        <Container className="py-4">
            <section className="inicio-presentacion mb-5">
                <h1 className="mb-3">Bienvenido a Ferretería Los Maestros</h1>
                <p className="text-secondary mb-4">
                    Encuentra materiales de construcción, herramientas y artículos de ferretería.
                    Consulta el stock y organiza tu pedido de forma sencilla.
                </p>
                <div className="d-flex flex-wrap gap-2">
                    <Boton
                        texto="Explorar catálogo"
                        variante="primary"
                        onClick={() => navigate("/catalogo")}
                    />
                    <Boton
                        texto="Ver ubicación"
                        variante="outline-primary"
                        onClick={() => navigate("/contacto")}
                    />
                </div>
            </section>

            <section className="mb-5">
                <div className="mb-3">
                    <h2 className="h3 mb-2">Explora nuestras categorías</h2>
                    <p className="text-secondary mb-0">
                        Busca por tipo de producto y revisa sus subcategorías.
                    </p>
                </div>
                <Boton
                    texto="Ver todas las categorías"
                    variante="outline-primary"
                    onClick={() => navigate("/categorias")}
                />
            </section>

            <section className="mb-4">
                <div className="mb-3">
                    <h2 className="h3 mb-2">Productos destacados</h2>
                    <p className="text-secondary mb-0">
                        Una pequeña selección de nuestro catálogo.
                    </p>
                </div>
                <CatalogoProductos productos={destacados} onVerProducto={verProducto} />
            </section>
        </Container>
    );
}

export default Inicio;
