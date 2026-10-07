function Precio(props) {
    const precio = props.precio ?? 0;

    const precioFormateado = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    }).format(Number(precio));

    return (
        <span className="fw-bold">
            {precioFormateado}
        </span>
    );
}

export default Precio;