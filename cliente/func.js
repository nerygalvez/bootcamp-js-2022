/**
 * Escribo el funcionamiento de una función NO pura, esto NO es programación funcional
 * porque el comportamiento de la función puede variar por parámetros (variables) globales o externas de la función
 */
/*let prefijo = "Hola ";

function saludar(texto) {
  return prefijo + texto;
}

console.log(saludar("Mundo"));

prefijo = "Adios ";

console.log(saludar("Mundo"));
*/

/**
 * Ahora sí veo lo que es programación funcional
 * 
 * 
 * function mensaje(prefijo) {
  return function (texto) {
    return prefijo + " " + texto;
  };
}

const bienvenida = mensaje("Hola");
const despedida = mensaje("Adios");

console.log(bienvenida("Mundo"));
console.log(despedida("Mundo"));
 */

/**
 * Enviar funciones como parámetro
 * 
 * 
 * function mensaje(prefijo, formateador) {
  return function (texto) {
    return formateador(prefijo, texto);
  };
}

const formatoBienvenida = function (prefijo, texto) {
  return "¡" + prefijo + " " + texto + "!";
};

const formatoDespedida = function (prefijo, texto) {
  return prefijo + " " + texto + "... :(";
};

const bienvenida = mensaje("Hola", formatoBienvenida);
const despedida = mensaje("Adios", formatoDespedida);

console.log(bienvenida("Mundo"));
console.log(despedida("Mundo"));
 */

/**
 * Funciones lambda o arrow function (funciones flecha)
 */

/*function mensaje(prefijo, formateador) {
  return function (texto) {
    return formateador(prefijo, texto);
  };
}
*/

const mensaje = (prefijo, formateador) => (texto) =>
  formateador(prefijo, texto);

/*const formatoBienvenida = (prefijo, texto) => "¡" + prefijo + " " + texto + "!";
const formatoDespedida = (prefijo, texto) => prefijo + " " + texto + "... :(";

const bienvenida = mensaje("Hola", formatoBienvenida);
const despedida = mensaje("Adios", formatoDespedida);
*/

const bienvenida = mensaje("Hola", (prefijo, texto) => `¡${prefijo} ${texto}!`);
const despedida = mensaje(
  "Adios",
  (prefijo, texto) => `${prefijo} ${texto}... :(`
);

console.log(bienvenida("Mundo"));
console.log(despedida("Mundo"));
