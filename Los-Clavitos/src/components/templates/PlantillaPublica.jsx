import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function PlantillaPublica() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar nombre="Ferretería Los Maestros" />

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