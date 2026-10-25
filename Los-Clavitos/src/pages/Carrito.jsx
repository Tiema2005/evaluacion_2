import EncabezadoPagina from "../components/molecules/EncabezadoPagina";
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

    function irConfirmacion() {
        navigate("/confirmar-pedido");
    }

    function cambiarCantidad(codigo, cantidad) {
        actualizarCantidad(codigo, cantidad);
    }

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Carrito de compras"
                descripcion="Revisa tus productos y cantidades antes de confirmar el pedido."
            />

            {items.length === 0 ? (
                <div className="card shadow-sm">
                    <div className="card-body p-4 text-center">
                        <h2 className="h5 mb-3">
                            Tu carrito está vacío
                        </h2>

                        <p className="text-secondary mb-4">
                            Explora nuestro catálogo y agrega
                            los productos que necesitas.
                        </p>

                        <Boton
                            texto="Explorar catálogo"
                            variante="primary"
                            onClick={volverCatalogo}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="h5 fw-bold mb-3">
                        Productos seleccionados
                    </h2>

                    {items.map((item) => (
                        <ItemCarrito
                            key={item.codigo}
                            item={item}
                            onCambiarCantidad={cambiarCantidad}
                            onEliminar={eliminar}
                        />
                    ))}

                    <div className="card mt-4">
                        <div className="card-body p-4">
                            <h2 className="h4 fw-bold mb-4">
                                Resumen del carrito
                            </h2>

                            <div className="d-flex justify-content-between gap-3 mb-3">
                                <span>Unidades seleccionadas</span>
                                <strong>{cantidadTotal}</strong>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between align-items-center gap-3 my-4">
                                <strong className="h5 mb-0">
                                    Total
                                </strong>

                                <div className="h5 fw-bold mb-0">
                                    <Precio precio={total} />
                                </div>
                            </div>

                            <div className="d-flex flex-wrap gap-2">
                                <Boton
                                    texto="Seguir comprando"
                                    variante="outline-primary"
                                    onClick={volverCatalogo}
                                />

                                <Boton
                                    texto="Confirmar pedido"
                                    variante="success"
                                    onClick={irConfirmacion}
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