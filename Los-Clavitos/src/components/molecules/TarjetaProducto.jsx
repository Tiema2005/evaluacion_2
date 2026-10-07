import Boton from "../atoms/Boton";
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
        <div className="card h-100">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                    {producto.nombre}
                </h5>

                <p className="card-text mb-1">
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
        </div>
    );
}

export default TarjetaProducto;

//El commit anterior fue: "Se agregaron props a los componentes Navbar, Footer y TarjetaProducto para que puedan recibir datos dinámicos desde sus componentes padres. Esto permite personalizar el contenido de estos componentes según las necesidades de la aplicación."