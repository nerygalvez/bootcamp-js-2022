import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Encabezado, Productos } from "./productos.component";
const rootElement = document.getElementById("root");

const titulo = "Aplicación React 2021";

const productosIniciales = [
  { codigo: 1, nombre: "Producto 1", cantidad: 2 },
  { codigo: 2, nombre: "Producto 2", cantidad: 10 },
];

function cuadrado(valor) {
  return valor * valor;
}

/**
 * Aquí ponemos la página principal de nuestra página
 */
const App = () => {
  //setProductos es la función para actualizar el estado de mis productos
  //productos es el estado actual de mi arreglo de productos
  const [productos, setProductos] = useState(productosIniciales);

  //(prop, event) pero como no uso event NO lo pongo
  const update = (prop) => {
    const newProductos = productos.slice(); //Me retorna una copia de todo el arreglo
    const producto = newProductos.find((p) => p.codigo == prop.codigo);
    const index = productos.indexOf(producto);
    newProductos[index] = { ...producto, cantidad: producto.cantidad + 1 };
    setProductos(newProductos);
  };

  return (
    <div>
      <Encabezado titulo={titulo} valor={cuadrado(2 * 4)} />

      <Productos productos={productos} onClickProducto={update} />
    </div>
  );
};
ReactDOM.render(<App />, rootElement);
