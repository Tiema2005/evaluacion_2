import { useState } from "react";
import { Container, Row, Col, Form, Table, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Boton from "../../components/atoms/Boton";
import EncabezadoPagina from "../../components/molecules/EncabezadoPagina";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import {
    listarUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    ROLES
} from "../../services/usuarioService";

const VACIO = {
    nombre: "", apellidos: "", correo: "", rol: "Cliente", cuentaCorriente: false
};

function UsuariosAdmin() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState(listarUsuarios);
    const [datos, setDatos] = useState({ ...VACIO });
    const [editando, setEditando] = useState(null);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [pendienteEliminar, setPendienteEliminar] = useState(null);
    useTituloPagina("Administración de usuarios");

    function actualizarVista() {
        setUsuarios(listarUsuarios());
    }

    function cambiar(evento) {
        const { name, value, type, checked } = evento.target;
        setDatos((previo) => ({
            ...previo,
            [name]: type === "checkbox" ? checked : value,
            ...(name === "rol" && value !== "Cliente" ? { cuentaCorriente: false } : {})
        }));
    }

    function cancelar() {
        setEditando(null);
        setDatos({ ...VACIO });
        setError("");
    }

    function guardar(evento) {
        evento.preventDefault();
        setError("");
        setMensaje("");
        try {
            if (editando) {
                actualizarUsuario(editando, datos);
                setMensaje("Usuario actualizado correctamente.");
            } else {
                crearUsuario(datos);
                setMensaje("Usuario creado correctamente.");
            }
            actualizarVista();
            setEditando(null);
            setDatos({ ...VACIO });
        } catch (fallo) {
            setError(fallo.message);
        }
    }

    function editar(usuario) {
        setDatos({ ...usuario });
        setEditando(usuario.correo);
        setError("");
        setMensaje("");
    }

    function quitar() {
        if (!pendienteEliminar) return;
        try {
            eliminarUsuario(pendienteEliminar);
            actualizarVista();
            if (editando === pendienteEliminar) cancelar();
            setMensaje("Usuario eliminado. Sus pedidos anteriores se conservan.");
            setError("");
            setPendienteEliminar(null);
        } catch (fallo) {
            setError(fallo.message);
        }
    }

    return (
        <Container className="py-4">
            <EncabezadoPagina
                titulo="Administración de usuarios"
                descripcion="Gestiona perfiles y roles simulados; no se almacenan contraseñas ni se conceden permisos reales."
            />
            <div className="mb-4">
                <Boton texto="Volver al panel" variante="secondary" onClick={() => navigate("/admin")} />
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {mensaje && <Alert variant="success">{mensaje}</Alert>}
            {pendienteEliminar && (
                <Alert variant="warning">
                    <p>¿Eliminar el perfil <strong>{pendienteEliminar}</strong>? Los pedidos registrados se conservarán.</p>
                    <div className="d-flex gap-2 flex-wrap">
                        <Boton texto="Confirmar eliminación" variante="danger" onClick={quitar} />
                        <Boton texto="Cancelar" variante="secondary" onClick={() => setPendienteEliminar(null)} />
                    </div>
                </Alert>
            )}

            <section className="card mb-4">
                <div className="card-body p-4">
                    <h2 className="h5 fw-bold mb-3">{editando ? "Editar perfil" : "Nuevo perfil"}</h2>
                    <Form onSubmit={guardar}>
                        <Row className="g-3">
                            <Col xs={12} md={6}>
                                <Form.Label htmlFor="usuarioNombre">Nombre</Form.Label>
                                <Form.Control id="usuarioNombre" name="nombre" value={datos.nombre} onChange={cambiar} required />
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Label htmlFor="usuarioApellidos">Apellidos</Form.Label>
                                <Form.Control id="usuarioApellidos" name="apellidos" value={datos.apellidos} onChange={cambiar} required />
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Label htmlFor="usuarioCorreo">Correo electrónico</Form.Label>
                                <Form.Control id="usuarioCorreo" type="email" name="correo" value={datos.correo} onChange={cambiar} required />
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Label htmlFor="usuarioRol">Rol (simulado)</Form.Label>
                                <Form.Select id="usuarioRol" name="rol" value={datos.rol} onChange={cambiar}>
                                    {ROLES.map((rol) => <option key={rol} value={rol}>{rol}</option>)}
                                </Form.Select>
                            </Col>
                            {datos.rol === "Cliente" && (
                                <Col xs={12}>
                                    <Form.Check
                                        type="checkbox"
                                        id="cuentaCorrienteUsuario"
                                        label="Cuenta corriente habilitada (simulación)"
                                        name="cuentaCorriente"
                                        checked={datos.cuentaCorriente}
                                        onChange={cambiar}
                                    />
                                </Col>
                            )}
                        </Row>
                        <div className="d-flex flex-wrap gap-2 mt-4">
                            <Boton tipo="submit" texto={editando ? "Guardar cambios" : "Crear perfil"} />
                            {editando && <Boton texto="Cancelar" variante="secondary" onClick={cancelar} />}
                        </div>
                    </Form>
                </div>
            </section>

            <h2 className="h5 fw-bold mb-3">Perfiles registrados ({usuarios.length})</h2>
            {usuarios.length === 0 ? (
                <p>No hay perfiles registrados.</p>
            ) : (
                <Table responsive striped bordered hover>
                    <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Cuenta corriente</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.correo}>
                                <td>{usuario.nombre} {usuario.apellidos}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.rol}</td>
                                <td>{usuario.cuentaCorriente ? "Sí" : "No"}</td>
                                <td>
                                    <div className="d-flex flex-wrap gap-2">
                                        <Boton texto="Editar" variante="outline-primary" onClick={() => editar(usuario)} />
                                        <Boton texto="Historial" variante="outline-secondary" onClick={() => navigate(`/historial?correo=${encodeURIComponent(usuario.correo)}`)} />
                                        <Boton texto="Eliminar" variante="outline-danger" onClick={() => setPendienteEliminar(usuario.correo)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default UsuariosAdmin;
