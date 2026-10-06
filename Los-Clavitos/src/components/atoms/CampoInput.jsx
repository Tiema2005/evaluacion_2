import { Form } from "react-bootstrap";

function CampoInput({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    errorTexto,
    name,
    disabled = false,
}) {
return (
    <Form.Group className="mb-3" controlId={id}>
        <Form.Label>{label}</Form.Label>

        <Form.Control
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            isInvalid={Boolean(errorTexto)}
        />

        {errorTexto && (
            <Form.Control.Feedback type="invalid">
                {errorTexto}
            </Form.Control.Feedback>
        )}
    </Form.Group>
);
}

export default CampoInput;