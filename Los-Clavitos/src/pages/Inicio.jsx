import { Container, Row, Col } from "react-bootstrap";
import TarjetaMascota from "../components/molecules/TarjetaMascota";

function Inicio(props) {
  function alSeguir(nombre) {
    alert('Ahora sigues a ' + nombre);
  }

  return (
    <Container>
      <Row>
        {props.mascotas.map((m) => (
          <Col key={m.id} xs={12} md={6} lg={4} className="mb-3">
            <TarjetaMascota
              nombre={m.nombre}
              especie={m.especie}
              onSeguir={() => alSeguir(m.nombre)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Inicio;