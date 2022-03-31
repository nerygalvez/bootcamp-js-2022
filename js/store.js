/**
 * Buena práctica tener una variable con el nombre de los action para
 * estandarizar y evitar errores de cómo se escriben si se usan en distintos lados
 */
const actionTypes = {
  ProductoAgregado: "producto-agregado",
  ProductoModificado: "producto-modificado",
  ProductoEliminado: "producto-eliminado",
  ProductoSeleccionado: "producto-seleccionado",
  ProductoAgregadoOModificado: "producto-agregado-o-modificado",
};

/**
 * El reducer es el encargado de devolverme un estado según el action
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ProductoAgregado:
      return productoAgregadoReducer(state, action);

    case actionTypes.ProductoModificado:
      return productoModificadoReducer(state, action);

    case actionTypes.ProductoEliminado:
      return productoEliminadoReducer(state, action);

    //Esto es para cuando quiero editar un producto se llenen los campos del formulario
    case actionTypes.ProductoSeleccionado:
      return productoSeleccionadoReducer(state, action);

    default:
      //Si no conozo el action que está llegando retorno el mismo estado
      return state;
  }
};

/**
 * Creo un Action Builder para desacoplar un poco más mi código
 *
 * Estos son para cambiar los store.dispatch que se encuentran en app.js
 *
 * Si quiero retornar un objeto en una función lambda no puedo hacerlo como:
 * const funcion = (codigo) => {codigo : 1} porque JavaScript tomas las llaves como definiendo
 * el cuerpo de la función.
 *
 * Una opción es la siguiente:
 * const funcion = (codigo) => { return {codigo : 1} }
 *
 * Y la otra opción es util  izar paréntesis en lugar de llaves
 * como lo hago en la función definida a continuación
 */
const productoSeleccionado = (codigo) => ({
  type: actionTypes.ProductoSeleccionado,
  payload: {
    codigo,
  },
});

const productoEliminado = (codigo) => ({
  type: actionTypes.ProductoEliminado,
  payload: { codigo },
});

const productoModificado = (payload) => ({
  type: actionTypes.ProductoModificado,
  payload,
});

const productoAgregado = (payload) => ({
  type: actionTypes.ProductoAgregado,
  payload,
});

const agregarOModificarProducto = (payload) => ({
  type: actionTypes.ProductoAgregadoOModificado,
  payload,
});

/**
 *
 * Agregando el Middleware
 *
 * @param {*} store
 * @returns
 */
// function loggerMiddleware(store) {
//   /**
//    * Cada vez que haga un dispatch se va a ejecutar la siguiente función
//    *
//    *
//    * next es una función que usamos cuando queremos que se ejecute el action original
//    *
//    * Por ejemplo para 'productoAgregado' si yo aquí en el middleware verifiqué
//    * que el nombre del producto viene null o vacío ya no quiero ejecutar el resto
//    * del action y por lo tanto YA NO ejecuto la función next
//    *
//    */

//   return function dispatchWrapper(next) {
//     return function actionHandler(action) {
//       const result = next(action); //Para que la aplicación funcione normalmente y se ejecute el reducer
//       const state = store.getState();
//       console.log("Dispatching: ", action);
//       console.log("State: ", state);
//       return result;
//     };
//   };
// }

//Lo más normal es declarar lo anterior como una función lambda
const loggerMiddleware = (store) => (next) => (action) => {
  console.log("Dispatching: ", action);
  const result = next(action); //Para que la aplicación funcione normalmente y se ejecute el reducer
  console.log("Next State: ", store.getState());
  return result; //Nuestro middleware debería retornar lo que retorna la función 'next'
};

/**
 *
 * Creo este middleware para poder manejar el código que actualmente tengo en app.js
 * en la función ----> ui.onFormSubmit
 *
 * @param {*} store
 * @returns
 */
const agregarOModificarProductoMiddleware = (store) => (next) => (action) => {
  //Si no es el action que quiero digo que la aplicación siga con el flujo normal (llamo al next)
  //El action va a ser ejecutado por el reducer
  if (action.type != actionTypes.ProductoAgregadoOModificado) {
    return next(action);
  }

  //Si es el action especial yo programo la lógica, no llamo al reducer con la función next
  const producto = action.payload;

  //Si tiene un código definido es un actualizar
  //Si no tiene código quiere decir que quiero agregar un producto
  const actionToDispatch = producto.codigo
    ? productoModificado(producto)
    : productoAgregado(producto);

  document.getElementById("nombre").focus(); //Pongo el focus en el campo 'nombre' del formulario

  store.dispatch(actionToDispatch);
  return store.dispatch(productoSeleccionado(null)); //Le digo que no quiero seleccionar ninguno, un producto que no existe
};

function productoSeleccionadoReducer(state, action) {
  const codigo = action.payload.codigo; //Código del producto que quiero modificar

  return {
    ...state,

    //Ahora sí uso el otro atributo que definí en mi estado, había usado solo 'productos'
    //Ahora voy a usar 'producto' en singular
    //Si no encuentra un producto retorno un objeto vacío
    producto: state.productos.find((x) => x.codigo == codigo) || {},
  };
}

function productoEliminadoReducer(state, action) {
  const codigo = action.payload.codigo;
  const productos = state.productos.filter((item) => item.codigo != codigo); //Obtengo todos los elementos menos el que tenga el código quiero eliminar
  return {
    ...state,
    productos,
  };
}

function productoModificadoReducer(state, action) {
  const producto = action.payload;
  const productos = state.productos.slice(); //Hago una copia del arreglo original usando 'slice'
  const codigo = producto.codigo; //Con el código del producto lo voy a buscar en el arreglo de productos
  const total = producto.cantidad * producto.precio;
  const old = productos.find((item) => item.codigo == codigo);
  const index = productos.indexOf(old); //Obtengo la posición del producto que quiero modificar
  productos[index] = { ...producto, total }; //Modifico el arreglo en la posición que corresponde con el elemento modificado

  //Retorno los productos ya modificados
  return {
    ...state,
    productos,
  };
}

function productoAgregadoReducer(state, action) {
  const producto = action.payload;
  const total = producto.cantidad * producto.precio;

  //Retorno un objeto con la copia de state y con el arreglo
  // de 'productos' agregando el nuevo producto
  return {
    ...state,
    productos: [...state.productos, { ...producto, total }],
  };
}

/**
 * Función que me genera la función del middleware
 *
 * Este middleware es para eliminar la variable global que genera el código del producto 'indice'
 *
 * @param {*} lastId
 * @returns
 */
function generadorCodigoProductoBuilder(codigoInicial) {
  let codigo = codigoInicial;

  return (store) => (next) => (action) => {
    if (action.type != actionTypes.ProductoAgregado) {
      return next(action);
    }

    codigo++;

    //action.payload = { ...action.payload, codigo };
    //return next(action);

    //La forma correcta de hacer lo de arriba es la siguiente porque con el código de
    //arriba no estamos copiando correctamente los hijos internos del objeto
    const actionToDispatch = {
      ...action,
      payload: { ...action.payload, codigo },
    };

    return next(actionToDispatch);
  };
}
