/**
 * Aquí orquestamos todos nuestro código, conocemos la 'ui' y 'store'
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
import { ui } from "./ui";
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

/**
 * Defino la función 'subscribe' de mi store
 *
 * Este método se va a ejecutar cada vez que cambie el estado
 */
store.subscribe(
  dispatchOnChange(store, (state) => {
    ui.renderForm(state.producto); //Si se quiere editar un producto se ponen sus atributos en el formulario
    ui.renderTable(state.productos);
  })
);

ui.onFormSubmit = (producto) =>
  store.dispatch($store.agregarOModificarProducto(producto));
ui.onEliminarClick = (codigo) =>
  store.dispatch($store.productoEliminado(codigo));
ui.onEditarClick = (codigo) =>
  store.dispatch($store.productoSeleccionado(codigo));

/**
 * Función para eliminar la varible global let latestState;
 *
 * @param {*} store
 */
function dispatchOnChange(store, dispatch) {
  let latestState;

  return function () {
    let currentState = store.getState();

    if (currentState != latestState) {
      latestState = currentState;
      dispatch(currentState); //Se ejecuta el dispatch
    }
  };
}
