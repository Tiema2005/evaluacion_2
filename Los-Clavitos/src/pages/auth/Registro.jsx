import EncabezadoPagina from "../../components/molecules/EncabezadoPagina";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormularioRegistro from "../../components/organisms/FormularioRegistro";
import Boton from "../../components/atoms/Boton";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { crearUsuario } from "../../services/usuarioService";

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

    function irLogin() {
        navigate("/login");
    }

    return (
        <Container className="py-5">
            <div className="mx-auto col-12 col-md-8 col-lg-6">
                <EncabezadoPagina titulo="Registro de usuarios" />

                {registrado ? (
                    <div>
                        <p
                            className="alert alert-success"
                            role="status"
                        >
                            Tu perfil de demostración se registró correctamente. No se almacenan contraseñas.
                        </p>

                        <Boton
                            texto="Ir al inicio de sesión"
                            variante="primary"
                            onClick={irLogin}
                        />
                    </div>
                ) : (
                    <>
                        <p className="text-muted">
                            Completa tus datos personales para continuar.
                        </p>

                        {error && <p className="alert alert-danger" role="alert">{error}</p>}
                        <FormularioRegistro
                            onEnviar={completarRegistro}
                        />
                    </>
                )}
            </div>
        </Container>
    );
}

export default Registro;