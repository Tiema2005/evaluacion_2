import { Badge } from "react-bootstrap";

function EtiquetaStock(props) {
    const variante = props.variante || "secondary";

    return (
        <Badge bg={variante}>
            {props.texto}
        </Badge>
    );
}

export default EtiquetaStock;