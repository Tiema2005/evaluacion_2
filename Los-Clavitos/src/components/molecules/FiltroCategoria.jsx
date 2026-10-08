import Selector from "../atoms/Selector";

function FiltroCategoria(props) {
    return (
        <Selector
            id="filtroCategoria"
            label="Filtrar por categoría"
            placeholder="Todas las categorías"
            opciones={props.categorias}
            value={props.categoria}
            onChange={props.onCambiarCategoria}
        />
    );
}

export default FiltroCategoria;