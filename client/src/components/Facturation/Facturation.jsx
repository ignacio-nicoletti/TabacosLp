import {useEffect, useState} from 'react';
import style from './Facturation.module.css';
import InstanceOfAxios from '../../utils/intanceAxios';
import {GetDecodedCookie} from '../../utils/DecodedCookie';

const Facturacion = () => {
  const [data, setData] = useState ([]);
  const [List, setList] = useState ([]);
  const [filter, setFilter] = useState ({
    code: '',
    cant: 1,
    importe: 1,
  });
  const [total, setTotal] = useState ('');

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
          // Product already exists, update the unity property by adding the quantity
          List[productIndex].unity =
            Number (List[productIndex].unity) + Number (filter.cant);
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

  const Calculartotal = () => {
    let totalData = List.map (el => ({
      ...el,
      total: el.priceList * el.unity,
    }));

    // Calculate the overall total by summing up the individual totals
    let overallTotal = totalData.reduce ((acc, curr) => acc + curr.total, 0);
    setTotal (overallTotal);
  };

  useEffect (
    () => {
      HandlerFacturacion ();
      Calculartotal ();
    },
    [filter.code]
  );

  const handlerFilters = event => {
    const {name, value} = event.target;

    setFilter ({
      ...filter,
      [name]: value ? value[0].toUpperCase () + value.slice (1) : '',
    });
  };

  const handlerEditUnity = elemento => {
    return event => {
      const newUnity = event.target.value;
      let productIndex = List.findIndex (
        el => String (el.code) === String (elemento.code)
      );
      if (productIndex >= 0) {
        List[productIndex].unity = Number (newUnity);
        setList ([...List]);
      }
    };
  };

  const handlerEditTitle = elemento => {
    return event => {
      const newTitle = event.target.value;
      let productIndex = List.findIndex(
        el => String(el.code) === String(elemento.code)
      );
      if (productIndex >= 0) {
        List[productIndex].title = newTitle;
        setList([...List]);
      }
    };
  };

  useEffect (
    () => {
      handlerEditUnity ();
      Calculartotal ();
    },
    [List, Calculartotal, handlerEditUnity]
  );

  const handleCheckboxChange = index => {
    const updatedList = [...List];
    updatedList[index].selected = !updatedList[index].selected;
    setList (updatedList);
  };

  const handleDeleteSelected = () => {
    // Filter out selected items from the list
    const updatedList = List.filter (el => !el.selected);
    setList (updatedList);
  };

  const handlerSubmit = () => {
    if (List.length !== 0) {
      const token = GetDecodedCookie ('cookieToken');
      InstanceOfAxios ('/invoice', 'POST', {List, total}, token);
      setList ([]);
    }
  };

  const handleAddGenericProduct = () => {
    setList ([
      ...List,
      {
        code: null,
        title: 'Producto Generico',
        amount: '',
        priceCost: null,
        priceList: filter.importe,
        unity: filter.cant,
        generic: true,
      },
    ]);
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
                type="number"
                value={filter.cant}
                onChange={handlerFilters}
                name="cant"
              />
            </div>
            <div className={style.divInputs}>
              <span>Importe</span>
              <input
                type="number"
                value={filter.importe}
                onChange={handlerFilters}
                name="importe"
              />
            </div>
            <div className={style.divFacturar}>
              <button onClick={() => handleAddGenericProduct ()}>
                Agregar Prod. Generico
              </button>

            </div>

            <div className={style.divFacturar}>
              <button onClick={handlerSubmit}>Facturar</button>
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
                <p>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={el.selected || false}
                    onChange={() => handleCheckboxChange (index)}
                  />
                </p>
                <p>{el.code ? el.code : '-'}</p>
                <p>
                  {el.generic
                    ? <input
                        type="text"
                        
                        id=""
                        value={el.title}
                        onChange={handlerEditTitle(el)}
                      />
                    : el.title}
                </p>
                <p>{el.amount ? el.amount : '-'}</p>
                <p>{el.priceCost ? el.priceCost.toLocaleString ().replace (',', '.') : '-'}</p>
                <p>{el.priceList.toLocaleString ().replace (',', '.')}</p>
                <p>
                  <input
                    type="text"
                    value={el.unity}
                    onChange={handlerEditUnity (el)}
                    name="code"
                  />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={style.importe}>
          <div className={style.trashBox}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-trash"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={() => handleDeleteSelected ()}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </div>
          <div className={style.importeBox}>
            <span>Importe total</span>
            <p>${total ? total.toLocaleString ().replace (',', '.') : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Facturacion;
