import EncabezadoPagina from "../../components/molecules/EncabezadoPagina";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/ProductosContext";
import CatalogoProductos from "../../components/organisms/CatalogoProductos";
import Boton from "../../components/atoms/Boton";
import { useTituloPagina } from "../../hooks/useTituloPagina";

function Ofertas() {
    const navigate = useNavigate();
    const { productos } = useProductos();

    useTituloPagina("Productos destacados");

    const destacados = productos
        .filter((producto) => producto.stock > 0)
        .slice(0, 6);

    function verProducto(codigo) {
        navigate(`/producto/${encodeURIComponent(codigo)}`);
    }

    function verCatalogo() {
        navigate("/catalogo");
    }

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Productos destacados"
                descripcion="Descubre una selección de artículos disponibles en nuestro catálogo de ferretería."
            />

            {destacados.length === 0 ? (
                <p>
                    No hay productos destacados disponibles.
                </p>
            ) : (
                <CatalogoProductos
                    productos={destacados}
                    onVerProducto={verProducto}
                />
            )}

            <div className="mt-3">
                <Boton
                    texto="Ver catálogo completo"
                    variante="primary"
                    onClick={verCatalogo}
                />
            </div>
        </Container>
    );
}

export default Ofertas;