import Boton from "../atoms/Boton";
import EtiquetaStock from "../atoms/EtiquetaStock";
import Precio from "../atoms/Precio";

function TarjetaProducto({ producto }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>

        <Precio precio={producto.precio} />

        <div className="my-3">
          <EtiquetaStock
            stock={producto.stock}
            stockMinimo={producto.stockMinimo}
          />
        </div>

        <Boton
          texto="Ver producto"
          variante="primary"
          onClick={() => console.log(producto.id)}
        />
      </div>
    </div>
  );
}

export default TarjetaProducto;