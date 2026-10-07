function Boton(props) {
    const variante = props.variante || "primary";
    const tipo = props.tipo || "button";

    return (
        <button
            className={`btn btn-${variante}`}
            type={tipo}
            onClick={props.onClick}
            disabled={props.deshabilitado}
        >
            {props.texto}
        </button>
    );
}

export default Boton;