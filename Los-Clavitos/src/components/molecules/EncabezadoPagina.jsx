function EncabezadoPagina({ titulo, descripcion }) {
    return (
        <header className="encabezado-pagina mb-4">
            <h1 className="mb-2">{titulo}</h1>
            {descripcion && (
                <p className="text-secondary mb-0">{descripcion}</p>
            )}
        </header>
    );
}

export default EncabezadoPagina;
