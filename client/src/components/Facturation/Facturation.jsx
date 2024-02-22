import {useCallback, useEffect, useState} from 'react';
import style from './Facturation.module.css';
import InstanceOfAxios from '../../utils/intanceAxios';

const Facturacion = () => {
  const [data, setData] = useState ([]);
  const [List, setList] = useState ([]);
  const [filter, setFilter] = useState ({
    code: '',
    cant: 1,
  });

  useEffect (() => {
    fetchData ();
  }, []);

  const fetchData = async () => {
    const res = await InstanceOfAxios ('/products', 'GET');
    setData (res);
  };


  const HandlerFacturacion = () => {
    try {
      let filteredData = data.filter (
        el => String (el.code) === String (filter.code)
      );

      if (filteredData.length > 0) {
        filteredData = filteredData.map (item => ({
          ...item,
          unity: filter.cant,
        }));

        let productIndex = List.findIndex (
          el => String (el.code) === String (filteredData[0].code)
        );

        if (productIndex >= 0) {
          // Product already exists, update the unity property
          List[productIndex].unity += Number (filter.cant);
          setList ([...List]); // Update the state with the modified List
        } else {
          // Product doesn't exist, add it to the list
          setList ([...List, ...filteredData]);
        }
          setFilter ({...filter, code: ''});
      }
    } catch (error) {
      console.error ('Error handling facturation:', error);
    }
  };

  useEffect (
    () => {
      HandlerFacturacion ();
    },
    [filter.code]
  );

  const handlerFilters = event => {
   const {name,value} = event.target;
 

    setFilter ({
      ...filter,
      [name]: value ? value[0].toUpperCase () + value.slice (1) : '',
    });
  };
  return (
    <div className={style.containProgram}>
      <div className={style.program}>
        <div className={style.sideBarAndListProduct}>

          <div className={style.SideBar}>

            <div className={style.divInputs}>
              <span>Codigo</span>
              <input
                type="text"
                onChange={handlerFilters}
                name="code"
                value={filter.code}
              />
            </div>

            <div className={style.divInputs}>
              <span>Cantidad</span>
              <input
                type="text"
                value={filter.cant}
                onChange={handlerFilters}
                name="cant"
              />
            </div>

            <div className={style.divFacturar}>
              <button>Facturar</button>
            </div>

          </div>

          <div className={style.listProduct}>
            <div className={style.DivProductTitles}>
              <p>Seleccion</p>
              <p>Codigo</p>
              <p>Titulo</p>
              <p>Cantidad</p>
              <p>Precio Compra</p>
              <p>Precio Venta</p>
              <p>Unidad</p>

            </div>

            {List.map ((el, index) => (
              <div className={style.divProduct} key={index}>
                <p><input type="checkbox" name="" id="" /></p>
                <p>{el.code}</p>
                <p>{el.title}</p>
                <p>{el.amount}</p>
                <p>{el.priceCost}</p>
                <p>{el.priceList}</p>
                <p>{el.unity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={style.importe}>
          <div className={style.importeBox}>
            <span>Importe total</span>
            <p>$4500</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Facturacion;
