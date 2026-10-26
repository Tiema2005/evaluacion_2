import Boton from "../atoms/Boton";
import ImagenProducto from "../atoms/ImagenProducto";
import EtiquetaStock from "../atoms/EtiquetaStock";
import Precio from "../atoms/Precio";
import { obtenerEstadoStock } from "../../utils/stockUtils";

function TarjetaProducto(props) {
    const producto = props.producto;

    const estadoStock = obtenerEstadoStock(producto.stock, producto.stockMinimo);

    return (
        <article className="card h-100 tarjeta-producto">
            <div className="tarjeta-producto-imagen">
                <ImagenProducto producto={producto} />
            </div>

            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <div>
                        <span className="tarjeta-producto-categoria">{producto.categoria}</span>
                        <p className="tarjeta-producto-codigo mb-0">Código: {producto.codigo}</p>
                    </div>
                    <EtiquetaStock texto={estadoStock.texto} variante={estadoStock.variante} />
                </div>

                <h2 className="h5 card-title mb-2">{producto.nombre}</h2>

                <p className="card-text text-secondary mb-1">{producto.marca}</p>
                <p className="small text-secondary mb-3">{producto.subcategoria} · {producto.unidad}</p>

                <div className="tarjeta-producto-precio mb-4">
                    <Precio precio={producto.precioVenta} />
                </div>

                <div className="mt-auto d-grid">
                    <Boton texto="Ver producto" variante="primary" onClick={props.onVerProducto} />
                </div>
            </div>
        </article>
    );
}

export default TarjetaProducto;
