import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormularioLogin from "../components/organisms/FormularioLogin";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Login() {
    const navigate = useNavigate();

    useTituloPagina("Inicio de Sesión");

    function completarFormulario() {
        navigate("/catalogo");
    }

    return (
        <Container className="py-5">
            <div className="mx-auto" style={{ maxWidth: "450px" }}>
                <h1 className="mb-3">Inicio de Sesión</h1>

                <p className="text-muted">
                    Ingresa tu correo electrónico y contraseña para continuar.
                </p>

                <FormularioLogin
                    onEnviar={completarFormulario}
                />
            </div>
        </Container>
    );
}

export default Login;