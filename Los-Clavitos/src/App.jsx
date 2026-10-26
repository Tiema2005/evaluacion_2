
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PlantillaPublica from "./components/templates/PlantillaPublica";

import Inicio from "./pages/Inicio";
import Catalogo from "./pages/catalogo/Catalogo";
import Categorias from "./pages/catalogo/Categorias";
import DetalleProducto from "./pages/catalogo/DetalleProducto";
import Carrito from "./pages/pedidos/Carrito";
import ConfirmarPedido from "./pages/pedidos/ConfirmarPedido";
import ResultadoPedido from "./pages/pedidos/ResultadoPedido";

import Login from "./pages/auth/Login";
import Registro from "./pages/auth/Registro";

import Nosotros from "./pages/Nosotros";
import Ofertas from "./pages/catalogo/Ofertas";
import Blog from "./pages/blog/Blog";
import DetalleArticulo from "./pages/blog/DetalleArticulo";
import Contacto from "./pages/Contacto";

import Administracion from "./pages/admin/Administracion";
import PanelAdministracion from "./pages/admin/PanelAdministracion";
import PedidosAdmin from "./pages/admin/PedidosAdmin";
import StockCritico from "./pages/admin/StockCritico";
import CategoriasAdmin from "./pages/admin/CategoriasAdmin";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import HistorialPedidos from "./pages/pedidos/HistorialPedidos";
import ReportesAdmin from "./pages/admin/ReportesAdmin";

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
                    <Route path="/historial" element={<HistorialPedidos />} />

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
                    <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
                    <Route path="/admin/reportes" element={<ReportesAdmin />} />
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
