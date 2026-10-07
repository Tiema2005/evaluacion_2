import Boton from "./Boton";

function ContadorCantidad(props) {
    const cantidad = props.cantidad ?? 1;
    const minimo = props.minimo ?? 1;

    return (
        <div className="d-flex align-items-center gap-2">
            <Boton
                texto="-"
                variante="outline-secondary"
                onClick={props.onDisminuir}
                deshabilitado={cantidad <= minimo}
            />

            <span>{cantidad}</span>

            <Boton
                texto="+"
                variante="outline-secondary"
                onClick={props.onAumentar}
            />
        </div>
    );
}

export default ContadorCantidad;