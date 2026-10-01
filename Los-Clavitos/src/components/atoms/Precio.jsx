function Precio({ precio = 0 }) {
  const precioFormateado = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(precio) || 0);

  return (
    <span className="fw-bold text-primary">
      {precioFormateado}
    </span>
  );
}

export default Precio;