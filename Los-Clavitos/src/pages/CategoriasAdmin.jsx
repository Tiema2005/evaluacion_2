
import { useMemo, useState } from "react";
import {
    Alert,
    Container,
    Form,
    Table
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useProductos } from "../context/ProductosContext";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";

import {
    listarCategorias,
    crearCategoria,
    renombrarCategoria,
    eliminarCategoria
} from "../services/categoriaService";

function CategoriasAdmin() {
    const navigate = useNavigate();

    const { productos, actualizar } = useProductos();

    const [nombreNuevo, setNombreNuevo] = useState("");
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [nombreEditado, setNombreEditado] = useState("");
    const [revision, setRevision] = useState(0);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    useTituloPagina("Administración de categorías");

    const categorias = useMemo(
        () => listarCategorias(productos),
        [productos, revision]
    );

    function limpiarMensajes() {
        setMensaje("");
        setError("");
    }

    function guardarNuevaCategoria(evento) {
        evento.preventDefault();
        limpiarMensajes();

        try {
            crearCategoria(nombreNuevo, productos);

            setNombreNuevo("");
            setRevision((anterior) => anterior + 1);
            setMensaje("Categoría creada correctamente.");
        } catch (errorOperacion) {
            setError(errorOperacion.message);
        }
    }

    function comenzarEdicion(nombre) {
        setCategoriaEditando(nombre);
        setNombreEditado(nombre);
        limpiarMensajes();
    }

    function cancelarEdicion() {
        setCategoriaEditando(null);
        setNombreEditado("");
        limpiarMensajes();
    }

    function guardarEdicion(evento) {
        evento.preventDefault();
        limpiarMensajes();

        try {
            renombrarCategoria(
                categoriaEditando,
                nombreEditado,
                productos,
                actualizar
            );

            setCategoriaEditando(null);
            setNombreEditado("");
            setRevision((anterior) => anterior + 1);
            setMensaje("Categoría actualizada correctamente.");
        } catch (errorOperacion) {
            setError(errorOperacion.message);
        }
    }

    function eliminar(nombre) {
        limpiarMensajes();

        try {
            eliminarCategoria(nombre, productos);

            setRevision((anterior) => anterior + 1);
            setMensaje("Categoría eliminada correctamente.");
        } catch (errorOperacion) {
            setError(errorOperacion.message);
        }
    }

    return (
        <Container className="py-4">
            <h1>Administración de categorías</h1>

            <p>
                Gestiona las categorías utilizadas en el
                catálogo de Ferretería Los Maestros.
            </p>

            <div className="mb-4">
                <Boton
                    texto="Volver al panel"
                    variante="secondary"
                    onClick={() => navigate("/admin")}
                />
            </div>

            {mensaje && (
                <Alert variant="success">
                    {mensaje}
                </Alert>
            )}

            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            <div className="card mb-4">
                <div className="card-body">
                    <h2 className="h4">
                        Nueva categoría
                    </h2>

                    <Form onSubmit={guardarNuevaCategoria}>
                        <Form.Group
                            className="mb-3"
                            controlId="nuevaCategoria"
                        >
                            <Form.Label>
                                Nombre de la categoría
                            </Form.Label>

                            <Form.Control
                                type="text"
                                value={nombreNuevo}
                                onChange={(evento) =>
                                    setNombreNuevo(evento.target.value)
                                }
                                placeholder="Ejemplo: Herramientas manuales"
                                required
                            />
                        </Form.Group>

                        <Boton
                            texto="Crear categoría"
                            variante="primary"
                            type="submit"
                        />
                    </Form>
                </div>
            </div>

            <h2 className="h4">
                Categorías registradas
            </h2>

            <p>
                <strong>Total de categorías:</strong>{" "}
                {categorias.length}
            </p>

            {categorias.length === 0 ? (
                <p>No hay categorías registradas.</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Productos asociados</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.nombre}>
                                <td>{categoria.nombre}</td>

                                <td>{categoria.cantidad}</td>

                                <td>
                                    <div className="d-flex flex-wrap gap-2">
                                        <Boton
                                            texto="Editar"
                                            variante="outline-primary"
                                            onClick={() =>
                                                comenzarEdicion(
                                                    categoria.nombre
                                                )
                                            }
                                        />

                                        <Boton
                                            texto="Eliminar"
                                            variante="outline-danger"
                                            disabled={
                                                categoria.cantidad > 0
                                            }
                                            onClick={() =>
                                                eliminar(categoria.nombre)
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {categoriaEditando !== null && (
                <div className="card mt-4">
                    <div className="card-body">
                        <h2 className="h4">
                            Editar categoría
                        </h2>

                        <p>
                            Categoría seleccionada:{" "}
                            <strong>{categoriaEditando}</strong>
                        </p>

                        <Form onSubmit={guardarEdicion}>
                            <Form.Group
                                className="mb-3"
                                controlId="editarCategoria"
                            >
                                <Form.Label>
                                    Nuevo nombre
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={nombreEditado}
                                    onChange={(evento) =>
                                        setNombreEditado(
                                            evento.target.value
                                        )
                                    }
                                    required
                                />
                            </Form.Group>

                            <div className="d-flex flex-wrap gap-2">
                                <Boton
                                    texto="Guardar cambios"
                                    variante="primary"
                                    type="submit"
                                />

                                <Boton
                                    texto="Cancelar"
                                    variante="secondary"
                                    onClick={cancelarEdicion}
                                />
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default CategoriasAdmin;
