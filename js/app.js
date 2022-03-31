/**
 * Aquí orquestamos todos nuestro código, conocemos la 'ui' y 'store'
 */

/**
 * Este es el estado inicial, antes de cualquier accción
 */
const preLoadedState = {
  producto: {},
  productos: [],
};

//Agrego el middleware al Store
const middleware = Redux.applyMiddleware(
  loggerMiddleware,
  agregarOModificarProductoMiddleware,
  //Llamo a la función que genera el middleware y le envío el valor inicial de 'indice'
  //para llevar el control de Id de los productos
  generadorCodigoProductoBuilder(0)
);

const store = Redux.createStore(reducer, preLoadedState, middleware);

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
  store.dispatch(agregarOModificarProducto(producto));
ui.onEliminarClick = (codigo) => store.dispatch(productoEliminado(codigo));
ui.onEditarClick = (codigo) => store.dispatch(productoSeleccionado(codigo));

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
