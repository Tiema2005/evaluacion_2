import { Form } from "react-bootstrap";

function Selector({
    id,
    label,
    value,
    onChange,
    opciones = [],
    placeholder = "Seleccione una opción",
}) {
return (
    <Form.Group className="mb-3" controlId={id}>
        <Form.Label>{label}</Form.Label>

        <Form.Select value={value} onChange={onChange}>
            <option value="">{placeholder}</option>

            {opciones.map((opcion) => (
                <option key={opcion} value={opcion}>
                    {opcion}
            </option>
            ))}
        </Form.Select>
    </Form.Group>
);
}

export default Selector;