import React from "react";
import "./app.css"; //Importo el css, en este caso solo tengo bootstrap y bootstrap-icons
import ProductoForm from "./components/producto-form";
import ProductosList from "./components/productos-list";

const App = () => {
  return (
    <main className="container">
      <ProductoForm />
      <ProductosList />
    </main>
  );
};

export default App;
