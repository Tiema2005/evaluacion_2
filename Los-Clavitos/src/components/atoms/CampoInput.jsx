import { Form } from "react-bootstrap";

function CampoInput(props) {
    const tipo = props.tipo || "text";

    return (
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>

            <Form.Control
                type={tipo}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                disabled={props.deshabilitado}
                isInvalid={Boolean(props.errorTexto)}
            />

            {props.errorTexto && (
                <Form.Control.Feedback type="invalid">
                    {props.errorTexto}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
}

export default CampoInput;