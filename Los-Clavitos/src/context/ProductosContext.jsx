// ProductosContext: el puente entre el service (los datos) y las pantallas (React).
// Un "context" es una caja compartida: cualquier componente puede leerla sin que se
// la pasen por props uno a uno, y todos ven siempre lo mismo.

// createContext crea la caja; useContext sirve para abrirla; useState guarda datos
// que, al cambiar, hacen que React vuelva a dibujar la pantalla.
import { createContext, useContext, useState } from 'react'

// "* as productoService" trae TODAS las funciones exportadas del service juntas:
// se usan como productoService.listarProductos(), productoService.crearProducto()...
import * as productoService from '../services/productoService'

// Creamos la caja vacía. null es el valor por defecto si alguien la usa sin proveedor.
const ProductosContext = createContext(null)

// ProductosProvider es el componente que "llena" la caja. Todo lo que quede DENTRO de
// él podrá leerla. "children" es justamente ese contenido interno.
export function ProductosProvider({ children }) {
  // useState devuelve dos cosas: el valor actual (productos) y una función para
  // cambiarlo (setProductos). Le pasamos una función flecha () => ... para que la lista
  // se lea del service solo la primera vez, no en cada dibujo de la pantalla.
  const [productos, setProductos] = useState(() => productoService.listarProductos())

  // Cada función hace dos cosas: 1) pide el cambio al service, que lo guarda, y
  // 2) vuelve a leer la lista y se la entrega a setProductos. Al cambiar el estado,
  // React redibuja y todas las pantallas muestran la lista nueva.
  function crear(datos) {
    productoService.crearProducto(datos)
    setProductos(productoService.listarProductos())
  }

  function actualizar(codigo, cambios) {
    productoService.actualizarProducto(codigo, cambios);
    setProductos(productoService.listarProductos());
}

  function eliminar(codigo) {
    productoService.eliminarProducto(codigo);
    setProductos(productoService.listarProductos());
}

  // Sirve para refrescar la lista cuando otro service cambió los datos por su cuenta
  // (por ejemplo, al comprar baja el stock).
  function recargar() {
    setProductos(productoService.listarProductos())
  }

  // value={{ ... }}: las llaves de afuera abren código JavaScript dentro del JSX y las
  // de adentro forman un objeto. Es todo lo que la caja ofrece a quien la abra.
  return (
    <ProductosContext.Provider value={{ productos, crear, actualizar, eliminar, recargar }}>
      {children}
    </ProductosContext.Provider>
  )
}

// useProductos es un "hook" propio: abre la caja con useContext. Desde cualquier
// componente se usa así: const { productos, crear } = useProductos()
export function useProductos() {
  const contexto = useContext(ProductosContext)
  if (!contexto) {
    throw new Error('useProductos debe usarse dentro de un ProductosProvider')
  }
  return contexto
}