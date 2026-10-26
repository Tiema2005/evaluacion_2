import { Accordion, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/ProductosContext";
import EncabezadoPagina from "../../components/molecules/EncabezadoPagina";
import Boton from "../../components/atoms/Boton";
import { useTituloPagina } from "../../hooks/useTituloPagina";

function Categorias() {
    const navigate = useNavigate();
    const { productos } = useProductos();

    useTituloPagina("Categorías");

    const categorias = [...new Set(productos.map((producto) => producto.categoria))].filter(Boolean);

    function verCategoria(categoria) {
        navigate(`/catalogo?categoria=${encodeURIComponent(categoria)}`);
    }

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Categorías"
                descripcion="Selecciona una categoría para ver sus subcategorías y los productos disponibles."
            />

            <Accordion className="categorias-acordeon">
                {categorias.map((categoria, indice) => {
                    const productosCategoria = productos.filter(
                        (producto) => producto.categoria === categoria
                    );
                    const subcategorias = [
                        ...new Set(productosCategoria.map((producto) => producto.subcategoria))
                    ].filter(Boolean);

                    return (
                        <Accordion.Item eventKey={String(indice)} key={categoria}>
                            <Accordion.Header>
                                <span className="fw-semibold">{categoria}</span>
                                <span className="text-secondary small ms-2">
                                    ({productosCategoria.length} productos)
                                </span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <p className="text-secondary mb-2">Subcategorías:</p>
                                <ul className="mb-3">
                                    {subcategorias.map((subcategoria) => (
                                        <li key={subcategoria}>{subcategoria}</li>
                                    ))}
                                </ul>
                                <Boton
                                    texto="Ver productos"
                                    variante="primary"
                                    onClick={() => verCategoria(categoria)}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </Container>
    );
}

export default Categorias;
