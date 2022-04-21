import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarOModificarProducto } from "../store/store";

const ProductoForm = () => {
  const categorias = [
    { codigo: 1, nombre: "Categoría 1" },
    { codigo: 2, nombre: "Categoría 2" },
    { codigo: 3, nombre: "Categoría 3" },
    { codigo: 4, nombre: "Categoría 4" },
  ];

  //Producto me dice qué valores va a tener y mostrar mi formulario
  const producto = useSelector((state) => state.producto); //Es un hook de react-redux

  //Voy a usar un hook de la librería react-redux
  //esto para tener acceso al 'dispatch' del store antes definido en src/index.js
  const dispatch = useDispatch();

  //setValues es la función para actualizar el estado de mis productos
  //values es el estado actual de mi arreglo de productos
  //const [values, setValues] = useState({});
  const [values, setValues] = useState(
    //Este va a ser un estado interno del formulario
    //Defino el estado inicial (en este caso el estado inicial de mi producto)
    {
      codigo: 0,
      nombre: "",
      cantidad: "",
      precio: "",
      categoria: 1,
    }
  );

  //Uso otro hook de react para decirle a React que algo está pasando
  //fuera de su entorno que necesita actualizar la vista
  //Esto porque no borra el formulario al agregar un producto
  //Y tampoco cambia los valores del formulario al seleccionar un nuevo producto
  //le decimos a React que cuando cambie el producto actualice los valores del formulario
  useEffect(() => {
    setValues({
      codigo: producto.codigo || 0,
      nombre: producto.nombre || "",
      cantidad: producto.cantidad || "",
      precio: producto.precio || "",
      categoria: producto.categoria || 1,
    });
  }, [producto]); //Cuando 'producto' cambie vuelve a ejecutar esta función

  const onChange = (event) => {
    const target = event.target;

    const value = target.value;
    const name = target.name;
    setValues((v) => ({
      ...v,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...values,
      cantidad: parseInt(values.cantidad),
      precio: parseFloat(values.precio),
    };
    dispatch(agregarOModificarProducto(payload));
  };

  const canSave = !!(values.nombre && values.cantidad && values.precio);

  return (
    <form action="index.html" onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          className="form-control"
          value={values.nombre}
          onChange={onChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="cantidad" className="form-label">
          Cantidad
        </label>
        <input
          type="number"
          name="cantidad"
          id="cantidad"
          className="form-control"
          value={values.cantidad}
          onChange={onChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="precio" className="form-label">
          Precio
        </label>
        <div className="input-group">
          <span className="input-group-text">Q</span>
          <input
            type="number"
            name="precio"
            id="precio"
            className="form-control"
            value={values.precio}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="categoria" className="form-label">
          Categoria
        </label>
        <select
          name="categoria"
          id="categoria"
          className="form-control"
          value={values.categoria}
          onChange={onChange}
        >
          {categorias.map((c) => (
            <option key={c.codigo} value={c.codigo}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary" disabled={!canSave}>
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ProductoForm;
