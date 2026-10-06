import { Button } from "react-bootstrap";

function ContadorCantidad({
    cantidad = 1,
    onAumentar,
    onDisminuir,
    minimo = 1,
}) {
return (
    <div className="d-flex align-items-center gap-2">
        <Button
            variant="outline-secondary"
            size="sm"
            onClick={onDisminuir}
            disabled={cantidad <= minimo}
        >
        -
        </Button>

        <span>{cantidad}</span>

        <Button
            variant="outline-secondary"
            size="sm"
            onClick={onAumentar}
        >
        +
        </Button>
    </div>
);
}

export default ContadorCantidad;