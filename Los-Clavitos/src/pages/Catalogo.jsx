import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import CatalogoProductos from "../components/organisms/CatalogoProductos";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Catalogo() {
    const navigate = useNavigate();
    const { productos } = useProductos();

    useTituloPagina("Catálogo de productos");

    const productosMostrar = productos.slice(0, 12);

    function verProducto(codigo) {
        navigate(`/producto/${codigo}`);
    }

    return (
        <Container className="py-4">
            <h1>Catálogo de productos</h1>

            <p>
                Explora los productos disponibles en nuestra ferretería.
            </p>

            <CatalogoProductos
                productos={productosMostrar}
                onVerProducto={verProducto}
            />
        </Container>
    );
}

export default Catalogo;