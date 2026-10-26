function ImagenProducto({ producto, variante = "tarjeta" }) {
    const nombre = (producto?.nombre || "").toLowerCase();
    const categoria = producto?.categoria || "";

    let icono = "📦";

    if (nombre.includes("cemento") || nombre.includes("mortero")) {
        icono = "🏗️";
    } else if (nombre.includes("arena") || nombre.includes("ripio")) {
        icono = "🪨";
    } else if (nombre.includes("ladrillo") || nombre.includes("bloque")) {
        icono = "🧱";
    } else if (categoria === "Pinturas") {
        icono = "🎨";
    } else if (nombre.includes("martillo")) {
        icono = "🔨";
    } else if (
        nombre.includes("taladro") ||
        nombre.includes("atornillador")
    ) {
        icono = "🛠️";
    } else if (
        nombre.includes("serrucho") ||
        nombre.includes("sierra") ||
        nombre.includes("caladora")
    ) {
        icono = "🪚";
    } else if (
        nombre.includes("cable") ||
        nombre.includes("enchufe") ||
        nombre.includes("interruptor") ||
        categoria === "Electricidad"
    ) {
        icono = "⚡";
    } else if (
        nombre.includes("cañería") ||
        nombre.includes("grifería") ||
        nombre.includes("llave de paso")
    ) {
        icono = "🚰";
    } else if (categoria === "Tornillería") {
        icono = "🔩";
    } else if (categoria === "Madera") {
        icono = "🪵";
    } else if (nombre.includes("casco")) {
        icono = "👷";
    } else if (categoria === "Seguridad") {
        icono = "🦺";
    } else if (
        nombre.includes("manguera") ||
        nombre.includes("pistola de riego")
    ) {
        icono = "💧";
    } else if (categoria === "Jardín") {
        icono = "🌱";
    } else if (categoria === "Herramientas") {
        icono = "🛠️";
    } else if (categoria === "Gasfitería") {
        icono = "🔧";
    }

    const tamano = variante === "detalle" ? "6rem" : "3.5rem";

    return (
        <div
            className={`imagen-producto imagen-producto-${variante} d-flex align-items-center justify-content-center`}
            style={{ backgroundColor: "#f1f5f9" }}
            role="img"
            aria-label={`Representación de ${producto?.nombre || "producto"}`}
        >
            <span
                style={{ fontSize: tamano, lineHeight: 1 }}
                aria-hidden="true"
            >
                {icono}
            </span>
        </div>
    );
}

export default ImagenProducto;