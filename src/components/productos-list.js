import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productoEliminado, productoSeleccionado } from "../store/store";

/**
 * Me devuelve el componente para mostrar un Producto en HTML
 */
const ProductoItem = (prop) => {
  const producto = prop.producto;

  const acciones = prop.acciones;

  return (
    <tr>
      <td>{producto.codigo}</td>
      <td>{producto.nombre}</td>
      <td>{producto.cantidad}</td>
      <td>{producto.precio}</td>

      <td>{producto.total}</td>
      <td>
        <div className="btn-group">
          <a
            title="Editar"
            href="#"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => acciones.seleccionar(producto.codigo)}
          >
            <i className="bi bi-pencil-square"></i>
          </a>
          <a
            title="Eliminar"
            href="#"
            className="btn btn-sm btn-outline-danger"
            onClick={() => acciones.eliminar(producto.codigo)}
          >
            <i className="bi bi-trash"></i>
          </a>
        </div>
      </td>
    </tr>
  );
};

const ProductosList = () => {
  //Uso otro hook de react-redux para obtener los productos
  //const s = useSelector((state) => state); //Obtengo todo el estado
  //const s = useSelector((state) => state.productos); //Solo obtengo lo que me interesa que son productos
  //console.log("s: ", s);
  const productos = useSelector((state) => state.productos);

  const dispatch = useDispatch();

  const seleccionar = (codigo) => dispatch(productoSeleccionado(codigo));
  const eliminar = (codigo) => dispatch(productoEliminado(codigo));
  const acciones = {
    seleccionar,
    eliminar,
  };

  const sumaCantidad = sum(productos, (x) => x.cantidad);
  const sumaPrecio = sum(productos, (x) => x.precio);
  const sumaTotal = sum(productos, (x) => x.total);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>

      {/* Dentro de este body voy a agregar todos los productos*/}
      <tbody>
        {productos.map((producto) => (
          <ProductoItem
            key={producto.codigo}
            producto={producto}
            acciones={acciones}
          />
        ))}
      </tbody>

      <tfoot>
        <tr>
          <th colSpan="2">Totales:</th>
          <td>{sumaCantidad}</td>
          <td>{sumaPrecio}</td>
          <td>{sumaTotal}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

/**
 * Creo una función que me ayuda a simplificar las operaciones para obtener los totales
 *
 * @param {*} elementos
 * @param {*} selector
 * @returns
 */
function sum(elementos, selector) {
  /**
   * A map le envío otra función (va a ser una función lambda en nuestro caso)
   * que va a tener mi selector, si quiero tomar cantidad, precio o total
   * por lo tanto le envío la función que se va a aplicar a cada elemento del arreglo
   */

  return elementos.map(selector).reduce((a, b) => a + b, 0);
}
export default ProductosList;
