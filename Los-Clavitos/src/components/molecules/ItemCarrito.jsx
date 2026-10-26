import Boton from "../atoms/Boton";
import ContadorCantidad from "./ContadorCantidad";
import Precio from "../atoms/Precio";
import ImagenProducto from "../atoms/ImagenProducto";

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
        <article className="card mb-3 shadow-sm">
            <div className="card-body p-4">
                <div className="row g-4 align-items-center">
                    <div className="col-12 col-sm-3 col-md-2">
                        <ImagenProducto producto={item} variante="carrito" />
                    </div>
                    <div className="col-12 col-sm-9 col-md-4">
                        <h2 className="h5 fw-bold mb-2">
                            {item.nombre}
                        </h2>

                        <p className="text-secondary small mb-3">
                            Código: {item.codigo}
                        </p>

                        <p className="text-secondary mb-1">
                            Precio unitario
                        </p>

                        <Precio precio={item.precioVenta} />
                    </div>

                    <div className="col-12 col-md-3">
                        <p className="fw-semibold mb-2">
                            Cantidad
                        </p>

                        <ContadorCantidad
                            cantidad={item.cantidad}
                            minimo={1}
                            maximo={item.stock}
                            onAumentar={aumentar}
                            onDisminuir={disminuir}
                        />
                    </div>

                    <div className="col-12 col-md-3">
                        <p className="fw-semibold mb-2">
                            Subtotal
                        </p>

                        <Precio precio={item.subtotal} />
                    </div>
                </div>

                <div className="border-top mt-4 pt-3 d-flex justify-content-end">
                    <Boton
                        texto="Eliminar producto"
                        variante="outline-danger"
                        onClick={quitar}
                    />
                </div>
            </div>
        </article>
    );
}

export default ItemCarrito;