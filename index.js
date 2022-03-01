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

//Variable para conocer la fila actual en la tabla
let currentRow;

/**
 *
 * @param {Event} event
 */
function onsubmit(event) {
  //Cancelamos la funcionalidad por defecto del form y ya podemos poner nuestra lógica
  //Evitamos que el action="index.html" el cual por defecto manda los parámetros del formulario por la URL
  event.preventDefault();

  //Creo que aquí en new FormData(this) podría usar 'this' en lugar de indicar la variable
  const data = new FormData(form); //Quiero consultar la data del formulario 'form' que declaré arriba

  const values = Array.from(data.entries());

  const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values; //Descompongo el arreglo 'values'

  let codigo = frmCodigo[1];
  const nombre = frmNombre[1];
  const cantidad = frmCantidad[1];
  const precio = frmPrecio[1];
  const categoria = frmCategoria[1];
  const total = cantidad * precio;

  let tr;

  console.log("Código: ", codigo, " Typeof: ", typeof codigo);

  if (!codigo) {
    //Si codigo NO tiene valor tengo que crear una nueva fila
    indice++; //Puedo agregar esta línea para evitar que me ponga codigo = 0, o puedo declarar la variable arriba como "let indice = 1;"
    codigo = indice;
    tr = document.createElement("tr");

    tbody.appendChild(tr); //Agrego al tbody la nueva fila
  } else {
    tr = currentRow;
  }

  tr.dataset.categoria = categoria;

  tr.innerHTML = `
    <td>${codigo}</td>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${precio}</td>
    
    <td>${total}</td>
    <td>
        <a href="#" onclick="onEdit(event)">Editar</a> | <a href="#" onclick="onDelete(event)">Eliminar</a>
    </td>
    `;

  //Actualizo los totales, tengo que parsear los valores a Float porque los está tomando como String
  sumaCantidad += parseFloat(cantidad);
  sumaPrecio += parseFloat(precio);
  sumaTotal += parseFloat(total);

  //Actualizo en el html los totales
  sumaCantidadElement.innerText = sumaCantidad;
  sumaPrecioElement.innerText = sumaPrecio;
  sumaTotalElement.innerText = sumaTotal;

  form.reset(); //Limpio el formulario

  //form.reset(); NO limpia el input type="hidden" donde se almacena el código
  //Y luego de editar no dejaba agregar nuevos productos, siempre editaba el último registro donde se presionó 'editar'
  inputCodigo.value = "";

  document.getElementById("nombre").focus(); //Pongo el focus en el campo 'nombre' del formulario
}

/**
 *
 * @param {Event} event
 */
function onEdit(event) {
  //Cancelamos la funcionalidad por defecto del onclick y ya podemos poner nuestra lógica
  //evitamos que por tener href="#" en la URL aparezca ese #
  event.preventDefault();

  //event.target me devuelve la referencia al elemento que disparó el evento (event)
  /** @type {HTMLAnchorElement} */
  const anchor = event.target; //La referencia al elemento <a>

  //anchor.parentElement me devuelve la referencia al elemento padre
  const tr = anchor.parentElement.parentElement;

  const celdas = tr.getElementsByTagName("td"); //Dentro de la fila quiero buscar los elementos de tipo 'td', me devuelve un arreglo
  const [tdCodigo, tdNombre, tdCantidad, tdPrecio] = celdas;

  inputCodigo.value = tdCodigo.innerText;
  inputNombre.value = tdNombre.innerText;
  inputCantidad.value = tdCantidad.innerText;
  inputPrecio.value = tdPrecio.innerText;
  inputNombre.value = tdNombre.innerText;
  selectCategoria.value = tr.dataset.categoria;

  currentRow = tr; //Actualizo la fila actual
}

/**
 *
 * @param {Event} event
 */
function onDelete(event) {
  //Cancelamos la funcionalidad por defecto del onclick y ya podemos poner nuestra lógica
  //evitamos que por tener href="#" en la URL aparezca ese #
  event.preventDefault();

  //event.target me devuelve la referencia al elemento que disparó el evento (event)
  /** @type {HTMLAnchorElement} */
  const anchor = event.target; //La referencia al elemento <a>

  //anchor.parentElement me devuelve la referencia al elemento padre
  const tr = anchor.parentElement.parentElement;

  tbody.removeChild(tr); //Uso la variable tbody que declaré al inicio para eliminar un hijo
}
