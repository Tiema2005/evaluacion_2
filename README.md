# Los Traba_jadores

**Integrantes:**
- Felipe Escobar (fel.escobarl0819@gmail.com)
- Emanuel Toledo (emanvel.tldv@gmail.com)

## Caso

Ferretería-Los-Clavitos

## Descripción del Caso

Desarrollo de una tienda en línea para la Ferretería Los Maestros, dedicada a la venta de materiales de construcción, herramientas y artículos de ferretería.

Actualmente, la aplicación permite:

- Navegar entre Inicio, Catálogo, Categorías, Detalle de producto e Inicio de sesión.
- Visualizar productos provenientes del archivo Excel proporcionado para el caso.
- Buscar productos por nombre o código.
- Filtrar productos por categoría y acceder al catálogo mediante rutas con parámetros.
- Consultar precios y estados de stock.
- Completar un formulario demostrativo con validaciones y navegación.
- Gestionar productos mediante un servicio CRUD conectado con React Context y almacenamiento local.
- Ejecutar pruebas automatizadas y generar informes de cobertura.

El inicio de sesión actual es demostrativo: valida los campos, pero no realiza autenticación real.

En próximas etapas se desarrollarán funcionalidades como carrito, pedidos y administración de inventario.

## Estructura del Proyecto

La estructura principal de `src` es:

- **components/**
  - **atoms/**: `Boton.jsx`, `CampoInput.jsx`, `ContadorCantidad.jsx`, `EtiquetaStock.jsx`, `Precio.jsx`, `Selector.jsx`.
  - **molecules/**: `CampoFormulario.jsx`, `FilaInventario.jsx`, `FiltroCategoria.jsx`, `ItemCarrito.jsx`, `TarjetaCategoria.jsx`, `TarjetaProducto.jsx`.
  - **organisms/**: `CatalogoProductos.jsx`, `Footer.jsx`, `FormularioLogin.jsx`, `Navbar.jsx`.
  - **templates/**: `PlantillaPublica.jsx`.
- **context/**: `ProductosContext.jsx`, `ProductosProvider.jsx`.
- **data/**: `productos.json`.
- **hooks/**: `useTituloPagina.js`.
- **pages/**: `Inicio.jsx`, `Catalogo.jsx`, `Categorias.jsx`, `DetalleProducto.jsx`, `Login.jsx`.
- **services/**: `productoService.js`.
- **utils/**: `stockUtils.js`, `validaciones.js`.
- **Archivos principales**: `App.jsx`, `App.css`, `index.css`, `main.jsx`, `setupTests.js`.

Los archivos de pruebas automatizadas se encuentran junto al componente, función o servicio que evalúan:

- `src/components/atoms/Boton.test.jsx`
- `src/components/molecules/TarjetaProducto.test.jsx`
- `src/services/productoService.test.js`
- `src/utils/stockUtils.test.js`

Algunos componentes de inventario y carrito están reservados para etapas posteriores.

## Tecnologías

- React + Vite.
- JavaScript y JSX.
- React Bootstrap y Bootstrap.
- React Router DOM.
- React Context API.
- localStorage.
- Oxlint.
- Vitest.
- React Testing Library y jest-dom.
- jsdom.
- Cobertura de pruebas mediante V8.
- Atomic Design como metodología de organización de componentes.

## ¿Cómo ejecutar el proyecto?

**1. Instalar las dependencias:**

`npm install`

**2. Iniciar el servidor de desarrollo:**

`npm run dev`

La aplicación puede abrirse mediante la dirección local indicada por Vite en la terminal.

**3. Verificar el código con Oxlint:**

`npm run lint`

**4. Generar la versión de producción:**

`npm run build`

**5. Previsualizar la versión de producción:**

`npm run preview`

## Pruebas Automatizadas

El proyecto utiliza Vitest y React Testing Library para comprobar el comportamiento de funciones, componentes y servicios.

Las pruebas están organizadas mediante suites (`describe`), casos (`it`) y aserciones (`expect`), siguiendo la metodología AAA: preparar, actuar y verificar.

### Comandos de pruebas

**Ejecutar las pruebas en modo vigilante:**

`npm test`

Este comando mantiene Vitest en ejecución y permite repetir las pruebas mientras se desarrolla.

**Ejecutar todas las pruebas una sola vez:**

`npm run test:run`

Este comando permite verificar que los casos de prueba pasen antes de realizar un commit.

**Ejecutar las pruebas y generar el informe de cobertura:**

`npm run test:cov`

Este comando genera un reporte con las métricas de instrucciones, ramas, funciones y líneas ejecutadas durante las pruebas.

### Configuración de pruebas

- `vite.config.js`: contiene la configuración del entorno de pruebas y de cobertura.
- `src/setupTests.js`: carga los comparadores adicionales de jest-dom.
- `jsdom`: proporciona un entorno DOM simulado para probar componentes React.
- `coverage/`: almacena los informes generados automáticamente y está excluida de Git mediante `.gitignore`.

### Pruebas implementadas

Las primeras pruebas automatizadas cubren:

- **stockUtils:** estados de stock disponible, bajo y sin stock.
- **Boton:** visualización del texto recibido por props y ejecución del evento de clic.
- **TarjetaProducto:** presentación de información del producto y comunicación del evento al componente padre.
- **productoService:** creación, consulta, actualización y eliminación de productos mediante almacenamiento local simulado.

En la primera ejecución de esta etapa se obtuvieron **9 casos aprobados en 4 archivos de pruebas**, sin casos fallidos.

### Informe inicial de cobertura

El primer reporte generado mediante `npm run test:cov` mostró los siguientes resultados generales:

| Métrica | Cobertura |
|---|---:|
| Instrucciones (Statements) | 49,05 % |
| Ramas (Branches) | 33,33 % |
| Funciones (Functions) | 43,90 % |
| Líneas (Lines) | 49,52 % |

Estos resultados corresponden al primer informe de la semana 9. Los porcentajes cambiarán a medida que se incorporen nuevas pruebas.

La cobertura indica qué partes del código se ejecutaron durante las pruebas, pero no garantiza por sí sola la ausencia de errores.

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

### 22/10/26 — Felipe Escobar

**Trabajo realizado:**
- Configuración de los comandos de pruebas automatizadas en `package.json`.
- Implementación de tres pruebas unitarias para `stockUtils.js`.
- Implementación de dos pruebas para el átomo `Boton.jsx`.
- Implementación de dos pruebas para la molécula `TarjetaProducto.jsx`.
- Implementación de dos pruebas sobre el servicio `productoService.js`, comprobando operaciones CRUD.
- Ejecución de las pruebas mediante Vitest, obteniendo nueve casos aprobados.
- Generación del primer informe de cobertura mediante `npm run test:cov`.
- Configuración de `.gitignore` para excluir los informes de la carpeta `coverage/`.
- Actualización del README con las instrucciones para instalar, ejecutar y probar el proyecto.

**Problemas encontrados:**
- Inicialmente, `Boton.test.jsx` se creó dentro de `utils`, provocando un error al importar el componente desde una ruta incorrecta.
- La carpeta de cobertura no estaba incluida en `.gitignore`.

**Soluciones aplicadas:**
- Se trasladó `Boton.test.jsx` a `src/components/atoms`, junto al componente que evalúa.
- Se repitió la ejecución de Vitest y se comprobó que las pruebas funcionaran correctamente.
- Se incorporó `coverage/` a `.gitignore` y se verificó que Git aplicara la regla.
- Se generó el informe inicial de cobertura para identificar las partes del código probadas y las pendientes de ampliar.