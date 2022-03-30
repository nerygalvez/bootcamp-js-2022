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
const middleware = Redux.applyMiddleware(loggerMiddleware);
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

ui.onFormSubmit = (producto) => {
  if (producto.codigo) {
    //Si tiene un código definido es un actualizar
    store.dispatch(productoModificado(producto));
  } else {
    //Si no tiene código quiere decir que quiero agregar un producto
    store.dispatch(productoAgregado(producto));
  }

  /**
   * Ya no quiero usar form.reset() porque todas las modificaciones a mi interfaz
   * deberías de hacerlas a través de algún dispatch
   */

  //Ya no uso todo el código para hacer el dispatch, solo mando a llamar mi Action Builder

  store.dispatch(productoSeleccionado(null)); //Le digo que no quiero seleccionar ninguno, un producto que no existe

  document.getElementById("nombre").focus(); //Pongo el focus en el campo 'nombre' del formulario
};

ui.onEliminarClick = (codigo) => store.dispatch(productoEliminado(codigo));
ui.onEditarClick = (codigo) => store.dispatch(productoSeleccionado(codigo));
