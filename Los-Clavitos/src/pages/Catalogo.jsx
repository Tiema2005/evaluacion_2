import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import CatalogoProductos from "../components/organisms/CatalogoProductos";
import FiltroCategoria from "../components/molecules/FiltroCategoria";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Catalogo() {
    const navigate = useNavigate();
    const { productos } = useProductos();

    const [categoria, setCategoria] = useState("");

    useTituloPagina("Catálogo de productos");

    // Obtiene las categorías disponibles sin repetirlas
    const categorias = [
        ...new Set(productos.map((producto) => producto.categoria))
    ].filter(Boolean);

    // Filtra los productos según la categoría seleccionada
    const productosFiltrados = productos.filter((producto) => {
        return categoria === "" || producto.categoria === categoria;
    });

    // Muestra hasta 12 productos de la categoría seleccionada
    const productosMostrar = productosFiltrados.slice(0, 12);

    function cambiarCategoria(evento) {
        setCategoria(evento.target.value);
    }

    function verProducto(codigo) {
        navigate(`/producto/${codigo}`);
    }

    return (
        <Container className="py-4">
            <h1>Catálogo de Productos</h1>

            <p>
                Explora los productos disponibles de nuestra ferretería.
            </p>

            <FiltroCategoria
                categorias={categorias}
                categoria={categoria}
                onCambiarCategoria={cambiarCategoria}
            />

            {productosFiltrados.length === 0 ? (
                <p>No se encontraron productos en esta categoría.</p>
            ) : (
                <CatalogoProductos
                    productos={productosMostrar}
                    onVerProducto={verProducto}
                />
            )}
        </Container>
    );
}

export default Catalogo;