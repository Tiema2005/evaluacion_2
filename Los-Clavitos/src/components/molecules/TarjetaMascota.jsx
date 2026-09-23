import Boton from "../atoms/Boton";

function TarjetaMascota(props) {
  return (
    <div className="card p-3">
      <h5>{props.nombre}</h5>
      <p>{props.especie}</p>
      <Boton texto="Seguir" onClick={props.onSeguir} />
    </div>
  );
}

export default TarjetaMascota;