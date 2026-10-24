import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlantillaPublica from "./components/templates/PlantillaPublica";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Categorias from "./pages/Categorias";
import DetalleProducto from "./pages/DetalleProducto";
import Login from "./pages/Login";
import Carrito from "./pages/Carrito";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PlantillaPublica />}>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/producto/:codigo" element={<DetalleProducto />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/carrito" element={<Carrito />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;