import { Badge } from "react-bootstrap";

function EtiquetaStock({ stock = 0, stockMinimo = 5 }) {
    let texto;
    let variante;
    if (stock <= 0) {texto = "Sin stock"; variante = "danger";
    } else if (stock <= stockMinimo) {
    texto = "Stock bajo";
    variante = "warning";
    } else {
    texto = "Disponible";
    variante = "success";
}

  return (
    <Badge bg={variante}>
      {texto} ({stock})
    </Badge>
  );
}

export default EtiquetaStock;