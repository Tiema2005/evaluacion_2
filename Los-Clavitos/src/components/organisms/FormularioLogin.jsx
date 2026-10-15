import { useState } from "react";
import CampoInput from "../atoms/CampoInput";
import Boton from "../atoms/Boton";
import { validarCorreo, validarContrasena } from "../../utils/validaciones";

function FormularioLogin(props) {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [errores, setErrores] = useState({});

    function cambiarCorreo(evento) {
        setCorreo(evento.target.value);
    }

    function cambiarContrasena(evento) {
        setContrasena(evento.target.value);
    }

    function enviarFormulario(evento) {
        evento.preventDefault();

        const nuevosErrores = {
            correo: validarCorreo(correo),
            contrasena: validarContrasena(contrasena)
        };

        setErrores(nuevosErrores);

        if (nuevosErrores.correo || nuevosErrores.contrasena) {
            return;
        }

        props.onEnviar({ correo });
    }

    return (
        <form onSubmit={enviarFormulario} noValidate>
            <CampoInput
                id="correoLogin"
                label="Correo electrónico"
                tipo="email"
                name="correo"
                placeholder="ejemplo@correo.cl"
                value={correo}
                onChange={cambiarCorreo}
                errorTexto={errores.correo}
            />

            <CampoInput
                id="contrasenaLogin"
                label="Contraseña"
                tipo="password"
                name="contrasena"
                placeholder="Ingrese su contraseña"
                value={contrasena}
                onChange={cambiarContrasena}
                errorTexto={errores.contrasena}
            />

            <Boton
                texto="Continuar"
                variante="primary"
                tipo="submit"
            />
        </form>
    );
}

export default FormularioLogin;