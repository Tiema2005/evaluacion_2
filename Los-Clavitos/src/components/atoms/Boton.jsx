function Boton(props) {
    const variante = props.variante || "primary";
    const tipo = props.tipo || props.type || "button";
    const deshabilitado = props.deshabilitado ?? props.disabled ?? false;

    return (
        <button
            className={`btn btn-${variante}`}
            type={tipo}
            onClick={props.onClick}
            disabled={deshabilitado}
        >
            {props.texto}
        </button>
    );
}

export default Boton;