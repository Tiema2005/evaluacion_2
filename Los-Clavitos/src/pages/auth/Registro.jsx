import EncabezadoPagina from "../../components/molecules/EncabezadoPagina";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormularioRegistro from "../../components/organisms/FormularioRegistro";
import Boton from "../../components/atoms/Boton";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { crearUsuario } from "../../services/usuarioService";
import { datosTienda } from "../../data/tienda";

function Registro() {
    const navigate = useNavigate();
    const [registrado, setRegistrado] = useState(false);
    const [error, setError] = useState("");

    useTituloPagina("Registro de usuarios");

    function completarRegistro(datos) {
        try {
            crearUsuario({ ...datos, rol: "Cliente", cuentaCorriente: false });
            setError("");
            setRegistrado(true);
        } catch (fallo) {
            setError(fallo.message);
        }
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col xl={10}>
                    <div className="card border-0 shadow-sm overflow-hidden login-layout">
                        <Row className="g-0 align-items-stretch">
                            <Col lg={5} className="login-panel-info">
                                <div className="p-4 p-lg-5 text-white h-100 d-flex flex-column justify-content-center">
                                    <p className="mb-2 small text-uppercase fw-semibold">Clientes nuevos</p>
                                    <h1 className="h2 mb-3">Crea tu cuenta</h1>
                                    <p className="mb-0 text-white-50">
                                        Registra tus datos para organizar tus pedidos en {datosTienda.nombre}.
                                    </p>
                                </div>
                            </Col>

                            <Col lg={7}>
                                <div className="p-4 p-lg-5">
                                    <EncabezadoPagina
                                        titulo="Registro de usuarios"
                                        descripcion="Completa tus datos personales para crear un perfil de demostración."
                                    />

                                    {registrado ? (
                                        <>
                                            <p className="alert alert-success" role="status">
                                                Tu perfil de demostración se registró correctamente. No se almacenan contraseñas.
                                            </p>
                                            <Boton
                                                texto="Ir al inicio de sesión"
                                                variante="primary"
                                                onClick={() => navigate("/login")}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {error && (
                                                <p className="alert alert-danger" role="alert">{error}</p>
                                            )}
                                            <FormularioRegistro onEnviar={completarRegistro} />
                                        </>
                                    )}

                                    <p className="mt-4 mb-0 text-secondary">
                                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>.
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

export default Registro;
