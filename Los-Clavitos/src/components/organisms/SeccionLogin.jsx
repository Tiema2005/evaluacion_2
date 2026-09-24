import { Container, Row, Col } from "react-bootstrap";
import FormularioLogin from "../molecules/FormularioLogin";

function SeccionLogin() {
  function alEnviar(e) {
    e.preventDefault();
    alert('Iniciando sesión...');
  }

  return (
    <Container className="mb-3">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="mb-3">
          <div className="card p-3">
            <h2>Iniciar Sesión</h2>
            <p>Ingresa tus credenciales para acceder a tu cuenta</p>

            <FormularioLogin onSubmit={alEnviar} />

            <p className="mt-3">
              ¿No tienes cuenta? <a href="#registro">Regístrate aquí</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SeccionLogin;