# Los Traba_jadores

- Felipe Escobar (fel.escobarl0819@gmail.com)
- Emanuel Toledo (emanvel.tldv@gmail.com)

## Caso
Ferretería-Los-Clavitos

## Descripción del Caso
Tienda en línea de artículos de construcción.
La aplicación permite iniciar sesión, explorar el catálogo, agregar productos
al carrito y, para el rol administrador, gestionar el catálogo.

## Estructura del Proyecto
├── public
│   ├── favicon.svg
│   └── icons.svg
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components
│   │   ├── atoms
│   │   │   ├── Boton.jsx
│   │   │   ├── CampoInput.jsx
│   │   │   ├── ContadorCantidad.jsx
│   │   │   ├── EtiquetaStock.jsx
│   │   │   ├── Precio.jsx
│   │   │   └── Selector.jsx
│   │   ├── molecules
│   │   │   ├── CampoFormulario.jsx
│   │   │   ├── FilaInventario.jsx
│   │   │   ├── FiltroCategoria.jsx
│   │   │   ├── ItemCarrito.jsx
│   │   │   └── TarjetaProducto.jsx
│   │   ├── organisms
│   │   │   ├── CatalogoProductos.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   └── templates
│   │       └── PlantillaPublica.jsx
│   ├── context
│   │   └── ProductosContext.jsx
│   ├── data
│   │   └── productos.json
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── Catalogo.jsx
│   │   └── Inicio.jsx
│   ├── services
│   │   └── productoService.js
│   └── utils
│       └── stockUtils.js

## Tecnologías
- React + Vite
- React Bootstrap

## ¿Cómo Ejecutar el Proyecto?
npm install
npm run dev

## Material Complementario
Carpeta de Drive con documentos del semestre (ERS y otros):
[(https://drive.google.com/drive/folders/1qvCGlIiXOxQ2mrF8SrRwWkNOPHU4Lvop?usp=sharing)](https://drive.google.com/drive/folders/1qvCGlIiXOxQ2mrF8SrRwWkNOPHU4Lvop?usp=sharing)

## Bitácora de Desarrollo

Esta sección registra los avances diarios del proyecto, identificando las tareas realizadas por cada integrante, los problemas encontrados y las soluciones aplicadas. Su objetivo es mantener un historial del trabajo del equipo y complementar los commits realizados en GitHub en caso de errores.

### 08/10/26 — Felipe Escobar

**Trabajo realizado:**
- Integración del catálogo de productos utilizando los datos provenientes del Excel.
- Implementación de tarjetas de productos reutilizables mediante Atomic Design.
- Conexión de `CatalogoProductos` y `Catalogo` con `ProductosContext`.
- Corrección de las páginas Inicio y Catálogo.
- Ajustes de estilos generales en `index.css`.
- Comprobación del diseño responsive en escritorio y móvil.
- Configuración de una muestra inicial de 12 productos.

**Problemas encontrados:**
- Inicialmente no se mostraban las tarjetas en la página Catálogo.
- Los estilos predeterminados de `index.css` afectaban la distribución de la interfaz.

**Soluciones aplicadas:**
- Se verificó la carga de productos y se completó la conexión entre los componentes.
- Se simplificaron los estilos generales para permitir que Bootstrap controle correctamente la distribución responsive.

### 08/10/26 - Emanuel Toledo

**Trabajo Realizado:**
- Implementación de la molécula CampoFormulario.jsx, reutilizando los átomos CampoInput y Selector.
- Creación de FiltroCategoria.jsx para agregar un selector de categorías en la parte superior del catálogo.
- Integración del filtro en Catalogo.jsx utilizando useState para gestionar la categoría seleccionada.
- Ajustamos la visualización del catálogo a un máximo de 9 productos, generando que al seleccionar un catálogo, independientemente de que tenga >= 9 solo se mostraran 9 productos.
- Comprobamos que la compilación del proyecto funcionara correctamente usando npm run build desde la terminal de AWS.

**Soluciones aplicadas:**
- Se comprobó que el filtro funciona correctamente y que el catálogo mantiene el límite de 9 productos visibles.
