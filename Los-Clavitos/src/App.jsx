import Inicio from "./pages/Inicio";
import './App.css';

const mascotas = [
  { id: 1, nombre: "Firulais", especie: "Perro" },
  { id: 2, nombre: "Michi", especie: "Gato" },
  { id: 3, nombre: "Coco", especie: "Loro" },
];

function App() {
  return <Inicio mascotas={mascotas} />;
}

export default App;