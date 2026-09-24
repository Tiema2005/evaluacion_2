import { Form } from "react-bootstrap";
import CampoInput from "../atoms/CampoInput";
import Boton from "../atoms/Boton";

function FormularioLogin({ onSubmit }) {
  return (
    <Form onSubmit={onSubmit} id="form-login" noValidate>
      <CampoInput
        label="Correo Electrónico"
        type="email"
        id="login-email"
        placeholder="ejemplo@duoc.cl"
      />

      <CampoInput
        label="Contraseña"
        type="password"
        id="login-pass"
        placeholder="••••••••"
      />

      <Boton
        texto="Ingresar"
        type="submit"
        variante="primary"
        className="w-100 mt-2"
      />
    </Form>
  );
}

export default FormularioLogin;