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
 * Obtengo lo almacenado en la sesión del navegador si existe
 * sino un json vacío "{}"
 * Y parseo la cadena en un objeto JSON
 */
//const savedState = JSON.parse(sessionStorage.getItem("state") | "{}"); //Si no existe devuelvo "{}"
const savedState = localStorage.getItem("state");
//Si savedState NO es vacío entonces lo deserealizo, sino NO le asigna nada
const deserialized = savedState && JSON.parse(savedState);

/**
 * Este es el estado inicial, antes de cualquier accción
 *
 * Si 'deserialized' existe se la asigno a 'preLoadedState'
 * sino devuelvo el valor por defecto
 */
const preLoadedState = deserialized || {
  producto: {},
  productos: [],
};

//Agrego el middleware al Store
const middlewares = applyMiddleware(
  $store.loggerMiddleware,
  $store.agregarOModificarProductoMiddleware,
  //Llamo a la función que genera el middleware y le envío el valor inicial de 'indice'
  //para llevar el control de Id de los productos
  $store.generadorCodigoProductoBuilder(0),
  $store.storageMiddleware
);

const store = createStore($store.reducer, preLoadedState, middlewares);

//Exporto por defecto el store para poder utilizarlo en src/index.js
export default store;
