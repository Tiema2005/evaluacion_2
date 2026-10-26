# Ferretería Los Maestros — Los Clavitos

**Evaluación Parcial 2 · Desarrollo Full Stack II · 2026**  
**Equipo:** Los Traba_jadores  
**Caso:** Ferretería Los Maestros  
**Repositorio:** [evaluacion_2](https://github.com/Tiema2005/evaluacion_2)

## 1. Integrantes

- **Felipe Escobar** — desarrollo de componentes, integración de catálogo y carrito, validaciones, pruebas y documentación.
- **Emanuel Toledo** — estructura inicial, Context/Provider, catálogo, CRUD, funcionalidades del carrito, vistas adicionales y reorganización del proyecto.

> Los aportes particulares se describen en la bitácora y en el historial de commits de GitHub. Durante el proyecto se utilizó la rama `main` con autorización del docente. Los nombres incluidos en los mensajes de commit permiten distinguir los aportes, incluso cuando la identidad de Git configurada no corresponde al autor indicado.

## 2. Descripción del proyecto

**Ferretería Los Maestros** es una aplicación web de demostración desarrollada con React y Vite para consultar materiales de construcción, herramientas y productos de ferretería, organizar un carrito de compras y registrar pedidos simulados. El trabajo corresponde a la migración de una interfaz anterior a una aplicación React con componentes reutilizables, navegación y pruebas unitarias.

El sistema se basa en un catálogo proporcionado en el Excel del caso. Los datos se incorporaron a `src/data/productos.json` y se gestionan mediante servicios JavaScript, Context API y almacenamiento local del navegador (`localStorage`).

**Alcance académico:** se trata de un frontend con datos simulados. No dispone de backend ni base de datos remota, pasarela de pago o autenticación de servidor. Los pedidos no generan un cobro real.

### 2.1 Objetivos

- Migrar el sitio del caso a React con una estructura organizada por **Atomic Design**.
- Implementar navegación mediante React Router y componentes reutilizables con props.
- Presentar el catálogo completo, sus categorías, precios y stock.
- Permitir búsquedas, filtros, detalle de productos y uso del carrito.
- Registrar pedidos simulados y actualizar las existencias.
- Administrar información del inventario mediante operaciones CRUD.
- Implementar formularios controlados con mensajes de validación.
- Ejecutar pruebas unitarias con Vitest y analizar su cobertura.

## 3. Funcionalidades implementadas

### 3.1 Sitio público

| Módulo | Descripción |
|---|---|
| Inicio | Presentación breve del negocio, accesos al catálogo y productos destacados. |
| Catálogo | Listado completo de productos, búsqueda por información del producto y filtro por categoría. |
| Categorías | Navegación por categorías y subcategorías del catálogo. |
| Detalle de producto | Código, nombre, marca, precio, unidad, stock, estado, imagen representativa y opción de agregar al carrito. |
| Ofertas/destacados | Vista de productos seleccionados según los criterios definidos en la aplicación. |
| Carrito | Agregar y quitar productos, aumentar/disminuir cantidades según stock y consultar subtotales y total. |
| Confirmación | Ingresar datos del cliente, elegir retiro o despacho y validar el pedido. |
| Resultado del pedido | Pantalla con el resultado y comprobante de un pedido registrado; contempla mensajes de error. |
| Registro e inicio de sesión | Formularios React con validaciones y mensajes propios; flujo demostrativo. |
| Mis compras | Consulta de pedidos registrados dentro de la simulación local. |
| Nosotros | Información del negocio y referencia de ubicación mediante un mapa integrado. |
| Contacto | Dirección, horario y medios de contacto utilizados en la simulación. |
| Blog | Listado de noticias/artículos y lectura de cada detalle. |

Los iconos utilizados para representar productos son **referenciales**, no fotografías oficiales de fabricantes.

### 3.2 Administración

- **Panel administrativo:** accesos a los módulos de gestión.
- **Inventario:** consultar productos, crear, actualizar y eliminar registros.
- **Stock crítico:** detectar productos agotados o bajo su stock mínimo.
- **Pedidos:** consultar pedidos y sus datos dentro del almacenamiento simulado.
- **Categorías:** visualizar y gestionar información de categorías según las operaciones implementadas.
- **Usuarios y reportes:** vistas de consulta/gestión simulada según el alcance frontend del parcial.
- **Consistencia de datos:** al eliminar un producto del inventario también se elimina del carrito, evitando referencias inválidas al confirmar pedidos.

> Las vistas de administración forman parte de una demostración académica y **no deben confundirse con un panel protegido por autenticación real**.

### 3.3 Reglas funcionales principales

1. Los productos se identifican mediante su código y tienen nombre, categoría, subcategoría, marca, unidad, precio, stock y stock mínimo.
2. La condición de stock se obtiene mediante utilidades reutilizables; el sistema diferencia productos disponibles, bajos de stock y agotados.
3. El carrito no debe superar la cantidad disponible para un producto.
4. El pedido se valida antes de registrarse; cuando se registra correctamente se actualiza el inventario de la simulación.
5. La aplicación conserva productos, carrito y pedidos mediante `localStorage` del navegador.
6. Las operaciones de interfaz se realizan mediante componentes React; las operaciones sobre datos se mantienen en servicios independientes.

## 4. Tecnologías

| Herramienta | Uso |
|---|---|
| React | Desarrollo de la interfaz mediante componentes y hooks. |
| Vite | Entorno de desarrollo y compilación. |
| JavaScript / JSX | Lógica y construcción de componentes. |
| Bootstrap y React Bootstrap | Estilos y distribución responsive. |
| React Router DOM | Navegación entre páginas y rutas con parámetros. |
| Context API | Estado compartido del catálogo y carrito. |
| `localStorage` | Persistencia simulada dentro del navegador. |
| Vitest | Ejecución de pruebas unitarias. |
| React Testing Library / jest-dom | Verificación del comportamiento de componentes React. |
| jsdom | Simulación del DOM durante las pruebas. |
| V8 Coverage | Métricas de cobertura de pruebas. |
| Oxlint | Análisis estático del código. |
| Git y GitHub | Control de versiones y trazabilidad del equipo. |

## 5. Arquitectura y estructura del proyecto

La aplicación se encuentra en la carpeta **`Los-Clavitos/`**, dentro de la raíz del repositorio `evaluacion_2/`.

```text
 evaluacion_2/
 ├── .git/
 ├── README.md                 # Documentación y bitácora del equipo
 └── Los-Clavitos/
     ├── public/               # Recursos públicos
     ├── src/
     │   ├── assets/           # Recursos de la interfaz
     │   ├── components/
     │   │   ├── atoms/        # Componentes básicos
     │   │   ├── molecules/    # Composición de átomos
     │   │   ├── organisms/    # Bloques completos de interfaz
     │   │   └── templates/    # Estructuras reutilizables de página
     │   ├── context/          # Context y Provider para estado compartido
     │   ├── data/             # Catálogo y datos de demostración
     │   ├── hooks/            # Hooks personalizados
     │   ├── pages/
     │   │   ├── admin/        # Administración
     │   │   ├── auth/         # Registro e inicio de sesión
     │   │   ├── blog/         # Blog y artículos
     │   │   ├── catalogo/     # Catálogo y productos
     │   │   └── pedidos/      # Carrito, confirmación y comprobantes
     │   ├── services/         # Persistencia y operaciones sobre datos
     │   ├── utils/            # Validaciones y reglas de negocio
     │   ├── App.jsx           # Enrutamiento principal
     │   ├── main.jsx          # Punto de entrada y Providers
     │   ├── index.css         # Estilos generales
     │   └── setupTests.js     # Configuración de pruebas
     ├── index.html
     ├── vite.config.js
     ├── package.json
     └── package-lock.json
```

**Nota:** el árbol muestra la organización conceptual de la versión final. Se omiten algunos archivos individuales para facilitar la lectura.

### 5.1 Atomic Design

Los componentes se distribuyen según su responsabilidad:

| Nivel | Ejemplos | Función |
|---|---|---|
| Átomos | `Boton`, `CampoInput`, `Selector`, `Precio`, `EtiquetaStock`, `ImagenProducto` | Elementos simples que reciben datos mediante props. |
| Moléculas | `TarjetaProducto`, `ItemCarrito`, `ContadorCantidad`, `TarjetaArticulo`, `FilaInventario`, `ResumenPedido`, `EncabezadoPagina` | Agrupan átomos para resolver tareas de interfaz. |
| Organismos | `Navbar`, `Footer`, `CatalogoProductos`, `FormularioPedido`, `FormularioLogin`, `FormularioRegistro`, `FormularioProducto` | Agrupan componentes en secciones completas. |
| Plantillas | `PlantillaPublica` | Define el marco de navegación y estructura de las vistas. |
| Páginas | `Inicio`, `Catalogo`, `Carrito`, `ConfirmarPedido`, `Administracion`, entre otras | Representan las rutas y coordinan la lógica de cada pantalla. |

Un principio aplicado es separar la **presentación** de las **operaciones de datos**: los componentes no incluyen el CRUD directamente, sino que utilizan Context y servicios.

## 6. Instalación y ejecución

### 6.1 Requisitos

- Node.js y npm instalados en una versión compatible con las dependencias definidas en `package.json`.
- Navegador web actualizado.
- Git, para clonar o actualizar el repositorio.

### 6.2 Clonar e instalar

```bash
git clone https://github.com/Tiema2005/evaluacion_2.git
cd evaluacion_2/Los-Clavitos
npm install
```

Si ya tienes el repositorio descargado, entra directamente en `Los-Clavitos/`.

### 6.3 Ejecutar desarrollo

```bash
npm run dev
```

Vite mostrará en la terminal la URL local de desarrollo (habitualmente `http://localhost:5173/`). En el servidor Ubuntu del equipo se utiliza el acceso remoto configurado en Visual Studio Code.

### 6.4 Compilar y previsualizar

```bash
npm run build
npm run preview
```

El primer comando genera `dist/`. La carpeta `dist/` no es código fuente y puede regenerarse.

### 6.5 Análisis de código

```bash
npm run lint
```

El análisis de cierre informado por el equipo terminó con **0 errores y 0 advertencias**.

## 7. Pruebas unitarias y cobertura

### 7.1 Herramientas y configuración

El proyecto utiliza **Vitest**, React Testing Library, `jest-dom`, `jsdom` y el proveedor de cobertura V8. Los archivos de pruebas se ubican próximos a las unidades que evalúan.

La configuración principal está en `vite.config.js` y la preparación del entorno en `src/setupTests.js`.

### 7.2 Comandos

```bash
npm test             # Ejecuta Vitest en modo interactivo/vigilancia
npm run test:run     # Una ejecución completa, sin permanecer abierto
npm run test:cov     # Pruebas con reporte de cobertura
```

### 7.3 Pruebas implementadas

El último resultado mostrado por el equipo, correspondiente al **25/10/2026**, fue de **9 archivos de pruebas aprobados y 30 pruebas aprobadas**, sin pruebas fallidas.

| Archivo de pruebas | Casos aprobados | Aspecto evaluado |
|---|---:|---|
| `Boton.test.jsx` | 3 | Propiedades y comportamiento del botón. |
| `TarjetaProducto.test.jsx` | 2 | Información y comportamiento de la tarjeta. |
| `productoService.test.js` | 2 | Operaciones del servicio de productos. |
| `carritoService.test.js` | 3 | Gestión del carrito y cantidades. |
| `pedidoService.test.js` | 6 | Registro, condiciones y validaciones de pedidos. |
| `usuarioService.test.js` | 5 | Comportamiento del servicio de usuarios simulado. |
| `validacionesProducto.test.js` | 3 | Validaciones de los productos. |
| `validacionesPedido.test.js` | 3 | Validaciones de los datos del pedido. |
| `stockUtils.test.js` | 3 | Estados y reglas de stock. |
| **Total** | **30** | **9 archivos**. |

### 7.4 Evolución de las pruebas

| Etapa | Resultado |
|---|---|
| Primer ciclo de semana 9 | 9 pruebas aprobadas en 4 archivos. |
| Ciclo de integración posterior | 22 pruebas aprobadas. |
| Verificación final mostrada | 30 pruebas aprobadas en 9 archivos. |

Además, se realizó una **demostración controlada de fallo real** mediante una modificación temporal en la condición de stock cero. Vitest detectó el resultado incorrecto; después se restauró el código correcto y las pruebas volvieron a pasar.

### 7.5 Cobertura inicial y final

**Primer informe del proyecto (semana 9):**

| Métrica | Cobertura inicial |
|---|---:|
| Sentencias | 49,05 % |
| Ramas | 33,33 % |
| Funciones | 43,90 % |
| Líneas | 49,52 % |

**Último informe disponible (25/10/2026):**

| Métrica | Cobertura final reportada |
|---|---:|
| Sentencias | **49,65 %** |
| Ramas | **45,34 %** |
| Funciones | **46,45 %** |
| Líneas | **50,00 %** |

**Interpretación:** el número de casos aprobados demuestra la ejecución satisfactoria de las comprobaciones implementadas, pero no equivale a cobertura completa. El reporte revela módulos y ramas sin ejecutar, especialmente componentes de interfaz, y permite priorizar pruebas posteriores.

**Alcance de la medición:** los porcentajes corresponden a los archivos incluidos en el reporte configurado de Vitest. No deben presentarse como una medida exhaustiva de todas las páginas, Providers o flujos integrados de la aplicación.

Los resultados detallados, las limitaciones y las evidencias se documentan en el **Informe de Pruebas y Cobertura** entregado por separado.

## 8. Persistencia y datos de prueba

La aplicación utiliza `localStorage` para mantener datos simulados entre recargas, por ejemplo, inventario, carrito y pedidos. Debido a ello:

- La información se guarda en el navegador y origen donde se utiliza la aplicación.
- Los datos no se comparten automáticamente entre computadores ni navegadores.
- El sistema no requiere conexión a una base de datos real.
- Los datos del caso pueden recuperarse cuando se limpia la información local correspondiente y la aplicación vuelve a cargar su catálogo inicial.
- Los pedidos y comprobantes tienen valor de demostración: no generan pagos reales ni envíos automáticos.

Para restaurar la simulación desde las herramientas de desarrollador del navegador se pueden limpiar las claves utilizadas por los servicios (`productos`, `carrito` y `pedidos`), sabiendo que esto **elimina los datos locales** de esa sesión:

```js
localStorage.removeItem('productos');
localStorage.removeItem('carrito');
localStorage.removeItem('pedidos');
location.reload();
```

Este procedimiento es opcional y se recomienda únicamente para preparar una demostración limpia.

## 9. Validaciones y límites conocidos

- Los formularios de inicio de sesión y registro demuestran validaciones React. **No equivalen a autenticación real de servidor ni control de acceso seguro.**
- La aplicación utiliza datos de prueba y no solicita pagos reales.
- Las imágenes o iconos de productos son elementos **representativos**, no fotografías certificadas del SKU exacto.
- El mapa y algunos recursos externos requieren conexión a Internet.
- La implementación se enfoca en el **frontend del Parcial 2**; las funciones de backend y bases de datos remotas corresponden a otras etapas del curso.

## 10. Trazabilidad y trabajo colaborativo

El equipo registró avances mediante commits a lo largo del desarrollo. En algunos casos se incluyeron aclaraciones adicionales porque el nombre mostrado por la cuenta/configuración de Git no coincidía con el integrante que efectuó el trabajo.

Durante este parcial el docente permitió desarrollar en `main`; por eso no se crearon ramas individuales para cada integrante. En proyectos posteriores se contempla utilizar ramas y Pull Requests para mejorar el flujo colaborativo.

**Regla de nomenclatura aplicada a los commits:** `(Felipe) Descripción resumida` y `(Emanuel) Descripción resumida`, cuando corresponde.

El historial público de GitHub y la bitácora siguiente constituyen la trazabilidad del proceso.

## 11. Bitácora de desarrollo

**Criterio de registro:** orden cronológico ascendente. Las entradas históricas conservan la información documentada previamente; los días añadidos posteriormente se resumen con base en los asuntos visibles del historial de commits. Un commit confirma el cambio registrado, pero no permite reconstruir todos los errores y decisiones de cada jornada.

### 23/09/2026 — Felipe Escobar y Emanuel Toledo

**Avances:** inicio del repositorio, creación del README y estructura inicial de carpetas para organizar el proyecto React en equipo.

**Resultado:** repositorio inicial preparado para el desarrollo del caso.

### 24/09/2026 — Felipe Escobar y Emanuel Toledo

**Avances:** corrección de la dependencia de Bootstrap y transformación inicial del formulario de inicio de sesión a componentes React y Atomic Design.

**Resultado:** establecimiento de las bases de la interfaz y dependencias principales.

### 30/09/2026 — Emanuel Toledo y Felipe Escobar

**Avances:** incorporación de átomos, moléculas y organismos iniciales; preparación de la integración del catálogo derivado del Excel.

**Resultado:** primeros componentes reutilizables y estructura lista para los datos del caso.

### 01/10/2026 — Felipe Escobar y Emanuel Toledo

**Avances:** integración inicial de datos desde Excel a `productos.json`, correcciones de importación y desarrollo de `Boton`, `Precio`, `EtiquetaStock` y tarjetas de productos. También se registró la incorporación de carpetas del proyecto.

**Resultado:** primeras vistas de catálogo conectadas con información del caso.

### 06/10/2026 — Felipe Escobar y Emanuel Toledo

**Avances:** corrección de componentes base, preparación de `CampoInput`, `ContadorCantidad`, navegación y pie de página; conexión de las primeras páginas en `App.jsx`.

**Incidencia de trazabilidad:** existen aclaraciones de autoría en GitHub porque en algunos commits la identidad configurada no correspondía al responsable indicado en el mensaje.

**Resultado:** estructura React navegable y componentes compartidos en evolución.

### 07/10/2026 — Felipe Escobar y Emanuel Toledo

**Avances:** correcciones de la estructura pública y gestión de productos; actualización de README y aclaración de autoría del commit de estructura pública.

**Resultado:** mejor separación de componentes y registro de cambios del equipo.

### 08/10/2026 — Felipe Escobar

**Trabajo realizado:**

- Integración del catálogo con datos provenientes del Excel y tarjetas reutilizables.
- Conexión entre `CatalogoProductos`, `Catalogo` y `ProductosContext`.
- Corrección de las páginas de Inicio y Catálogo.
- Ajustes de estilo para el diseño responsive.
- Visualización de una muestra limitada de productos durante la etapa inicial (posteriormente se eliminó ese límite).

**Problemas y soluciones:** inicialmente algunas tarjetas no se mostraban y los estilos predeterminados interferían con Bootstrap. Se comprobó la carga de datos y se simplificaron los estilos generales.

**Resultado:** catálogo visible en móvil y escritorio.

### 08/10/2026 — Emanuel Toledo

**Trabajo realizado:**

- Desarrollo de `CampoFormulario`, reutilizando `CampoInput` y `Selector`.
- Implementación de `FiltroCategoria` y su interacción con `useState`.
- Ajustes en la visualización de productos durante la etapa inicial.
- Comprobación de compilación mediante `npm run build`.

**Resultado:** filtros iniciales funcionando y catálogo compilable.

### 12/10/2026 — Felipe Escobar y Emanuel Toledo

**Avances:** mejoras del CRUD y Context de productos, navegación entre productos y uso de un hook personalizado para los títulos de página.

**Resultado:** refuerzo del flujo de datos y navegación entre catálogo y detalle.

### 14/10/2026 — Felipe Escobar

**Trabajo realizado:**

- Revisión de Atomic Design, props y responsabilidades de los componentes.
- Mejoras de `productoService.js` para validar datos guardados en `localStorage`.
- Separación entre `ProductosContext.jsx` y `ProductosProvider.jsx`.
- Integración de filtros y búsqueda en el catálogo.
- Implementación de validaciones reutilizables para correo y contraseña.
- Desarrollo de `FormularioLogin` y navegación a `/login`.
- Comprobación del funcionamiento de rutas y componentes.

**Problemas encontrados:** se detectaron posibles incompatibilidades entre datos antiguos del navegador y el catálogo, además de advertencias relacionadas con la separación del Context.

**Soluciones:** validar la estructura de `localStorage`, recuperar datos iniciales cuando correspondiera y reorganizar Context/Provider.

**Resultado:** interfaz y formularios conectados a la navegación.

### 22/10/2026 — Felipe Escobar

**Trabajo realizado:**

- Configuración de los comandos de Vitest.
- Pruebas iniciales para `stockUtils`, `Boton`, `TarjetaProducto` y `productoService`.
- Ejecución de **9 pruebas aprobadas** en el primer ciclo.
- Obtención del informe inicial de cobertura.
- Incorporación de `coverage/` a `.gitignore`.
- Actualización de README con instrucciones de instalación y pruebas.

**Problemas y soluciones:** se corrigió la ubicación incorrecta de `Boton.test.jsx` y se evitó incluir los archivos generados de cobertura en Git.

**Resultado:** entorno de pruebas funcionando y primer reporte disponible.

### 22/10/2026 — Emanuel Toledo

**Avances:** mejoras adicionales de semana 9 relacionadas con pruebas unitarias, generación de cobertura y documentación.

**Resultado:** avances registrados en GitHub para completar la etapa de pruebas iniciales.

### 23/10/2026 — Felipe Escobar

**Avances:** implementación de la interfaz del carrito y preparación del recorrido de confirmación de pedidos, con componentes reutilizables y estado compartido.

**Resultado:** flujo de compra en desarrollo, conectado con las pantallas del catálogo.

### 23/10/2026 — Emanuel Toledo

**Avances:** implementación de la lógica y estructura inicial del carrito, así como funcionalidades de registro y confirmación de pedidos.

**Resultado:** incorporación progresiva de las operaciones del carrito y los formularios del recorrido de compra.

### 24/10/2026 — Felipe Escobar

**Avances:** refactorización de componentes y ampliación del conjunto de pruebas unitarias para aumentar la verificación de funcionalidades.

**Resultado:** base más completa de pruebas y mayor facilidad para explicar responsabilidades de código.

### 25/10/2026 — Felipe Escobar

**Trabajo realizado:**

- Ejecución de pruebas unitarias y confirmación de **22 pruebas aprobadas** en la etapa de integración.
- Verificación de compilación y análisis de código.
- Generación y revisión del informe de cobertura de Vitest.
- Comprobación del recorrido carrito → confirmación → registro de pedido.
- Corrección de la sincronización entre inventario y carrito cuando se elimina un producto desde Administración.
- Ejecución de una demostración de fallo detectado por Vitest, seguida de restauración del código correcto.
- Actualización del README y revisión funcional del proyecto.

**Problema detectado:** un producto eliminado del inventario podía permanecer en el carrito y provocar errores al confirmar un pedido.

**Solución:** conectar la eliminación de inventario con la eliminación del elemento en el carrito y comprobar los límites de stock.

**Resultado:** integración más consistente del carrito y la administración.

### 25/10/2026 — Emanuel Toledo

**Avances:** incorporación de vistas públicas y administrativas; reorganización de las páginas en subcarpetas por dominio y mejoras visuales de la interfaz.

**Resultado:** estructura más ordenada para encontrar páginas de administración, autenticación, catálogo, blog y pedidos.

### 25/10/2026 — Felipe Escobar y Emanuel Toledo

**Avances de cierre registrados en GitHub:**

- Unificación visual de las pantallas y revisión de los componentes bajo Atomic Design.
- Ajustes de tarjetas, navegación y páginas para mantener coherencia visual.
- Incorporación de vistas complementarias y revisión responsive.
- Actualización de los elementos representativos de los productos, evitando imágenes externas poco relacionadas con el catálogo.
- Comprobaciones de la aplicación en escritorio y móvil.
- Commit de finalización del frontend.

**Resultado de verificación presentado por el equipo:** compilación satisfactoria, análisis Oxlint con **0 errores y 0 advertencias**, y **30 pruebas aprobadas** distribuidas en 9 archivos.

**Nota de trazabilidad:** los commits del 25/10/2026 incluyen `(Felipe) Unificación visual y mejoras de Atomic Design`, `(Emanuel) Implementación de vistas públicas y administración`, `(Emanuel) Reorganización de páginas y mejoras visuales` y `(Felipe) Finalización del desarrollo frontend`, entre otros. Se mantienen sus mensajes e identidades originales en GitHub.

## 12. Documentos complementarios y entrega

La documentación del Parcial 2 se compone de:

1. **Repositorio GitHub:** código fuente y commits del equipo.
2. **Proyecto comprimido (.zip):** código fuente de la aplicación, excluyendo `node_modules/` y carpetas generadas.
3. **ERS V2:** especificación de requisitos actualizada.
4. **Informe de pruebas y cobertura:** pruebas implementadas, resultados, cobertura y análisis de lo que falta probar.
5. **README:** descripción, arquitectura, instalación, ejecución, pruebas y bitácora de desarrollo.

**Material complementario del semestre:** [Carpeta de Google Drive](https://drive.google.com/drive/folders/1qvCGlIiXOxQ2mrF8SrRwWkNOPHU4Lvop?usp=sharing).
