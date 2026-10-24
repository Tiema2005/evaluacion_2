import Boton from "../atoms/Boton";
import ContadorCantidad from "../atoms/ContadorCantidad";
import Precio from "../atoms/Precio";

function ItemCarrito(props) {
    const item = props.item;

    function aumentar() {
        props.onCambiarCantidad(item.codigo, item.cantidad + 1);
    }

    function disminuir() {
        props.onCambiarCantidad(item.codigo, item.cantidad - 1);
    }

    function quitar() {
        props.onEliminar(item.codigo);
    }

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row g-3 align-items-center">
                    <div className="col-md-5">
                        <h5 className="card-title">
                            {item.nombre}
                        </h5>

                        <p className="text-muted mb-1">
                            Código: {item.codigo}
                        </p>

                        <p className="mb-1">
                            Precio unitario:
                        </p>

                        <Precio precio={item.precioVenta} />
                    </div>

                    <div className="col-md-3">
                        <p className="mb-2">
                            <strong>Cantidad</strong>
                        </p>

                        <ContadorCantidad
                            cantidad={item.cantidad}
                            minimo={1}
                            maximo={item.stock}
                            onAumentar={aumentar}
                            onDisminuir={disminuir}
                        />
                    </div>

                    <div className="col-md-2">
                        <p className="mb-2">
                            <strong>Subtotal</strong>
                        </p>

                        <Precio precio={item.subtotal} />
                    </div>

                    <div className="col-md-2">
                        <Boton
                            texto="Eliminar"
                            variante="outline-danger"
                            onClick={quitar}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCarrito;