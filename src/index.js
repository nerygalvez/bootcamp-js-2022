//import "./js/app"; //Importo todo el código que tengo en el archivo app

//Comienzo a integrar React
import React from "react";
import ReactDom from "react-dom";

const container = document.getElementById("root");

const App = () => (
  <div>
    <h1>Hola Reat!</h1>
  </div>
);

ReactDom.render(<App />, container);
