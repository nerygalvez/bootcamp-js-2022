# Bootcamp 2022

Código de ejemplo creado durante el bootcamp de JavaScript, React y NodeJs.

## Inicializar npm

### -y me dice que quiero toda la configuración por defecto

npm init -y

## package.json

- **"private" : true** me sirve para que antes de publicar mi código como librería en npm me pida ciertas confirmaciones

## Instalar Librerías y que se guarde la metadata en el 'package.json'

> The --save option instructed NPM to include the package inside of the dependencies section of your package.json automatically, thus saving you an additional step.

- npm install --save redux -jañdfkjñdfj
  - Cambiando la forma de usar mi librería desde el html
  - <script src="./node_modules/redux/dist/redux.min.js"></script>
- npm install --save bootstrap@5.1.3
- npm install --save bootstrap-icons@1.7.0

### Webpack

<!--
    - Webpack: es toda la utelería que permite empaquetar la solución
    - Webpack-cli es la línea de comandos para interactuar con Webpack

    '--save-dev' o '-D' me permite indicar que estas dependencias son solo necesarias para
    desarrollo 'devDependencies', NO las vamos a usar en producción 'dependencies'
-->

- npm install --save-dev webpack webpack-cli

### Ejecutar scripts definidos en el package.json

- npm run NombreScript

### Instalación de React

- npm install --save react react-dom

### Instalación de Babel

> Babel es una librería o una herramienta que nos va a permitir manejar React y Webpack. Tabmién traslada javaScript nuevo hacia javascript más estandar o que la mayoría de los exploradores soportan.

> @babel/core Lógica inicial de Babel
> @babel/preset-env Reconoce la nueva sintaxis de JavaScript
> @babel/preset-react Reconoce la sintaxis de React
> babel-loader Ayuda a conectar Webpack con Babel

- npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader

> Lo siguiente es para que el html se genere en la carpeta dist y así todo esté empaquetado junto

- npm install -D html-webpack-plugin

> Para estar limpiando el contenido generado por Webpack en la carpeta 'dist'

- npm install -D clean-webpack-plugin

## Ayuda para usar .gitignore

[Ayuda gitignore](https://www.toptal.com/developers/gitignore)

## Sandbox video Introducción a React – Parte 2

- [SandBox](https://codesandbox.io/s/introduccion-a-react-parte-2-yh1vrr)
