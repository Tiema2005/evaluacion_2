import Precio from "../atoms/Precio";

function ResumenPedido({
    items,
    total,
    titulo = "Resumen del pedido"
}) {
    return (
        <section>
            <h2 className="h5 fw-bold mb-3">
                {titulo}
            </h2>

            {items.map((item) => (
                <div
                    key={item.codigo}
                    className="mb-3 pb-3 border-bottom"
                >
                    <p className="fw-semibold mb-1">
                        {item.nombre}
                    </p>

                    <div className="d-flex justify-content-between gap-3">
                        <span className="text-secondary">
                            Cantidad: {item.cantidad}
                        </span>

                        <Precio precio={item.subtotal} />
                    </div>
                </div>
            ))}

            <div className="d-flex justify-content-between align-items-center gap-3">
                <strong>Total del pedido</strong>
                <Precio precio={total} />
            </div>
        </section>
    );
}

export default ResumenPedido;