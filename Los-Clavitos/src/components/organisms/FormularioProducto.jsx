import Selector from "../atoms/Selector";
import CampoInput from "../atoms/CampoInput";
import Boton from "../atoms/Boton";

function FormularioProducto(props) {
    const producto = props.producto;

    return (
        <form onSubmit={props.onGuardar}>
            <h4 className="mb-3">
                {props.editando
                    ? "Editar producto"
                    : "Nuevo producto"}
            </h4>

            <div className="row">
                <div className="col-md-6">
                    <CampoInput
                        id="codigoInventario"
                        name="codigo"
                        label="Código"
                        value={producto.codigo}
                        onChange={props.onCambiar}
                        deshabilitado={props.editando}
                    />
                </div>

                <div className="col-md-6">
                    <CampoInput
                        id="nombreInventario"
                        name="nombre"
                        label="Nombre del producto"
                        value={producto.nombre}
                        onChange={props.onCambiar}
                    />
                </div>

                <div className="col-md-6">
                    <Selector
                        id="categoriaInventario"
                        label="Categoría"
                        name="categoria"
                        opciones={props.categorias ?? []}
                        value={producto.categoria}
                        onChange={props.onCambiar}
                    />
                </div>

                <div className="col-md-6">
                    <CampoInput
                        id="subcategoriaInventario"
                        name="subcategoria"
                        label="Subcategoría"
                        value={producto.subcategoria}
                        onChange={props.onCambiar}
                    />
                </div>

                <div className="col-md-6">
                    <CampoInput
                        id="marcaInventario"
                        name="marca"
                        label="Marca"
                        value={producto.marca}
                        onChange={props.onCambiar}
                    />
                </div>

                <div className="col-md-6">
                    <CampoInput
                        id="unidadInventario"
                        name="unidad"
                        label="Unidad de medida"
                        value={producto.unidad}
                        onChange={props.onCambiar}
                    />
                </div>

                <div className="col-md-6">
                    <CampoInput
                        id="precioCompraInventario"
                        name="precioCompra"
                        label="Precio de compra"
                        tipo="number"
                        value={producto.precioCompra}
                        onChange={props.onCambiar}
                    />
                </div>

                <div className="col-md-6">
                    <CampoInput
                        id="precioVentaInventario"
                        name="precioVenta"
                        label="Precio de venta"
                        tipo="number"
                        value={producto.precioVenta}
                        onChange={props.onCambiar}
                    />
                </div>

                <div className="col-md-6">
                    <CampoInput
                        id="stockInventario"
                        name="stock"
                        label="Stock disponible"
                        tipo="number"
                        value={producto.stock}
                        onChange={props.onCambiar}
                    />
                </div>

                <div className="col-md-6">
                    <CampoInput
                        id="stockMinimoInventario"
                        name="stockMinimo"
                        label="Stock mínimo"
                        tipo="number"
                        value={producto.stockMinimo}
                        onChange={props.onCambiar}
                    />
                </div>
            </div>

            <CampoInput
                id="imagenInventario"
                name="imagen"
                label="Imagen del producto (URL opcional)"
                placeholder="https://ejemplo.cl/imagen.jpg"
                value={producto.imagen ?? ""}
                onChange={props.onCambiar}
            />

            <div className="d-flex flex-wrap gap-2">
                <Boton
                    texto={
                        props.editando
                            ? "Guardar cambios"
                            : "Crear producto"
                    }
                    variante="success"
                    tipo="submit"
                />

                <Boton
                    texto="Cancelar"
                    variante="secondary"
                    onClick={props.onCancelar}
                />
            </div>
        </form>
    );
}

export default FormularioProducto;