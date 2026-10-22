import Boton from "../atoms/Boton";

function TarjetaCategoria(props) {
    return (
        <div className="card h-100">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                    {props.categoria}
                </h5>

                <div className="mt-auto">
                    <Boton
                        texto="Ver productos"
                        variante="primary"
                        onClick={props.onVerProductos}
                    />
                </div>
            </div>
        </div>
    );
}

export default TarjetaCategoria;