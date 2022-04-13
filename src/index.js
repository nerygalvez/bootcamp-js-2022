//import "./js/app"; //Importo todo el código que tengo en el archivo app

//Comienzo a integrar React
import React from "react";
import ReactDom from "react-dom";
import "./index.css";

//Otra forma de jalar una imagen de src
import foto from "./Foto 2.jpg";

const container = document.getElementById("root");

const App = () => (
  <div className="app">
    <h1>Hola React!</h1>
    <img src={foto} />
  </div>
);

ReactDom.render(<App />, container);
