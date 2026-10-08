import { Row, Col } from "react-bootstrap";
import TarjetaProducto from "../molecules/TarjetaProducto";

function CatalogoProductos(props) {
    const productos = props.productos || [];

    return (
        <Row>
            {productos.map((producto) => (
                <Col
                    key={producto.codigo}
                    xs={12}
                    md={6}
                    lg={4}
                    className="mb-4"
                >
                    <TarjetaProducto
                        producto={producto}
                        onVerProducto={() => props.onVerProducto?.(producto.codigo)}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default CatalogoProductos;