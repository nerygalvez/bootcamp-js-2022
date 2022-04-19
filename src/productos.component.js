//Tengo que importar React en todos los archivos donde utilicemos sintaxis de React
import React from "react";

/**
 * Estoy creando un componente en React
 *
 * Como convención se define la función iniciando con letra mayúscula
 */
export const Encabezado = (prop) => (
  <h1>
    {prop.titulo} : {prop.valor}
  </h1>
);

//Producto no lo exporto porque solo lo quiero utilizar en este archivo
const Producto = (
  prop //Aquí el atributo no se llama 'class' sino que 'className'
) => (
  <li className="producto" onClick={(e) => prop.onClickProducto(prop, e)}>
    Nombre: {prop.nombre} Cantidad: {prop.cantidad}
  </li>
);

export const Productos = (prop) => {
  return (
    <ul>
      {prop.productos.map((producto) => (
        <Producto
          key={producto.codigo}
          codigo={producto.codigo}
          nombre={producto.nombre}
          cantidad={producto.cantidad}
          onClickProducto={prop.onClickProducto}
        />
      ))}
    </ul>
  );
};
