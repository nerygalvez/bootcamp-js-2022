import React from "react";
//import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import App from "./app";

//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);

//Nueva implementación de React
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
