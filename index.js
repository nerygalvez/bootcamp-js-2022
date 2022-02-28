const form = document.getElementsByTagName("form")[0]; //Tomo el primer formulario que encuentre
form.addEventListener("submit", onsubmit);

const tbody = document.getElementsByTagName("tbody")[0]; //Tomo el primer tbody que encuentre

let indice = 1;

let sumaCantidad = 0;
let sumaPrecio = 0;
let sumaTotal = 0;

const sumaCantidadElement = document.getElementById("sumaCantidad");
const sumaPrecioElement = document.getElementById("sumaPrecio");
const sumaTotalElement = document.getElementById("sumaTotal");

/**
 * 
 * @param {Event} event 
 */
function onsubmit(event)
{
    event.preventDefault(); //Cancelamos la funcionalidad por defecto del form y ya podemos poner nuestra lógica

    //Creo que aquí en new FormData(this) podría usar 'this' en lugar de indicar la variable
    const data = new FormData(form); //Quiero consultar la data del formulario 'form' que declaré arriba
    
    const values = Array.from(data.entries());

    const [frmNombre, frmCantidad, frmPrecio, frmCategoria] = values; //Descompongo el arreglo 'values'
    
    const nombre = frmNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria = frmCategoria[1];
    const total = cantidad * precio;

    //Actualizo los totales, tengo que parsear los valores a Float porque los está tomando como String
    sumaCantidad += parseFloat(cantidad);
    sumaPrecio += parseFloat(precio);
    sumaTotal += parseFloat(total);

    //Agrego la fila a la tabla
    indice++;
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${indice}</td>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${precio}</td>
    
    <td>${total}</td>
    <td>
        <a href="#">Editar</a> | <a href="#">Eliminar</a>
    </td>
    `;
    
    tbody.appendChild(tr); //Agrego al tbody la nueva fila

    //Actualizo en el html los totales
    sumaCantidadElement.innerText = sumaCantidad;
    sumaPrecioElement.innerText = sumaPrecio;
    sumaTotalElement.innerText = sumaTotal;

    
    form.reset(); //Limpio el formulario

    document.getElementById("nombre").focus(); //Pongo el focus en el campo 'nombre' del formulario
    
}