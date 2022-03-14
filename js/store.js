let indice = 0;

/**
 * El reducer es el encargado de devolverme un estado según el action
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
 const reducer = (state, action) => {
    if (action.type == "producto-agregado") {
      indice++; //Sé que se está agregando un producto entonces aumento el contador
      const codigo = indice;
      const producto = action.payload;
      const total = producto.cantidad * producto.precio;
  
      //Retorno un objeto con la copia de state y con el arreglo
      // de 'productos' agregando el nuevo producto
      return {
        ...state,
        productos: [...state.productos, { ...producto, codigo, total }],
      };
    } else if (action.type == "producto-modificado") {
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
    } else if (action.type == "producto-eliminado") {
      const codigo = action.payload.codigo;
      const productos = state.productos.filter((item) => item.codigo != codigo); //Obtengo todos los elementos menos el que tenga el código quiero eliminar
      return {
        ...state,
        productos,
      };
    } //Esto es para cuando quiero editar un producto se llenen los campos del formulario
    else if (action.type == "producto-seleccionado") {
      const codigo = action.payload.codigo; //Código del producto que quiero modificar
  
      return {
        ...state, //Retorno una copia del estado
        //Ahora sí uso el otro atributo que definí en mi estado, había usado solo 'productos'
        //Ahora voy a usar 'producto' en singular
        //Si no encuentra un producto retorno un objeto vacío
        producto: state.productos.find((x) => x.codigo == codigo) || {},
      };
    }
  
    //Si no conozo el action que está llegando retorno el mismo estado
    return state;
  };