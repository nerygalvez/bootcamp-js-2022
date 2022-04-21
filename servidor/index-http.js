//import http from "http"; //Esta no lo soporta mi compu
//const http = require("http"); //Esta forma sí la soporta

/**
 * Voy a realizar algunos pasos para que soporte la primera forma
 *
 *  Siempre en el servidor voy a correr el siguiente comando para crear
 * un archivo package.json:
 *
 * npm init -y
 *
 * Dentro de ese archivo package.json voy a agregar lo siguiente:
 *
 * "type": "module",
 *
 * Quedaría algo como:
 *
 * "description": "",
 * "type": "module",
 * "main": "index.js",
 */

import http from "http";

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(
    JSON.stringify([
      { codigo: 1, nombre: "Producto 1", precio: 10, cantidad: 100 },
      { codigo: 2, nombre: "Producto 2", precio: 50, cantidad: 200 },
    ])
  );
  response.end();
});

/**
 * Pongo a escuchar el servidor y me pide el puerto donde va a correr y una función
 * que se ejecuta una vez el servidor ya está arriba (funcionando)
 */
server.listen(5001, () => {
  console.log("Servidor escuchando en el puerto 5001");
});
