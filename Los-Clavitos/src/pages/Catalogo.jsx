import { Container } from "react-bootstrap";
import { useProductos } from "../context/ProductosContext";
import CatalogoProductos from "../components/organisms/CatalogoProductos";

function Catalogo() {
    const { productos } = useProductos();

    const productosMostrar = productos.slice(0, 21);

    return (
        <Container className="py-4">
            <h1>Catálogo de productos</h1>

            <p>
                Revisa los productos disponibles en Ferretería Los Maestros.
            </p>

            <CatalogoProductos productos={productosMostrar} />
        </Container>
    );
}

export default Catalogo;