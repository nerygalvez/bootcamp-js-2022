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
  agregarOModificarProductoMiddleware
);
const store = Redux.createStore(reducer, preLoadedState, middleware);

/**
 * Defino la función 'subscribe' de mi store
 *
 * Este método se va a ejecutar cada vez que cambie el estado
 */
let latestState;

//'subcribe' retorna una función que permite dessubcribirse del evento
//es útil cuando queremos cambiar de funcionalidad en nuestra aplicación
//y así liberamos memoria
const unSubscribe = store.subscribe(() => {
  let currentState = store.getState();

  if (currentState != latestState) {
    latestState = currentState;

    ui.renderForm(currentState.producto); //Si se quiere editar un producto se ponen sus atributos en el formulario
    ui.renderTable(currentState.productos);
  }
});

ui.onFormSubmit = (producto) =>
  store.dispatch(agregarOModificarProducto(producto));
ui.onEliminarClick = (codigo) => store.dispatch(productoEliminado(codigo));
ui.onEditarClick = (codigo) => store.dispatch(productoSeleccionado(codigo));
