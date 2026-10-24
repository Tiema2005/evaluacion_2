import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function PlantillaPublica() {
    const enlaces = [
        { texto: "Inicio", ruta: "/" },
        { texto: "Catálogo", ruta: "/catalogo" },
        { texto: "Categorías", ruta: "/categorias" },
        { texto: "Carrito", ruta: "/carrito" },
        { texto: "Administración", ruta: "/administracion" },
        { texto: "Registrarse", ruta: "/registro" },
        { texto: "Iniciar Sesión", ruta: "/login" }
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar
                nombre="Ferretería Los Maestros"
                enlaces={enlaces}
            />

            <main className="flex-grow-1">
                <Outlet />
            </main>

            <Footer
                nombre="Ferretería Los Maestros"
                descripcion="Materiales y herramientas para tus proyectos"
            />
        </div>
    );
}

export default PlantillaPublica;