import CampoInput from "../atoms/CampoInput";
import Selector from "../atoms/Selector";

function CampoFormulario(props) {
    return (
        <div className="row">
            <div className="col-md-6">
                <CampoInput
                    id="nombreProducto"
                    label="Nombre del producto"
                    placeholder="Ingrese el nombre"
                    value={props.nombre}
                    onChange={props.onCambiarNombre}
                />
            </div>

            <div className="col-md-6">
                <Selector
                    id="categoriaProducto"
                    label="Categoría"
                    opciones={props.categorias}
                    value={props.categoria}
                    onChange={props.onCambiarCategoria}
                />
            </div>
        </div>
    );
}

export default CampoFormulario;