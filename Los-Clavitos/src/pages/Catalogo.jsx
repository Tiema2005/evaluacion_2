import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import CampoInput from "../components/atoms/CampoInput";
import FiltroCategoria from "../components/molecules/FiltroCategoria";
import CatalogoProductos from "../components/organisms/CatalogoProductos";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Catalogo() {
    const navigate = useNavigate();
    const { productos } = useProductos();

    const [parametros, setParametros] = useSearchParams();
    const [busqueda, setBusqueda] = useState("");

    const categoria = parametros.get("categoria") || "";

    useTituloPagina("Catálogo de productos");

    // Obtiene las categorías disponibles sin repetirlas.
    const categorias = [
        ...new Set(productos.map((producto) => producto.categoria))
    ].filter(Boolean);

    // Filtra los productos por categoría y búsqueda.
    const productosFiltrados = productos.filter((producto) => {
        const coincideCategoria =
            categoria === "" || producto.categoria === categoria;

        const textoBusqueda = busqueda.trim().toLowerCase();

        const coincideBusqueda =
            producto.nombre.toLowerCase().includes(textoBusqueda) ||
            producto.codigo.toLowerCase().includes(textoBusqueda);

        return coincideCategoria && coincideBusqueda;
    });

    const productosMostrar = productosFiltrados.slice(0, 12);

    function cambiarCategoria(evento) {
        const nuevaCategoria = evento.target.value;

        if (nuevaCategoria === "") {
            setParametros({});
        } else {
            setParametros({ categoria: nuevaCategoria });
        }
    }

    function cambiarBusqueda(evento) {
        setBusqueda(evento.target.value);
    }

    function verProducto(codigo) {
        navigate(`/producto/${codigo}`);
    }

    return (
        <Container className="py-4">
            <h1>Catálogo de productos</h1>

            <p>
                Explora los productos disponibles en nuestra ferretería.
            </p>

            <CampoInput
                id="buscarProducto"
                label="Buscar productos"
                placeholder="Buscar por nombre o código"
                value={busqueda}
                onChange={cambiarBusqueda}
            />

            <FiltroCategoria
                categorias={categorias}
                categoria={categoria}
                onCambiarCategoria={cambiarCategoria}
            />

            {productosFiltrados.length === 0 ? (
                <p>No se encontraron productos con los filtros seleccionados.</p>
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