import { Form } from "react-bootstrap";

function CampoInput(props) {
  return (
    <Form.Group className="mb-3" controlId={props.id}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.errorTexto && (
        <Form.Text className="text-danger">
          {props.errorTexto}
        </Form.Text>
      )}
    </Form.Group>
  );
}

export default CampoInput;