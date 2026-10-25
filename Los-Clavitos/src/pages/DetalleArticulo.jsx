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
                <h1>Artículo no encontrado</h1>

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

                <h1 className="fw-bold mt-3 mb-3">
                    {articulo.titulo}
                </h1>

                <p className="text-secondary">
                    {articulo.resumen}
                </p>
            </div>

            <div className="card shadow-sm">
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