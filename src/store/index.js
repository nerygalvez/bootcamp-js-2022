/**
 * Aquí vamos a manejar el store que es necesario para unir Redux con React
 */

//
/**
 * redux lo está jalando de la carpeta 'node_modules'
 *
 * Esta es otra forma de hacer un import. Solo jalo
 * de redux lo que me va a servir y no todo el módulo
 * , en este caso 'applyMiddleware' y 'createStore'
 */
import { applyMiddleware, createStore } from "redux";

//Forma de importar todo de algún archivo para no escribir el nombre de todos los elementos como lo siguiente {a1, a2, ..., an}
import * as $store from "./store";
/**
 * Este es el estado inicial, antes de cualquier accción
 */
const preLoadedState = {
  producto: {},
  productos: [],
};

//Agrego el middleware al Store
const middleware = applyMiddleware(
  $store.loggerMiddleware,
  $store.agregarOModificarProductoMiddleware,
  //Llamo a la función que genera el middleware y le envío el valor inicial de 'indice'
  //para llevar el control de Id de los productos
  $store.generadorCodigoProductoBuilder(0)
);

const store = createStore($store.reducer, preLoadedState, middleware);

//Exporto por defecto el store para poder utilizarlo en src/index.js
export default store;
