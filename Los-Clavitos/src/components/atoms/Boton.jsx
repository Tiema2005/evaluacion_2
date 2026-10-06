import { Button } from "react-bootstrap";

function Boton({ variante = "primary", texto, onClick, disabled = false, type = "button" }) {
    return (
        <Button
            variant={variante}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {texto}
        </Button>
    );
}

export default Boton;