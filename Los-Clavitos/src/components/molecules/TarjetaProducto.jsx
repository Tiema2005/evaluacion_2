import Boton from "../atoms/Boton";
import ImagenProducto from "../atoms/ImagenProducto";
import EtiquetaStock from "../atoms/EtiquetaStock";
import Precio from "../atoms/Precio";
import { obtenerEstadoStock } from "../../utils/stockUtils";

function TarjetaProducto(props) {
    const producto = props.producto;

    const estadoStock = obtenerEstadoStock(
        producto.stock,
        producto.stockMinimo
    );

    return (
        <article className="card h-100">
            <ImagenProducto producto={producto} />
            <div className="card-body d-flex flex-column">
                <h2 className="h5 card-title mb-3">
                    {producto.nombre}
                </h2>

                <p className="card-text text-secondary mb-2">
                    {producto.marca}
                </p>

                <Precio precio={producto.precioVenta} />

                <div className="my-3">
                    <EtiquetaStock
                        texto={estadoStock.texto}
                        variante={estadoStock.variante}
                    />
                </div>

                <div className="mt-auto">
                    <Boton
                        texto="Ver producto"
                        variante="primary"
                        onClick={props.onVerProducto}
                    />
                </div>
            </div>
        </article>
    );
}

export default TarjetaProducto;