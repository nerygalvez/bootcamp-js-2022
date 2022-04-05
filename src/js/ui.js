//Creo un objeto para reemplazar en este archivo JavaScript todo lo que hacía con Redux en el archivo 'index-v2.js'
export const ui = {
  onFormSubmit: (data) => {},
  onEliminarClick: (codigo) => {},
  onEditarClick: (codigo) => {},
  renderForm,
  renderTable,
};

//Obtengo el formulario para poder manipular la información
const form = document.getElementsByTagName("form")[0]; //Tomo el primer formulario que encuentre

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

//Obtengo el body de la tabla porque así puedo manipular las filas
const tbody = document.getElementsByTagName("tbody")[0]; //Tomo el primer tbody que encuentre

//Obtengo las celdas donde voy a poner los totales
const sumaCantidadElement = document.getElementById("sumaCantidad");
const sumaPrecioElement = document.getElementById("sumaPrecio");
const sumaTotalElement = document.getElementById("sumaTotal");

/**
 * Para manejar el submit del formulario
 */
// form.addEventListener("submit", onsubmit); //Sobreescribo el método onsubmit
form.addEventListener("submit", () => {
  //Cancelamos la funcionalidad por defecto del form y ya podemos poner nuestra lógica
  //Evitamos que el action="index.html" el cual por defecto manda los parámetros del formulario por la URL
  event.preventDefault();

  //Creo que aquí en new FormData(this) podría usar 'this' en lugar de indicar la variable
  const data = new FormData(form); //Quiero consultar la data del formulario 'form' que declaré arriba

  const values = Array.from(data.entries());

  const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values; //Descompongo el arreglo 'values'

  const codigo = parseInt(frmCodigo[1]);
  const nombre = frmNombre[1];
  const cantidad = parseFloat(frmCantidad[1]);
  const precio = parseFloat(frmPrecio[1]);
  const categoria = parseInt(frmCategoria[1]);

  //Ya no mandamos event porque todo lo que tiene que ver con event lo hicimos aquí antes de llamar a la función
  ui.onFormSubmit({
    codigo,
    nombre,
    cantidad,
    precio,
    categoria,
  });
}); //Sobreescribo el método onsubmit

function renderForm(producto) {
  //Si producto.atributo != undefined pongo el valor que trae, sino pongo cadena vacía
  inputCodigo.value = producto.codigo || "";
  inputNombre.value = producto.nombre || "";
  inputCantidad.value = producto.cantidad || "";
  inputPrecio.value = producto.precio || "";
  selectCategoria.value = producto.categoria || 1;
}

function renderTable(productos) {
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
      /*store.dispatch({
        type: "producto-eliminado",
        payload: {
          codigo: item.codigo,
        },
      });*/
      ui.onEliminarClick(item.codigo);
    });

    editar.addEventListener("click", (event) => {
      event.preventDefault();
      /*store.dispatch({
        type: "producto-seleccionado",
        payload: {
          codigo: item.codigo,
        },
      });*/
      ui.onEditarClick(item.codigo);
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
}
