import EncabezadoPagina from "../components/molecules/EncabezadoPagina";
import { Container, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { articulos } from "../data/articulos";
import "./Blog.css";

function DetalleArticulo() {
    const navigate = useNavigate();
    const { id } = useParams();

    const articulo = articulos.find(
        (item) => item.id === id
    );

    useTituloPagina(
        articulo ? articulo.titulo : "Artículo no encontrado"
    );

    function volverBlog() {
        navigate("/blog");
    }

    if (!articulo) {
        return (
            <Container className="py-5">
                <EncabezadoPagina titulo="Artículo no encontrado" />

                <p className="text-secondary my-3">
                    No existe un artículo con el
                    identificador indicado.
                </p>

                <Boton
                    texto="Volver al blog"
                    variante="primary"
                    onClick={volverBlog}
                />
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <div className="mb-4">
                <Badge bg="warning" text="dark">
                    {articulo.categoria}
                </Badge>

                <div className="mt-3">
                    <EncabezadoPagina
                        titulo={articulo.titulo}
                        descripcion={articulo.resumen}
                    />
                </div>
            </div>

            <div className="card">
                <img
                    src={articulo.imagen}
                    alt={articulo.titulo}
                    className="card-img-top imagen-articulo-detalle"
                />

                <div className="card-body p-4">
                    {articulo.contenido.map((parrafo, indice) => (
                        <p
                            key={indice}
                            className="mb-4 lh-lg"
                        >
                            {parrafo}
                        </p>
                    ))}

                    <Boton
                        texto="Volver al blog"
                        variante="secondary"
                        onClick={volverBlog}
                    />
                </div>
            </div>
        </Container>
    );
}

export default DetalleArticulo;