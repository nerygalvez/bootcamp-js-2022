# Bootcamp 2022

Código de ejemplo creado durante el bootcamp de JavaScript, React y NodeJs.

## Repositorio Ejercicio Desarrollado en el Bootcamp

[Repositorio](https://github.com/laserants/bootcamp-js-2021)

## ¿Cómo preparo mi proyecto del lado del CLIENTE?

- cd cliente

> Instalo las dependencias

- npm install

> Crear la carpeta dist para todo lo configurado con Webpack

- npm run build

> Levantar el cliente

- npm run start

## Inicializar npm y crear un package.json

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

> Para que Webpack pueda reconocer el css

- npm install -D style-loader css-loader

> Para que el css importado (bootstrap) no lo genere dentro de 'dist/main.js' sino que genere un archivo aparte

- npm install -D mini-css-extract-plugin

> Para manejar el SERVIDOR DE DESARROLLO. Algo que permita ir probando la aplicación, hacer cambios y que los cambios de una vez se vayan reflejando en la aplicación

- npm install -D webpack-dev-server

> Para que Webpack al hacer un cambio NO refresque toda la página, sino solo el contenido que queremos

- [Repositorio Oficial](https://github.com/pmmmwh/react-refresh-webpack-plugin)

- npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh

## Ayuda para usar .gitignore

[Ayuda gitignore](https://www.toptal.com/developers/gitignore)

## Sandbox video Introducción a React – Parte 2

- [SandBox](https://codesandbox.io/s/introduccion-a-react-parte-2-yh1vrr)

## Create React App - Me da una plantilla para iniciar mi proyecto de React

- [Página Oficial](https://create-react-app.dev/)
- npx create-react-app NombreAplicación

> Cuando quiero que aparezca el archivo de Webpack.config.js

- npm run eject

## Librería para conectar React y Redux

- npm install --save react-redux

## Eliminar archivos no necesarios usando el gitignore

- git clean -fdx

## Extensión "Live Server" de Visual Studio Code para el lado del servidor
