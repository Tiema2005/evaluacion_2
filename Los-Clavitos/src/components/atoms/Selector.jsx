import { Form } from "react-bootstrap";

function Selector(props) {
    const placeholder = props.placeholder || "Seleccione una opción";
    const opciones = props.opciones || [];

    return (
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>

            <Form.Select
                value={props.value}
                onChange={props.onChange}
                disabled={props.deshabilitado}
            >
                <option value="">
                    {placeholder}
                </option>

                {opciones.map((opcion) => (
                    <option
                        key={opcion}
                        value={opcion}
                    >
                        {opcion}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}

export default Selector;