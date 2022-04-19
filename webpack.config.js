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
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
const mode = isDevelopment ? "development" : "production";
//Miguel Román crea un arreglo de los plugings que van a afectar en Desarrollo
const devPlugins = !isDevelopment ? [] : [new ReactRefreshWebpackPlugin()];

module.exports = {
  entry: "./src/index.js", //Ruta de mi archivo principal de la aplicación
  output: {
    //[name].[contenthash].js ayuda para evitar error de caché en el navegador  al sacar nuevas versiones del proyecto
    filename: "[name].[contenthash].js", //Archivo dónde voy a guardar el código generado por Webpack
    path: path.resolve(__dirname, "dist"), //Ruta donde se encuentra el archivo
    publicPath: "",
  },
  //mode: "production", //Modo para que Webpack optimice el código lo más que pueda
  //Al cambiar de 'production' a 'development' tengo que agregar en package.json en el script
  //de build : "webpack --mode=production"
  mode: mode, //Dejo esta opción porque va a ser la configuración por defecto para mi entorno de desarrollo
  devServer: {
    port: 5001, //puerto en el que escucha el servidor
    open: true, //Le indico si quiero que abra el navegador por defecto
    hot: true, //Para que el devServer sepa que se quiere hacer un hot reload. Que no quiero refrescar toda la página, sino solo los elementos que queremos
  },
  module: {
    //rules le dice a Webpack cómo procesar cada archivo
    //se hace la relación entre Webpack y Babel
    rules: [
      {
        use: "babel-loader",
        test: /.js$/, //Qué archivo tiene que usar con este loader. Todos los archivos que tengan extensión .js
        exclude: /node_modules/, //Excluye todo lo de la carpeta node_modules
      },
      //Otra regla para poder usar el css
      {
        //use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        test: /.css$/,
        //No se definió exclude, tal vez toma el de la regla anterior
      },
      //Otra regla para leer las imágenes
      {
        type: "asset",
        test: /.(png|svg|jpg|jpeg|gif)$/i,
      },
    ],
  },

  //Sección de plugins de Webpack
  plugins: [
    ...devPlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      //[name].[contenthash].css ayuda para evitar error de caché en el navegador al sacar nuevas versiones del proyecto
      filename: "[name].[contenthash].css", //Archivo dónde voy a guardar el código generado por Webpack
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html", //usando esta plantilla va a generar un nuevo html en la carpeta 'dist'
    }),
  ],
};
