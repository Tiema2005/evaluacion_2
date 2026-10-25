import { Badge } from "react-bootstrap";
import Boton from "../atoms/Boton";

function TarjetaArticulo({ articulo, onVerArticulo }) {
    return (
        <article className="card h-100">
            <img
                src={articulo.imagen}
                alt={articulo.titulo}
                className="card-img-top imagen-articulo"
            />

            <div className="card-body d-flex flex-column p-4">
                <div className="mb-3">
                    <Badge bg="warning" text="dark">
                        {articulo.categoria}
                    </Badge>
                </div>

                <h2 className="h4 fw-bold mb-3">
                    {articulo.titulo}
                </h2>

                <p className="text-secondary mb-4">
                    {articulo.resumen}
                </p>

                <div className="mt-auto">
                    <Boton
                        texto="Leer artículo"
                        variante="primary"
                        onClick={onVerArticulo}
                    />
                </div>
            </div>
        </article>
    );
}

export default TarjetaArticulo;