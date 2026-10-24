import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import ItemCarrito from "../components/molecules/ItemCarrito";
import Boton from "../components/atoms/Boton";
import Precio from "../components/atoms/Precio";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Carrito() {
    const navigate = useNavigate();

    const {
        items,
        cantidadTotal,
        total,
        actualizarCantidad,
        eliminar,
        vaciar
    } = useCarrito();

    useTituloPagina("Carrito de compras");

    function volverCatalogo() {
        navigate("/catalogo");
    }

    function cambiarCantidad(codigo, cantidad) {
        actualizarCantidad(codigo, cantidad);
    }

    return (
        <Container className="py-4">
            <h1>Carrito de compras</h1>

            <p>
                Revisa los productos seleccionados antes de confirmar
                tu pedido.
            </p>

            {items.length === 0 ? (
                <div>
                    <p>Tu carrito está vacío.</p>

                    <Boton
                        texto="Explorar catálogo"
                        variante="primary"
                        onClick={volverCatalogo}
                    />
                </div>
            ) : (
                <>
                    {items.map((item) => (
                        <ItemCarrito
                            key={item.codigo}
                            item={item}
                            onCambiarCantidad={cambiarCantidad}
                            onEliminar={eliminar}
                        />
                    ))}

                    <div className="card mt-4">
                        <div className="card-body">
                            <h4>Resumen del carrito</h4>

                            <p>
                                <strong>Unidades seleccionadas:</strong>{" "}
                                {cantidadTotal}
                            </p>

                            <div className="mb-3">
                                <strong>Total: </strong>
                                <Precio precio={total} />
                            </div>

                            <div className="d-flex flex-wrap gap-2">
                                <Boton
                                    texto="Seguir comprando"
                                    variante="primary"
                                    onClick={volverCatalogo}
                                />

                                <Boton
                                    texto="Vaciar carrito"
                                    variante="outline-danger"
                                    onClick={vaciar}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Carrito;