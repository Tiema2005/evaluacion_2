import EncabezadoPagina from "../components/molecules/EncabezadoPagina";
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
            <div className="mx-auto col-12 col-md-8 col-lg-6">
                <EncabezadoPagina
                    titulo="Inicio de sesión"
                    descripcion="Ingresa tu correo electrónico y contraseña para continuar."
                />

                <FormularioLogin
                    onEnviar={completarFormulario}
                />
            </div>
        </Container>
    );
}

export default Login;