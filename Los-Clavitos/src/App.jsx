import { BrowserRouter, Routes, Route } from "react-router-dom";

import PlantillaPublica from "./components/templates/PlantillaPublica";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PlantillaPublica />}>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;