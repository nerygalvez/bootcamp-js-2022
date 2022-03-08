/**
 * Objetos Inmutables
 *
 * La inmutabilidad nos dice que no modifiquemos los valores de nuestros objetos, sino
 * que creemos una copia de esos objetos con las modificaciones que queremos realizar
 */

const juan = {
  nombre: "Juan",
  apellido: "Rodriquez",
  edad: 30,
  direccion: {
    departamento: "Guatemala",
    municipio: "Guatemala",
  },
};

//juan.apellido = "Perez"; //A pesar de que lo definimos como una constante me deja modificar el atributo
//console.log(juan);

//const juan2 = juan; //Aquí solo estamos copiando la referencia al objeto de la variable 'juan' a la variable 'juan2'

//Sintaxis 1
//const juan2 = Object.assign({}, juan); //Queremos crear un nuevo objeto con los valores del objeto juan
//juan2.apellido = "Perez";

//Sintaxis 2
//const juan2 = Object.assign({}, juan, { apellido: "Perez" }); //Queremos crear un nuevo objeto con los valores del objeto juan
//juan2.apellido = "Perez";

//Sintaxis 3 y la más recomendable para manejar objetos
//const juan2 = { ...juan, apellido: "Perez", edad: 100, telefono: 81838181 };
//La sintaxis anterior al momento que el objeto tiene más objetos como atributos solo copia la referencia de primer nivel
//por eso cuando agregamos direccion : {} y lo modificamos se modificó en las dos variables porque ambas
//estaban referenciando al mismo objeto direccion

const juan2 = {
  ...juan,
  apellido: "Perez",
  edad: 100,
  telefono: 81838181,
  direccion: {
    ...juan.direccion,
    municipio: "Santa Catarina Pinula",
    aldea: "Aldea 1",
  }, //Tengo que hacer lo mismo, decirle que haga una copia del objeto interno
};

//console.log("Juan: ", juan);
//console.log("Juan 2: ", juan2);

/**
 * Arreglos inmutables
 */

const numeros = [1, 2, 3];
//const numeros2 = numeros; //Aquí solo se pasa la referencia del arreglo y ambas variables apuntan al mismo arreglo
//const numeros2 = [0, ...numeros, 4, 5, ...numeros]; //Puedo insertar varios valores en el nuevo arreglo
const numeros2 = [0, ...numeros, 4, 5];
numeros2.push(6);

//Si quisiera insertar un valor enmedio de algún valor actual del arreglo que voy a copiar
const index = numeros.indexOf(2); //Obtengo el índice donde está el elemento con valor 2
const numeros3 = [...numeros.slice(0, index), 1.5, ...numeros.slice(index)];

//Eliminando elementos del arreglo
const numeros4 = numeros.filter(x => x != 2); //Quiero todos los números que sean distintos de '2'

//Modificando valores
const numeros5 = numeros.map(x => x == 2 ? 100 : x); //Quiero modificar la posición donde el valor sea '2'

console.log("Numeros : ", numeros);
console.log("Numeros 2: ", numeros2);
console.log("Numeros 3: ", numeros3);
console.log("Numeros 4: ", numeros4);
console.log("Numeros 5: ", numeros5);
