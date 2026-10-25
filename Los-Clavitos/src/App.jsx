
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PlantillaPublica from "./components/templates/PlantillaPublica";

import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Categorias from "./pages/Categorias";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import ConfirmarPedido from "./pages/ConfirmarPedido";
import ResultadoPedido from "./pages/ResultadoPedido";

import Login from "./pages/Login";
import Registro from "./pages/Registro";

import Nosotros from "./pages/Nosotros";
import Ofertas from "./pages/Ofertas";
import Blog from "./pages/Blog";
import DetalleArticulo from "./pages/DetalleArticulo";
import Contacto from "./pages/Contacto";

import Administracion from "./pages/Administracion";
import PanelAdministracion from "./pages/PanelAdministracion";
import PedidosAdmin from "./pages/PedidosAdmin";
import StockCritico from "./pages/StockCritico";
import CategoriasAdmin from "./pages/CategoriasAdmin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PlantillaPublica />}>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route
                        path="/producto/:codigo"
                        element={<DetalleProducto />}
                    />

                    <Route path="/carrito" element={<Carrito />} />
                    <Route
                        path="/confirmar-pedido"
                        element={<ConfirmarPedido />}
                    />
                    <Route
                        path="/pedido/:numero"
                        element={<ResultadoPedido />}
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />

                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/ofertas" element={<Ofertas />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route
                        path="/blog/:id"
                        element={<DetalleArticulo />}
                    />
                    <Route path="/contacto" element={<Contacto />} />

                    <Route
                        path="/admin"
                        element={<PanelAdministracion />}
                    />
                    <Route
                        path="/admin/pedidos"
                        element={<PedidosAdmin />}
                    />
                    <Route
                        path="/admin/stock-critico"
                        element={<StockCritico />}
                    />
                    <Route
                        path="/admin/categorias"
                        element={<CategoriasAdmin />}
                    />
                    <Route
                        path="/administracion"
                        element={<Administracion />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
