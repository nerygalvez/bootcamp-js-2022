import React from "react";
//import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
//Aquí no necesito ponerle que quiero el archivo index.js
//porque el compilador al no tener un archivo especificado
//busca por defecto un archivo que se llame index.js
//dentro de la carpeta que tengo (en este caso dentro de /store)
import store from "./store";

//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);

//Nueva implementación de React
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* Este es un Provider para manejar Redux y que todos los componentes
    dentro de él puedan utilizar React*/}
    <App />
  </Provider>
);
