import Boton from "../atoms/Boton";
import Precio from "../atoms/Precio";

function FilaInventario(props) {
    const producto = props.producto;

    return (
        <tr>
            <td>{producto.codigo}</td>

            <td>{producto.nombre}</td>

            <td>{producto.categoria}</td>

            <td>
                <Precio precio={producto.precioVenta} />
            </td>

            <td>{producto.stock}</td>

            <td>
                <div className="d-flex flex-wrap gap-2">
                    <Boton
                        texto="Editar"
                        variante="outline-primary"
                        onClick={props.onEditar}
                    />

                    <Boton
                        texto="Eliminar"
                        variante="outline-danger"
                        onClick={props.onEliminar}
                    />
                </div>
            </td>
        </tr>
    );
}

export default FilaInventario;