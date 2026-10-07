Los Traba_jadores

- Felipe Escobar (fel.escobarl0819@gmail.com)
- Emanuel Toledo (emanvel.tldv@gmail.com)

## Caso
Ferretería-Los-Clavitos

## Descripción del caso
Tienda en línea de artículos de construcción.
La aplicación permite iniciar sesión, explorar el catálogo, agregar productos
al carrito y, para el rol administrador, gestionar el catálogo.

## Estructura del proyecto
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

## Cómo ejecutar el proyecto
npm install
npm run dev

## Material complementario
Carpeta de Drive con documentos del semestre (ERS y otros):
[(https://drive.google.com/drive/folders/1qvCGlIiXOxQ2mrF8SrRwWkNOPHU4Lvop?usp=sharing)](https://drive.google.com/drive/folders/1qvCGlIiXOxQ2mrF8SrRwWkNOPHU4Lvop?usp=sharing)
