/**
 * Configuro Webpack para que reconozca React
 */

/**
 * Módulo de Node para conocer la ruta absoluta
 */
const path = require("path");
//De lo anterior solamente importo la clase 'CleanWebpackPlugin'
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", //Ruta de mi archivo principal de la aplicación
  output: {
    //[name].[contenthash].js ayuda para evitar error de caché en el navegador
    filename: "[name].[contenthash].js", //Archivo dónde voy a guardar el código generado por Webpack
    path: path.resolve(__dirname, "dist"), //Ruta donde se encuentra el archivo
    publicPath: "",
  },
  mode: "production", //Modo para que Webpack optimice el código lo más que pueda
  module: {
    //rules le dice a Webpack cómo procesar cada archivo
    //se hace la relación entre Webpack y Babel
    rules: [
      {
        use: "babel-loader",
        test: /.js$/, //Qué archivo tiene que usar con este loader. Todos los archivos que tengan extensión .js
        exclude: /node_modules/, //Excluye todo lo de la carpeta node_modules
      },
    ],
  },

  //Sección de plugins de Webpack
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html", //usando esta plantilla va a generar un nuevo html en la carpeta 'dist'
    }),
  ],
};
