import { useState } from "react";
import { Container } from "react-bootstrap";
import { useProductos } from "../context/ProductosContext";
import CatalogoProductos from "../components/organisms/CatalogoProductos";
import FiltroCategoria from "../components/molecules/FiltroCategoria";

function Catalogo() {
    const { productos } = useProductos();

    const [categoria, setCategoria] = useState("");

    const categorias = [...new Set(productos.map((producto) => producto.categoria))];

    const productosFiltrados = productos.filter((producto) => {
        return categoria === "" || producto.categoria === categoria;
    });

    const productosMostrar = productosFiltrados.slice(0, 9);

    function cambiarCategoria(evento) {
        setCategoria(evento.target.value);
    }

    return (
        <Container className="py-4">
            <h1>Catálogo de productos</h1>

            <p>
                Revisa los productos disponibles en Ferretería Los Maestros.
            </p>

            <FiltroCategoria
                categorias={categorias}
                categoria={categoria}
                onCambiarCategoria={cambiarCategoria}
            />

            <CatalogoProductos productos={productosMostrar} />
        </Container>
    );
}

export default Catalogo;