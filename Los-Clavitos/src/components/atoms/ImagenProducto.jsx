import { obtenerImagenProducto } from "../../data/imagenesProductos";

function ImagenProducto({ producto, variante = "tarjeta" }) {
    const imagen = obtenerImagenProducto(producto);

    function mostrarAlternativa(evento) {
        // Evitar un bucle de errores si no está disponible la imagen externa.
        evento.currentTarget.onerror = null;
        evento.currentTarget.src = "/producto-sin-imagen.svg";
    }

    return (
        <img
            key={`${producto?.codigo}-${imagen}`}
            src={imagen || "/producto-sin-imagen.svg"}
            alt={`Imagen referencial de ${producto?.nombre ?? "producto"}`}
            className={`imagen-producto imagen-producto-${variante}`}
            loading="lazy"
            onError={mostrarAlternativa}
        />
    );
}

export default ImagenProducto;
