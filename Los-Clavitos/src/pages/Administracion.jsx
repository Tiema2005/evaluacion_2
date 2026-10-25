import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useProductos } from "../context/ProductosContext";
import FilaInventario from "../components/molecules/FilaInventario";
import FormularioProducto from "../components/organisms/FormularioProducto";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { validarProducto } from "../utils/validacionesProducto";
import { useCarrito } from "../context/CarritoContext";
const PRODUCTO_VACIO = {
    codigo: "",
    nombre: "",
    categoria: "",
    subcategoria: "",
    marca: "",
    unidad: "",
    precioCompra: "",
    precioVenta: "",
    stock: "",
    stockMinimo: ""
};

function Administracion() {
    const { productos, crear, actualizar, eliminar } = useProductos();
    const { eliminar: quitarDelCarrito } = useCarrito();

    const [producto, setProducto] = useState({ ...PRODUCTO_VACIO });
    const [codigoEditando, setCodigoEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [codigoEliminar, setCodigoEliminar] = useState(null);

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useTituloPagina("Administración de productos");

    function limpiarMensajes() {
        setError("");
        setMensaje("");
    }

    function nuevoProducto() {
        setProducto({ ...PRODUCTO_VACIO });
        setCodigoEditando(null);
        setCodigoEliminar(null);
        setMostrarFormulario(true);
        limpiarMensajes();
    }

    function editarProducto(productoSeleccionado) {
        setProducto({
            ...productoSeleccionado,
            codigo: String(productoSeleccionado.codigo),
            precioCompra: String(productoSeleccionado.precioCompra ?? ""),
            precioVenta: String(productoSeleccionado.precioVenta ?? ""),
            stock: String(productoSeleccionado.stock ?? ""),
            stockMinimo: String(productoSeleccionado.stockMinimo ?? "")
        });

        setCodigoEditando(productoSeleccionado.codigo);
        setCodigoEliminar(null);
        setMostrarFormulario(true);
        limpiarMensajes();
    }

    function cambiarCampo(evento) {
        const { name, value } = evento.target;

        setProducto((anterior) => ({
            ...anterior,
            [name]: value
        }));
    }

    function cancelarFormulario() {
        setMostrarFormulario(false);
        setCodigoEditando(null);
        setProducto({ ...PRODUCTO_VACIO });
        limpiarMensajes();
    }

    function guardarProducto(evento) {
        evento.preventDefault();
        limpiarMensajes();

        const { error: errorValidacion, datos } = validarProducto(producto);

        if (errorValidacion) {
            setError(errorValidacion);
            return;
        }

        try {
            if (codigoEditando !== null) {
                const resultado = actualizar(codigoEditando, datos);

                if (resultado === null) {
                    setError("No se encontró el producto para actualizar.");
                    return;
                }

                setMensaje("Producto actualizado correctamente.");
            } else {
                crear(datos);
                setMensaje("Producto creado correctamente.");
            }

            setMostrarFormulario(false);
            setCodigoEditando(null);
            setProducto({ ...PRODUCTO_VACIO });
        } catch (errorOperacion) {
            setError(errorOperacion.message);
        }
    }

    function solicitarEliminacion(codigo) {
        setCodigoEliminar(codigo);
        limpiarMensajes();
    }

    function cancelarEliminacion() {
        setCodigoEliminar(null);
    }

    function confirmarEliminacion() {
        if (codigoEliminar === null) {
            return;
        }

        limpiarMensajes();

        try {
            const eliminado = eliminar(codigoEliminar);

            if (!eliminado) {
                setError("No se encontró el producto para eliminar.");
                return;
            }

            // Quitar también el producto del carrito.
            quitarDelCarrito(codigoEliminar);

            if (codigoEditando === codigoEliminar) {
                setMostrarFormulario(false);
                setCodigoEditando(null);
                setProducto({ ...PRODUCTO_VACIO });
            }

            setMensaje("Producto eliminado correctamente.");
        } catch (errorOperacion) {
            setError(errorOperacion.message);
        } finally {
            setCodigoEliminar(null);
        }
    }

    return (
        <Container className="py-4">
            <h1>Administración de productos</h1>

            <p>
                Gestiona el catálogo e inventario de
                Ferretería Los Maestros.
            </p>

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <p className="mb-0">
                    <strong>Productos registrados:</strong>{" "}
                    {productos.length}
                </p>

                <Boton
                    texto="Nuevo producto"
                    variante="primary"
                    onClick={nuevoProducto}
                />
            </div>

            {error && (
                <p className="alert alert-danger" role="alert">
                    {error}
                </p>
            )}

            {mensaje && (
                <p className="alert alert-success" role="status">
                    {mensaje}
                </p>
            )}

            {codigoEliminar !== null && (
                <div className="alert alert-warning">
                    <p>
                        ¿Seguro que deseas eliminar el producto{" "}
                        <strong>{codigoEliminar}</strong>?
                    </p>

                    <div className="d-flex flex-wrap gap-2">
                        <Boton
                            texto="Confirmar eliminación"
                            variante="danger"
                            onClick={confirmarEliminacion}
                        />

                        <Boton
                            texto="Cancelar"
                            variante="secondary"
                            onClick={cancelarEliminacion}
                        />
                    </div>
                </div>
            )}

            {mostrarFormulario && (
                <div className="card mb-4">
                    <div className="card-body">
                        <FormularioProducto
                            producto={producto}
                            editando={codigoEditando !== null}
                            onCambiar={cambiarCampo}
                            onGuardar={guardarProducto}
                            onCancelar={cancelarFormulario}
                        />
                    </div>
                </div>
            )}

            <h2 className="h4 mb-3">
                Inventario de productos
            </h2>

            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map((item) => (
                            <FilaInventario
                                key={item.codigo}
                                producto={item}
                                onEditar={() => editarProducto(item)}
                                onEliminar={() =>
                                    solicitarEliminacion(item.codigo)
                                }
                            />
                        ))}
                    </tbody>
                </Table>
            </div>

            {productos.length === 0 && (
                <p>No hay productos registrados.</p>
            )}
        </Container>
    );
}

export default Administracion;