const form = document.getElementsByTagName("form")[0]; //Tomo el primer formulario que encuentre
form.addEventListener("submit", onsubmit); //Sobreescribo el método onsubmit

const tbody = document.getElementsByTagName("tbody")[0]; //Tomo el primer tbody que encuentre

let indice = 0;

let sumaCantidad = 0;
let sumaPrecio = 0;
let sumaTotal = 0;

//Obtengo las celdas donde voy a poner los totales
const sumaCantidadElement = document.getElementById("sumaCantidad");
const sumaPrecioElement = document.getElementById("sumaPrecio");
const sumaTotalElement = document.getElementById("sumaTotal");

//Obtengo los input del fomulario para poder hacer el edit
/** @type {HTMLInputElement}*/
const inputCodigo = document.getElementById("codigo");
/** @type {HTMLInputElement}*/
const inputNombre = document.getElementById("nombre");
/** @type {HTMLInputElement}*/
const inputCantidad = document.getElementById("cantidad");
/** @type {HTMLInputElement}*/
const inputPrecio = document.getElementById("precio");
/** @type {HTMLSelectElement}*/
const selectCategoria = document.getElementById("categoria");

/**
 * Este es el estado inicial, antes de cualquier accción
 */
const preLoadedState = {
  producto: {},
  productos: [],
};

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
  }

  //Si no conozo el action que está llegando retorno el mismo estado
  return state;
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
    console.log("Estado: ", store.getState());
    renderTable(currentState.productos);
  }
});

const renderTable = (productos) => {
  const filas = productos.map((item) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${item.codigo}</td>
    <td>${item.nombre}</td>
    <td>${item.cantidad}</td>
    <td>${item.precio}</td>
    
    <td>${item.total}</td>
    <td>
      <div class="btn-group">
        <a title="Editar" href="#" class="btn btn-sm btn-outline-secondary">
          <i class="bi bi-pencil-square"></i>
        </a> 
        <a title="Eliminar" href="#" class="btn btn-sm btn-outline-danger">
          <i class="bi bi-trash"></i>
        </a>
      </div>
    </td>
    `;

    //Forma uno de hacerlo
    /*const links = tr.getElementsByTagName("a"); //En la fila busco todos los elementos anchor, que son los links
    const editar = links[0];
    const eliminar = links[1];
    */

    //Forma equivalente y se ve mejor
    const [editar, eliminar] = tr.getElementsByTagName("a"); //En la fila busco todos los elementos anchor, que son los links

    //Defino el listener para el link
    eliminar.addEventListener("click", (event) => {
      event.preventDefault();
      store.dispatch({
        type: "producto-eliminado",
        payload: {
          codigo: item.codigo,
        },
      });
    });
    return tr;
  });

  //limpio todas las filas de la tabla
  tbody.innerHTML = "";

  //Adjunto las filas a la tabla
  filas.forEach((item) => {
    tbody.appendChild(item);
  });

  //Como lo hace Miguel usando map y luego reduce
  //Al reduce le pongo valor inicial 0 porque si no tengo productos en el arreglo tira error de que no tiene valor inicial
  /*const sumaCantidad = productos
    .map((x) => x.cantidad)
    .reduce((a, b) => a + b, 0);
  const sumaPrecio = productos.map((x) => x.precio).reduce((a, b) => a + b, 0);
  const sumaTotal = productos.map((x) => x.total).reduce((a, b) => a + b, 0);
  */

  //Como lo haría yo para no usar map y no crear otro ar reglo solo de los valores que se van a sumar (cantidad, precio, total)
  //const sumaCantidad = productos.reduce((a, b) => a.cantidad + b.cantidad);
  //const sumaPrecio = productos.reduce((a, b) => a.precio + b.precio);
  //const sumaTotal = productos.reduce((a, b) => a.total + b.total);

  sumaCantidadElement.innerText = sum(productos, (x) => x.cantidad);
  sumaPrecioElement.innerText = sum(productos, (x) => x.precio);
  sumaTotalElement.innerText = sum(productos, (x) => x.total);

  //Creo una función que me ayuda a simplificar las operaciones para obtener los totales
  function sum(elementos, selector) {
    /**
     * A map le envío otra función (va a ser una función lambda en nuestro caso)
     * que va a tener mi selector, si quiero tomar cantidad, precio o total
     * por lo tanto le envío la función que se va a aplicar a cada elemento del arreglo
     */

    return elementos.map(selector).reduce((a, b) => a + b, 0);
  }
};

/**
 * Ejecuto un 'dispatch' esto va a ejecutar los 'reducers' que definí
 * El dispatch me pide un action
 */
store.dispatch({
  type: "producto-agregado",
  payload: {
    //El id lo tiene que calcular la aplicación
    nombre: "Prueba A",
    cantidad: 3,
    precio: 10,
    categoria: 2,
  },
});

store.dispatch({
  type: "producto-modificado",
  payload: {
    codigo: 1,
    nombre: "Prueba A Versión 2",
    cantidad: 4,
    precio: 11,
    categoria: 1,
  },
});

store.dispatch({
  type: "producto-agregado",
  payload: {
    //El id lo tiene que calcular la aplicación
    nombre: "Prueba B",
    cantidad: 6,
    precio: 8,
    categoria: 3,
  },
});

//Probando el 'unSubscribe'
//unSubscribe(); //Al ponerlo antes del dispatch evito que se agregue el producto 'Prueba C'

store.dispatch({
  type: "producto-agregado",
  payload: {
    //El id lo tiene que calcular la aplicación
    nombre: "Prueba C",
    cantidad: 2,
    precio: 4,
    categoria: 4,
  },
});

store.dispatch({
  type: "producto-eliminado",
  payload: {
    codigo: 2,
  },
});
