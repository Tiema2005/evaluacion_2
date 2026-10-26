import EncabezadoPagina from "../../components/molecules/EncabezadoPagina";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormularioLogin from "../../components/organisms/FormularioLogin";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { datosTienda } from "../../data/tienda";

function Login() {
    const navigate = useNavigate();

    useTituloPagina("Inicio de sesión");

    function completarFormulario() {
        navigate("/catalogo");
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col xl={10}>
                    <div className="card border-0 shadow-sm overflow-hidden login-layout">
                        <Row className="g-0 align-items-stretch">
                            <Col lg={5} className="login-panel-info">
                                <div className="p-4 p-lg-5 text-white h-100 d-flex flex-column justify-content-center">
                                    <p className="mb-2 small text-uppercase fw-semibold">Acceso clientes</p>
                                    <h1 className="h2 mb-3">Ingresa a tu cuenta</h1>
                                    <p className="mb-0 text-white-50">
                                        Consulta productos y continúa con tus pedidos en {datosTienda.nombre}.
                                    </p>
                                </div>
                            </Col>
                            <Col lg={7}>
                                <div className="p-4 p-lg-5">
                                    <EncabezadoPagina
                                        titulo="Inicio de sesión"
                                        descripcion="Ingresa tu correo electrónico y contraseña para continuar."
                                    />
                                    <FormularioLogin onEnviar={completarFormulario} />
                                    <p className="mt-4 mb-0 text-secondary">
                                        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
