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

const store = Redux.createStore(reducer, preLoadedState);

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

ui.onFormSubmit = (payload) => {
  if (payload.codigo) {
    //Si tiene un código definido es un actualizar
    store.dispatch({
      type: "producto-modificado",
      payload,
    });
  } else {
    //Si no tiene código quiere decir que quiero agregar un producto
    store.dispatch({
      type: "producto-agregado",
      payload,
    });
  }

  /**
   * Ya no quiero usar form.reset() porque todas las modificaciones a mi interfaz
   * deberías de hacerlas a través de algún dispatch
   */

  //form.reset(); //Limpio el formulario

  //form.reset(); NO limpia el input type="hidden" donde se almacena el código
  //Y luego de editar no dejaba agregar nuevos productos, siempre editaba el último registro donde se presionó 'editar'
  //inputCodigo.value = "";

  store.dispatch({
    type: "producto-seleccionado",
    payload: {
      codigo: null, //Le digo que no quiero seleccionar ninguno, un producto que no existe
    },
  });

  document.getElementById("nombre").focus(); //Pongo el focus en el campo 'nombre' del formulario
};

ui.onEliminarClick = (codigo) => {
  store.dispatch({
    type: "producto-eliminado",
    payload: { codigo },
  });
};

ui.onEditarClick = (codigo) => {
  store.dispatch({
    type: "producto-seleccionado",
    payload: { codigo },
  });
};
