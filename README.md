# Los Traba_jadores

**Integrantes:**
- Felipe Escobar (fel.escobarl0819@gmail.com)
- Emanuel Toledo (emanvel.tldv@gmail.com)

## Caso

Ferretería-Los-Clavitos

## Descripción del Caso

Desarrollo de una tienda en línea para la Ferretería Los Maestros, dedicada a la venta de materiales de construcción, herramientas y artículos de ferretería.

Actualmente, la aplicación permite:

- Navegar entre Inicio, Catálogo, Detalle de producto e Inicio de sesión.
- Visualizar productos provenientes del archivo Excel proporcionado para el caso.
- Buscar productos por nombre o código.
- Filtrar productos por categoría.
- Consultar precios y estados de stock.
- Completar un formulario demostrativo con validaciones y navegación.
- Gestionar productos mediante un servicio CRUD conectado con React Context y almacenamiento local.

El inicio de sesión actual es demostrativo: valida los campos, pero no realiza autenticación real.

En próximas etapas se desarrollarán funcionalidades como carrito, pedidos y administración de inventario.

## Estructura del Proyecto

La estructura principal de `src` es:

- **components/**
  - **atoms/**: `Boton.jsx`, `CampoInput.jsx`, `ContadorCantidad.jsx`, `EtiquetaStock.jsx`, `Precio.jsx`, `Selector.jsx`.
  - **molecules/**: `CampoFormulario.jsx`, `FilaInventario.jsx`, `FiltroCategoria.jsx`, `ItemCarrito.jsx`, `TarjetaProducto.jsx`.
  - **organisms/**: `CatalogoProductos.jsx`, `Footer.jsx`, `FormularioLogin.jsx`, `Navbar.jsx`.
  - **templates/**: `PlantillaPublica.jsx`.
- **context/**: `ProductosContext.jsx`, `ProductosProvider.jsx`.
- **data/**: `productos.json`.
- **hooks/**: `useTituloPagina.js`.
- **pages/**: `Inicio.jsx`, `Catalogo.jsx`, `DetalleProducto.jsx`, `Login.jsx`.
- **services/**: `productoService.js`.
- **utils/**: `stockUtils.js`, `validaciones.js`.
- **Archivos principales**: `App.jsx`, `App.css`, `index.css`, `main.jsx`.

Algunos componentes de inventario y carrito están reservados para etapas posteriores.

## Tecnologías

- React + Vite.
- JavaScript y JSX.
- React Bootstrap y Bootstrap.
- React Router DOM.
- React Context API.
- localStorage.
- ESLint.
- Atomic Design como metodología de organización de componentes.

## ¿Cómo ejecutar el proyecto?

**1. Instalar las dependencias:**

`npm install`

**2. Iniciar el servidor de desarrollo:**

`npm run dev`

**3. Verificar el código con ESLint:**

`npm run lint`

**4. Generar la versión de producción:**

`npm run build`

La aplicación puede abrirse mediante la dirección local indicada por Vite en la terminal.

## Material Complementario

Carpeta de Drive con documentos del semestre (ERS y otros):

[Material complementario en Google Drive](https://drive.google.com/drive/folders/1qvCGlIiXOxQ2mrF8SrRwWkNOPHU4Lvop?usp=sharing)

## Bitácora de Desarrollo

Esta sección registra los avances diarios del proyecto, identificando las tareas realizadas por cada integrante, los problemas encontrados y las soluciones aplicadas. Su objetivo es mantener un historial del trabajo del equipo y complementar los commits realizados en GitHub.

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

### 08/10/26 — Emanuel Toledo

**Trabajo realizado:**
- Implementación de la molécula `CampoFormulario.jsx`, reutilizando los átomos `CampoInput` y `Selector`.
- Creación de `FiltroCategoria.jsx` para agregar un selector de categorías.
- Trabajo de integración del filtro mediante `useState`.
- Ajuste de la visualización del catálogo a un máximo de 9 productos durante esa etapa.
- Comprobación de la compilación del proyecto mediante `npm run build` desde la terminal de AWS.

**Soluciones aplicadas:**
- Se comprobó el funcionamiento del filtro y el límite de productos visibles utilizado en esa etapa.

### 14/10/26 — Felipe Escobar

**Trabajo realizado:**
- Revisión de los componentes del proyecto para mantener una estructura coherente con Atomic Design y el uso de props.
- Mejora de `productoService.js` para validar la información recuperada desde `localStorage`.
- Separación de responsabilidades entre `ProductosContext.jsx` y `ProductosProvider.jsx`.
- Actualización de las importaciones del Provider en `main.jsx`.
- Integración del filtro por categoría y del buscador por nombre o código en `Catalogo.jsx`.
- Implementación de funciones reutilizables para validar correo electrónico y contraseña.
- Creación de `FormularioLogin.jsx` utilizando componentes controlados y mensajes de error.
- Creación de `Login.jsx` e integración del formulario con React Router.
- Incorporación de la ruta `/login` y del enlace correspondiente en el Navbar.
- Comprobación de la navegación, las validaciones, el catálogo y el detalle de productos.
- Ejecución de `npm run lint` sin errores ni advertencias.

**Problemas encontrados:**
- Los datos almacenados anteriormente en un navegador podían tener una estructura incompatible con el catálogo.
- ESLint mostró una advertencia relacionada con la organización del Context y el Provider.

**Soluciones aplicadas:**
- Se agregó validación de los datos de `localStorage` y recuperación del catálogo inicial cuando los datos son inválidos.
- Se reorganizó el Context y el Provider para separar responsabilidades.
- Se comprobaron las validaciones del formulario y la navegación hacia el catálogo.
- Se verificó el funcionamiento de la aplicación después de los cambios.
