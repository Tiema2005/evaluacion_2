import { useState } from "react";
import CampoInput from "../atoms/CampoInput";
import Selector from "../atoms/Selector";
import Boton from "../atoms/Boton";
import { validarDatosPedido } from "../../utils/validacionesPedido";

function FormularioPedido(props) {
    const [datos, setDatos] = useState({
        nombre: "",
        apellidos: "",
        correo: "",
        tipoEntrega: "Retiro en tienda",
        direccion: ""
    });

    const [errores, setErrores] = useState({});

    function cambiarCampo(evento) {
        const { name, value } = evento.target;

        setDatos((anteriores) => ({
            ...anteriores,
            [name]: value
        }));
    }

    function cambiarEntrega(evento) {
        setDatos((anteriores) => ({
            ...anteriores,
            tipoEntrega: evento.target.value,
            direccion: ""
        }));

        setErrores({});
    }

    function enviarFormulario(evento) {
        evento.preventDefault();

        const nuevosErrores = validarDatosPedido(datos);

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            return;
        }

        // La página se encargará de registrar el pedido.
        props.onEnviar(datos);
    }

    return (
        <form onSubmit={enviarFormulario} noValidate>
            <h4 className="mb-3">Datos del cliente</h4>

            <CampoInput
                id="nombrePedido"
                name="nombre"
                label="Nombre"
                placeholder="Ingrese su nombre"
                value={datos.nombre}
                onChange={cambiarCampo}
                errorTexto={errores.nombre}
            />

            <CampoInput
                id="apellidosPedido"
                name="apellidos"
                label="Apellidos"
                placeholder="Ingrese sus apellidos"
                value={datos.apellidos}
                onChange={cambiarCampo}
                errorTexto={errores.apellidos}
            />

            <CampoInput
                id="correoPedido"
                name="correo"
                tipo="email"
                label="Correo electrónico"
                placeholder="ejemplo@correo.cl"
                value={datos.correo}
                onChange={cambiarCampo}
                errorTexto={errores.correo}
            />

            <h4 className="mb-3 mt-4">Información de entrega</h4>

            <Selector
                id="tipoEntregaPedido"
                label="Tipo de entrega"
                placeholder="Seleccione una opción"
                opciones={[
                    "Retiro en tienda",
                    "Despacho a domicilio"
                ]}
                value={datos.tipoEntrega}
                onChange={cambiarEntrega}
            />

            {errores.tipoEntrega && (
                <p className="text-danger">
                    {errores.tipoEntrega}
                </p>
            )}

            {datos.tipoEntrega === "Despacho a domicilio" && (
                <CampoInput
                    id="direccionPedido"
                    name="direccion"
                    label="Dirección de despacho"
                    placeholder="Ingrese su dirección"
                    value={datos.direccion}
                    onChange={cambiarCampo}
                    errorTexto={errores.direccion}
                />
            )}

            <Boton
                texto="Confirmar pedido"
                variante="success"
                tipo="submit"
                deshabilitado={props.procesando}
            />
        </form>
    );
}

export default FormularioPedido;